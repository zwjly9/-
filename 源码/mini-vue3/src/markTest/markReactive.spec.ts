class ReactiveEffect {
  private _fn: any
  constructor(fn) {
    this._fn = fn
  }
  run() {
    activeEffect = this
    this._fn()
  }
}

function reactive(obj) {
  return new Proxy(obj, {
    get(target,key){
      const res = Reflect.get(target, key)
      track(target, key)
      return res
    },
    set(target,key,value) {
      const res = Reflect.set(target, key, value)
      trigger(target, key)
      return res
    }
  })
}

function effect(fn) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}
const targetMap = new Map()
let activeEffect;
function track(target, key){
  let depsMap  = targetMap.get(target)
  if(!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let deps =depsMap.get(key)
  if(!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }
  deps.add(activeEffect)
}

function trigger(target, key) {
  let depsMap = targetMap.get(target)
  let deps = depsMap.get(key)
  for(const effect of deps) {
    effect.run()
  }
}

const original  = { foo: 1 }
const observer = reactive(original)
let nextAge;
effect(() => {
  nextAge = original.foo + 1
})

describe('reactive', ()=>{
  it('happy path', ()=>{
    expect(observer).not.toBe(original)
    expect(observer.foo).toBe(1)
    effect(() => {
      nextAge = observer.foo + 1
    })
    expect(nextAge).toBe(2)
    observer.foo++
    expect(nextAge).toBe(3)
  })
})
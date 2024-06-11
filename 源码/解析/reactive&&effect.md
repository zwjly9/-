## 1.创建reactive响应式对象

**“happy path":**

```javascript
// reactive创建的对象不是原对象
// reactive创建的对象值与原对象相同
const original = { foo: 1 }
const observer = reactive({ original })
expect(observer).not.toBe(original)
expect(observer.foo).toBe(1)
```

**思路**：

reactive函数返回一个proxy对象，包含get,set方法

嵌套对象 obj: { n : {foo:1 } } 在get中判断res是否是对象,是对象的继续reactive(res), readonly同理

```javascript
export function reactive(obj) {
	return new Proxy(obj, {
        get(target, key) {
            const res = Reflect.get(target, key)
            if(isObject(res)) {
                return reactive(res)
            }
            return res
        },
        set(target, key, value) {
            const res = Reflect.set(target, key, value)
            return res
        }
    })
}
const isObject = (val) => {
    return val !== null && typeof val === 'object'
}
```

## 2.effect的实现

**“happy path":**

```javascript
const user = reactive({age:10})
let nextAge;
effect(()=> {
    nextAge = user.age + 1 
})
expect(nextAge).toBe(11)
```

**思路：**

effect接收一个函数， 执行该函数

```javascript
export function effect(fn) {
    fn()
}
```

优化：提取公共类

```javascript
class ReactiveEffect {
    private _fn: any
    constructor(fn) {
        this._fn = fn
    }
	run() {
        this._fn()
    }
}
export function effect(fn){
    const _effect = new ReavtiveEffect(fn)
    _effect.run()
}
```

## 3.依赖收集和触发依赖

**"happy path"**

```javascript
const user = reactive({age:10})
let nextAge;
effect(()=> {
    nextAge = user.age + 1 
})
user.age++
expect(nextAge).toBe(12)
```

**思路：**

创建reactive对象时，在get方法里面进行依赖收集，在set方法里面进行触发依赖

```javascript
// 根据target去获取key,根据key获取对应的依赖，防止方法重复，依赖用set去存储，target用map存储
// targetMap: { {obj: 1}: Map() 	}   depsMap: { obj: Set() } deps: Set()
// 依赖收集
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
// 触发依赖
function trigger(target, key) {
  let depsMap = targetMap.get(target)
  let deps = depsMap.get(key)
  for(const effect of deps) {
    effect.run()
  }
}
```

## 4. effect返回runner

思路：在effect函数里面增加一个返回值，返回值为fn函数即run()，注意this指向

```javascript
const runner = effect(() => {})

export function effect(fn) {
    const _effect = new ReactiveEffect(fn)
    _effect.run()
    const runner = _effect.run.bind(_effect)
    runner.effect = _effect
    return runner
}
```

## 5.scheduler功能

```
* scheduler的功能
* 1.通effect的第二个参数给定 一个scheduler的fn
* 2.effect第一次执行的时候，执行fn
* 3.当响应式对象set、 update不会执行fn,而是执行scheduler
* 4.执行runner的时候是执行fn
```

```javascript
export function effect (fn, options) {
    const _effect = new ReactiveEffect(fn, options)
}

// trigger
export function trigger(target, key) {
  // 基于target和key 取出fn,执行
  let depsMap = targetMap.get(target)
  let dep = depsMap.get(key)
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}
```

## 6.effect的stop、onStop功能

思路：

调用stop后，effect的内容停止更新，即清空响应式对象的依赖，调用runner后继续更新;onStop是给用户提供的执行stop时的回调函数，允许进行其他操作

```javascript
export stop() {
    runner.effect.stop()
}
class ReactiveEffect {
    run() {
        if(!this.active) {
      		return this._fn()
        }
        shouldTrack = true
        activeEffect = this
        const result = this._fn()
        shouldTrack = false
        return result
    }
    stop() {
        effect.dep.forEach(dep => {
            dep.delete(effect)
        })
        if(this.onStop) {
            this.onStop()
        }
    }
}
// 注意
let dummy;
const obj = reactive({prop: 1})
const runner = effect(() => {
  dummy = obj.prop
})
stop(runner)
obj.prop = 3 // dummy不变
obj.prop++ // 这里先调用了get，重新收集了依赖，所以需要设置一个状态位，此处不应收集依赖

export function track(target, key) {
  if(!shouldTrack && activeEffect !== undefined) return
  // target -> key -> fn
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  if(dep.has(activeEffect)) return
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}
```

## 7.readonly

创建一个响应式对象，只包含get方法即可，调用set时，抛出异常

```javascript
function readonly(raw) {
    return new Proxy(raw, {
        get(target, key) {
            const res = Reflect.get(target, key)
            if(isObject(res)) {
                return readonly(res)
            }
            return res
        },
        set(target, key) {
            console.warn(`key${key} set default,because ${target} is readonly`)
    		return true
        }
    })
}
```

## 8.shallowReadonly、shallowReactive

只把根属性进行readonly或者reactive

```javascript
function readonly(raw) {
    return new Proxy(raw, {
        get(target, key, shallow = false) {
            const res = Reflect.get(target, key)
            if(shallow) {
                return res
            }
            if(isObject(res)) {
                return readonly(res)
            }
            return res
        },
        set(target, key) {
            console.warn(`key${key} set default,because ${target} is readonly`)
    		return true
        }
    })
}
```



## 9.isReadonly、isReactive、isProxy

判断某个对象是否是Readonly或Reactive，或者是不是通过proxy创建的

思路：定义一个readonly和reactive的标识符，判断对象上面是否有该属性，此时响应式对象会调用get方法，加入判断即可

```javascript
export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadOnly'
}
export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY]
}
// get内部加一个判断即可
if(key === ReactiveFlags.IS_REACTIVE) {
  return !isReadonly
} else if (key === ReactiveFlags.IS_READONLY) {
  return isReadonly
}


// isProxy检查一个对象是否是由 reactive()、readonly()、shallowReactive() 或 shallowReadonly() 创建的代理 
export function isProxy(value) {
  return isReactive(value) || isReadonly(value)
}
```


import {reactive} from "../reactive"
import {effect, stop} from "../effect"

describe('effect', () => {
  it('happy path', () => {
    const user = reactive({
      age: 10
    })
    let nextAge;
    effect(() => {
      nextAge = user.age + 1
    })
    expect(nextAge).toBe(11)
    user.age++
    expect(nextAge).toBe(12)
  });
  it('should return runner when call effect', () => {
    /*
    * effect函数返回一个runner函数，调用runner时，执行传入effect的函数； 调用fn时，会把fn的返回值return 出去;即调用runner可以拿到内部fn的返回值
    * effect(fn) -> function runner() -> fn() -> return
    * */
    let foo = 10
    const runner = effect(() => {
      foo++
      return "foo"
    })
    expect(foo).toBe(11)
    const r = runner()
    expect(foo).toBe(12)
    expect(r).toBe('foo')
  })
  it("scheduler", () => {
    /*
    * scheduler的功能
    * 1.通effect的第二个参数给定 一个scheduler的fn
    * 2.effect第一次执行的时候，执行fn
    * 3.当响应式对象set、 update不会执行fn,而是执行scheduler
    * 4.执行runner的时候是执行fn
    * */
    let dummy;
    let run: any
    const scheduler = jest.fn(() => {
      run = runner
    })
    const obj = reactive({foo: 1})
    const runner = effect(() => {
      dummy = obj.foo
    }, {scheduler})
    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)
    obj.foo++
    expect(scheduler).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1)
    run()
    expect(dummy).toBe(2)
  })
  it("stop", () => {
    /*
    * stop的功能
    * 调用stop之后停止更新，调用runner继续更新
    * stop里面清空依赖
    * */
    let dummy;
    const obj = reactive({prop: 1})

   const runner = effect(() => {
      dummy = obj.prop
    })

    obj.prop = 2
    expect(dummy).toBe(2)
    stop(runner)
    /*
    * obj.prop = obj.prop + 1
    * 1. 调用了get获取obj.prop,此时重新进行了依赖收集
    * 2. 调用set的时候执行了依赖 所以dummy = 3
    * obj.prop = 3
    * 1.只调用了set，此时依赖池为空，所以dummy = 2
    * */
    obj.prop = 3
    expect(dummy).toBe(2)
    obj.prop++
    expect(dummy).toBe(2)
    runner()
    expect(dummy).toBe(4)
    obj.prop = 5
    expect(dummy).toBe(4)
    // 调用runner之后，还有依赖吗
  })
  it('onStop', () => {
    //   调用完stop的回调函数，允许用户进行一些其余操作
    const obj = reactive({foo: 1})
    const onStop = jest.fn()
    let dummy;
    const runner = effect(() => {
      dummy = obj.foo
    }, {
      onStop
    })
    stop(runner)
    expect(onStop).toHaveBeenCalledTimes(1)
  })
})
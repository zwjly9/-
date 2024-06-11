import {isProxy, isReadonly, shallowReadonly} from "../reactive";

describe('shallowReadonly', ()=> {
  test('should not make non-reactive properties reactive', ()=> {
    const props = shallowReadonly({
      n: {
        foo: 1
      },
      m: 'bar'
    })
    expect(isReadonly(props)).toBe(true)
    expect(isReadonly(props.n)).toBe(false)
    expect(isReadonly(props.m)).toBe(false)
    expect(isProxy(props)).toBe(true)
  })
})
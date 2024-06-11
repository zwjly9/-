import {isTracking, trackEffects, triggerEffects} from "./effect";
import {hasChanged, isObject} from "../shared";
import {reactive} from "./reactive";

class RefImpl {
  private _value: any
  public dep;
  private _rawValue: any
  public __v_isRef = true
  constructor(value) {
    // 传进来的可能是一个对象。如果是对象，那么_value应该用reactive去创建
    this._rawValue = value
    this._value = convert(value)
    this.dep = new Set()
  }
  get value() {
    // 依赖收集
    if(isTracking()) {
      trackEffects(this.dep)
    }
    return this._value
  }
  set value(newValue) {
    // 如果是对象 this._value是proxy返回的对象，不能这么比较; Object.is()方法如果两个对象指向的引用地址相同，则返回true
    if(!hasChanged(this._rawValue, newValue)){
      this._rawValue = newValue
      this._value = convert(newValue)
      triggerEffects(this.dep)
    }
  }
}
function convert(value) {
  return isObject(value) ? reactive(value) : value
}
export function ref(value){
  return new RefImpl(value)
}
export function isRef(ref) {
  return !!ref.__v_isRef
}
export function unRef(ref) {
  return isRef(ref) ? ref.value : ref
}
export function proxyRefs(ref) {
  return new Proxy(ref, {
    get(target, key) {
      // ref返回.value,非ref返回本身，即unRef函数
      return unRef(Reflect.get(target, key))
    },
    set(target, key, value) {
      if(isRef(target[key]) && !isRef(value)) {
        return target[key].value = value
      } else {
        return Reflect.set(target, key, value)
      }
    }
  })
}
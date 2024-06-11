import {track, trigger} from "./effect";
import {reactive, ReactiveFlags, readonly } from "./reactive";
import {extend, isObject} from "../shared";

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)
function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key) {
    if(key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    }
    const res = Reflect.get(target, key)
    // shallowReadonly 将元素设为readonly即可，不需要关注内部是否嵌套子元素
    if(shallow) {
      return res
    }
    // 判断res是否是个对象，如果是对象，将其继续进行reactive或者readonly
    if(isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }
    if (!isReadonly) {
      track(target, key)
    }
    return res
  }
}

function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value)
    trigger(target, key)
    return res
  }
}

export const mutableHandlers = {
  get,
  set
}

export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key, value) {
    console.warn(`key${key} set default,because ${target} is readonly`)
    return true
  }
}

export const shallowReadonlyHandlers = extend(readonlyHandlers, {get: shallowReadonlyGet})
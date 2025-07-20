/* 特殊对象类型守卫 */

import type { Thenable, PromiseWithCatch } from "@tsTypes";
import { isFunction, isObject, isObjectAndNotArray, isUndefined, toTypeString } from "@/typeUtils";

/* ========== */

/**
 * @description 判断一个值是否是 Date 实例。
 * @function isDate
 * @param val 要判断的值。
 * @returns 如果值是 Date，则返回 true，否则返回 false。
 */
export const isDate = (val: unknown): boolean => toTypeString(val) === "[object Date]";

/**
 * @description 判断一个值是否是 Map 实例。
 * @function isMap
 * @param val 要判断的值。
 * @returns 如果值是 Map，则返回 true，否则返回 false。
 */
export const isMap = (val: unknown): boolean => toTypeString(val) === "[object Map]";

/**
 * @description 判断一个值是否是 RegExp 实例。
 * @function isRegExp
 * @param val 要判断的值。
 * @returns 如果值是 RegExp，则返回 true，否则返回 false。
 */
export const isRegExp = (val: unknown): boolean => toTypeString(val) === "[object RegExp]";

/**
 * @description 判断一个值是否是 Set 实例。
 * @function isSet
 * @param val 要判断的值。
 * @returns 如果值是 Set，则返回 true，否则返回 false。
 */
export const isSet = (val: unknown): boolean => toTypeString(val) === "[object Set]";

/**
 * @description 判断一个值是否是 WeakMap 实例。
 * @function isWeakMap
 * @param val 要判断的值。
 * @returns 如果值是 WeakMap，则返回 true，否则返回 false。
 */
export const isWeakMap = (val: unknown): boolean => toTypeString(val) === "[object WeakMap]";

/**
 * @description 判断一个值是否是 Window 对象。
 * @param val 要判断的值。
 * @returns 如果值是 Window，则返回 true，否则返回 false。
 */
export const isWindow = (val: unknown): val is Window => {
    // 不是对象
    if (!isObjectAndNotArray(val)) return false;

    // 自引用特征
    const _VAL = val as Record<PropertyKey, unknown>;
    return (
        _VAL.window === _VAL && // 自引用特征
        isObjectAndNotArray(_VAL.document) // 典型特征
    );
};

/* ========== */

/**
 * @description 检测是否为原生 ES6 Promise 实例。
 * @function isNativePromise
 * @param val 要判断的值。
 * @returns 如果值是原生 ES6 Promise 实例，则返回 true，否则返回 false。
 */
export const isNativePromise = (val: unknown): val is Promise<unknown> =>
    !isUndefined(Promise) && val instanceof Promise;

/**
 * @description 判断一个值是否是 Promise。
 * @function isPromiseWithCatch
 * @param val 要判断的值。
 * @returns 如果值是 Promise，则返回 true，否则返回 false。
 */
export const isPromiseWithCatch = (val: unknown): val is { then: Function; catch: Function } =>
    isThenable(val) && isFunction((val as PromiseWithCatch).catch);

/**
 * @description 兼容 Promise A+ 规范的 Promise。
 * @function isThenable
 * @param val 要判断的值。
 * @returns 如果值是 Promise A+ 规范的 Promise，则返回 true，否则返回 false。
 */
export const isThenable = (val: unknown): val is { then: Function } =>
    (isObject(val) || isFunction(val)) && isFunction((val as Thenable).then);

/* ========== */

/**
 * @description 判断一个值是否是普通对象。
 * @function isPlainObject
 * @param val 要判断的值。
 * @returns 如果值是普通对象，则返回 true，否则返回 false。
 */
export const isPlainObject = (val: unknown): val is Record<string, unknown> =>
    isObjectAndNotArray(val) && toTypeString(val) === "[object Object]";

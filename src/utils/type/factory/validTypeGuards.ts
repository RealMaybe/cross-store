/* 有效类型守卫 */

import type { ObjectAndArray, SafeFunction } from "@tsTypes";

/* ========== */

/**
 * @description 判断一个值是否为数组
 * @function isArray
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是数组，则返回 true，否则返回 false
 */
export const isArray = (val: unknown): val is Array<unknown> => Array.isArray(val);

/**
 * @description 判断一个值是否为 bigint
 * @function isBigInt
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是 bigint，则返回 true，否则返回 false
 */
export const isBigInt = (val: unknown): val is bigint => typeof val === "bigint";

/**
 * @description 判断一个值是否为布尔值
 * @function isBoolean
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是布尔值，则返回 true，否则返回 false
 */
export const isBoolean = (val: unknown): val is boolean => typeof val === "boolean";

/**
 * @description 判断一个值是否为函数
 * @function isFunction
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是函数，则返回 true，否则返回 false
 */
export const isFunction = (val: unknown): val is SafeFunction => {
    if (typeof val !== "function") return false;

    const obj = val as { nodeType?: unknown; item?: unknown };

    const hasNodeType =
        Object.prototype.hasOwnProperty.call(obj, "nodeType") && isNumber(obj.nodeType);

    const hasItem =
        Object.prototype.hasOwnProperty.call(obj, "item") && typeof obj.item === "function";

    return !hasNodeType && !hasItem;
};

/**
 * @description 判断一个值是否为数字
 * @function isNumber
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是数字，则返回 true，否则返回 false
 */
export const isNumber = (val: unknown): val is number => typeof val === "number";

/**
 * @description 判断一个值是否为非 null 对象
 * @function isObject
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是非 null 对象，则返回 true，否则返回 false
 */
export const isObject = (val: unknown): val is ObjectAndArray =>
    typeof val === "object" && val !== null;

/**
 * @description 判断一个值是否为非 null 非数组对象
 * @function isObjectAndNotArray
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是非 null 非数组对象，则返回 true，否则返回 false
 */
export const isObjectAndNotArray = (val: unknown): val is Record<string | symbol, unknown> =>
    isObject(val) && !isArray(val);

/**
 * @description 判断一个值是否为字符串
 * @function isString
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是字符串，则返回 true，否则返回 false
 */
export const isString = (val: unknown): val is string => typeof val === "string";

/**
 * @description 判断一个值是否为 symbol
 * @function isSymbol
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是 symbol，则返回 true，否则返回 false
 */
export const isSymbol = (val: unknown): val is symbol => typeof val === "symbol";

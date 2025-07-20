/* 无效类型守卫 */

import { objIs } from "@/var";
import { isNumber } from "@/typeUtils";

/* ========== */

/**
 * @description 判断一个值是否为 Infinity 或 -Infinity
 * @function isInfinity
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值为 Infinity 或 -Infinity，则返回 true，否则返回 false
 */
export const isInfinity = (val: unknown): val is typeof Infinity =>
    isNumber(val) && (val === Infinity || val === -Infinity);

/**
 * @description 判断一个值是否为 NaN
 * @function isNotANumber
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是 NaN，则返回 true，否则返回 false
 */
export const isNotANumber = (val: unknown): val is typeof NaN => isNumber(val) && objIs(NaN, val);

/**
 * @description 判断一个值是否为 null
 * @function isNull
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是 null，则返回 true，否则返回 false
 */
export const isNull = (val: unknown): val is null => val === null;

/**
 * @description 判断一个值是否为 undefined
 * @function isUndefined
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是 undefined，则返回 true，否则返回 false
 */
export const isUndefined = (val: unknown): val is undefined => val === void 0;

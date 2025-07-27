/* 内容有效性验证工具 */

import {
    isOneOf,
    isInfinity,
    isNotANumber,
    isNull,
    isUndefined,
    isEmptyString,
    isEmptyStringLoose,
    isEmptyArray,
    isEmptyObject,
} from "@/utils";

/* ========== */

/**
 * 判断一个值是否为有效值
 * - false、null、0、NaN、undefined 空字符串（""）始终被认为是无效值
 * - 当 ignore=false 时，以下值也会被认为是无效值：
 *     - ±Infinity、空数组、空对象、仅包含空格的字符串（如 "  "）
 * - 其他值均会被认为是有效值
 * @function isEffective
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @param { boolean } [ignore=true] 是否忽略对 ±Infinity、空数组、空对象、空格字符串的判断，默认为 true
 * @return { boolean } 如果传入的值不是无效值，则返回 true，否则返回 false
 */
export const isEffective = (val: unknown, ignore: boolean = true): boolean =>
    !(
        val === false || // false
        val === 0 || // 0
        isOneOf(
            val,
            isNull, // null
            isNotANumber, // NaN
            isUndefined, // undefined
            isEmptyString // 空字符串
        ) ||
        (!ignore &&
            isOneOf(
                val,
                isInfinity, // ±Infinity
                isEmptyArray, // 空数组
                isEmptyObject, // 空对象
                isEmptyStringLoose // 空格字符串
            ))
    );

/**
 * 判断一个值是否为无效值
 * - false、null、0、NaN、undefined 空字符串（""）始终被认为是无效值
 * - 当 ignore=false 时，以下值也会被认为是无效值：
 *     - ±Infinity、空数组、空对象、仅包含空格的字符串（如 "  "）
 * - 其他值均会被认为是有效值
 * @function isIneffective
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @param { boolean } [ignore=true] 是否忽略对 ±Infinity、空数组、空对象、空格字符串的判断，默认为 true
 * @returns { boolean } 如果传入的值是无效值，则返回 true，否则返回 false
 */
export const isIneffective = (val: unknown, ignore?: boolean): boolean => !isEffective(val, ignore);

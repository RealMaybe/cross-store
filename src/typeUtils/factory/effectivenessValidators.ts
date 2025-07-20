/* 内容有效性验证工具 */

import {
    isInfinity,
    isNotANumber,
    isNull,
    isUndefined,
    isEmptyString,
    isEmptyStringLoose,
    isEmptyArray,
    isEmptyObject,
} from "@/typeUtils";

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
export const isEffective = (val: unknown, ignore: boolean = true): boolean => {
    // 检查基础无效值（始终执行）
    if (val === false || // false
        val === 0 || // 0
        isNull(val) || // null
        isNotANumber(val) || // NaN
        isUndefined(val) || // undefined
        isEmptyString(val) // ""
    ) return false;

    // 检查特殊无效值（仅在 ignore=false 时执行）
    if (!ignore) {
        if (isInfinity(val)) return false; // ±Infinity 检测
        if (isEmptyArray(val)) return false; // 空数组检测
        if (isEmptyObject(val)) return false; // 空对象检测
        if (isEmptyStringLoose(val)) return false; // 仅包含空格的字符串
    }

    return true; // 所有检查通过则为有效值
};

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

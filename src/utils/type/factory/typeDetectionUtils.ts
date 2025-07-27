/* 类型检测工具 */

import type { StringOfAllTypes } from "@tsTypes";
import { isArray, isBoolean, isInfinity, isNotANumber, isNull } from "@/utils";

/* ========== */

/**
 * @description 
 * - 获取变量的类型
 * - 此函数用于判断并返回给定值的数据类型
 * - 它特别处理了 null 和 array 类型，因为这两种类型在 JavaScript 中通过 typeof 操作符判断时会返回不明确的结果
 * - 对于 NaN 和 Infinity，它返回 "NaN" 和 "Infinity"，因为它们是特殊的数字类型，如果需要返回数字，可以修改此函数的第二个参数为 true
 * - 对于其他类型，它直接返回 typeof 操作符的结果
 * @function checkType
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @param { boolean } [strict=false] 是否启用严格检查，可选参数，默认为 false
 * - 如果为 true，则 NaN 返回 "NaN"，Infinity 和 -Infinity 返回 "Infinity"
 * - 如果为 false，则 NaN 和 Infinity 和 -Infinity 返回 "number"
 * @returns { StringOfAllTypes } 返回值的类型以字符串形式表示，如 "string", "number", "boolean", "null", "array" 等
 */
export const checkType = (val: unknown, strict: boolean = false): StringOfAllTypes => {
    if (isNull(val)) return "null"; // null 类型需要特殊处理，因为 typeof null 返回 "object"
    if (isArray(val)) return "array"; // array 类型需要特殊处理，因为 typeof [] 返回 "object"

    if (isBoolean(strict) && strict) {
        if (isNotANumber(val)) return "NaN"; // NaN 类型需要特殊处理，因为 typeof NaN 返回 "number"
        if (isInfinity(val)) return "Infinity"; // Infinity 类型需要特殊处理，因为 typeof Infinity 返回 "number"
    }

    return typeof val as StringOfAllTypes;
};

/**
 * @description 用于检查数组中每个元素的类型
 * @function getTypesFromArray
 * @param { Array<unknown> } val 数组包含任意类型的数据，其类型需要被判断
 * @param { boolean } [strict] 是否启用严格检查，可选参数，默认为 false
 * - 如果为 true，则 NaN 返回 "NaN"，Infinity 和 -Infinity 返回 "Infinity"
 * - 如果为 false，则 NaN 和 Infinity 和 -Infinity 返回 "number"
 * @returns { Array<StringOfAllTypes> } 返回数组中每个元素的类型字符串构成的数组
 */
export const getTypesFromArray = (
    val: Array<unknown>,
    strict?: boolean
): Array<StringOfAllTypes> => {
    if (!isArray(val)) throw new TypeError("Please provide valid array data.");
    return val.map(item => checkType(item, strict));
};

/**
 * @description 使用 Object.prototype.toString 返回一个值的类型字符串。
 * @function objectToString
 * @returns 值的类型字符串。
 */
export const objectToString: () => string = Object.prototype.toString;

/**
 * @description 从一个值的类型字符串中提取原始类型名称。
 * @function toRawType
 * @param val 要提取类型名称的值。
 * @returns 值的原始类型名称。
 */
export const toRawType = (val: unknown): string => toTypeString(val).slice(8, -1);

/**
 * @description 将一个值转换为其类型字符串表示形式。
 * @function toTypeString
 * @param val 要转换的值。
 * @returns 值的类型字符串表示形式。
 */
export const toTypeString = (val: unknown): string => objectToString.call(val);

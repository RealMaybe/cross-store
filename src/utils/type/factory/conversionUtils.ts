/* 类型转换工具 */

import { isString } from "@/utils";

/* ========== */

/**
 * @description 尝试宽松地将一个值转换为数字。
 * @function looseToNumber
 * @param val 要转换的值。
 * @returns 转换后的数字或如果转换失败则返回原始值。
 */
export const looseToNumber = (val: string | number): string | number => {
    const n = parseFloat(val as string);
    return isNaN(n) ? val : n;
};

/**
 * @description 将一个值转换为数字。
 * @function toNumber
 * @param val 要转换的值。
 * @returns 转换后的数字或如果转换失败则返回原始值。
 */
export const toNumber = (val: string | number): string | number => {
    const n = isString(val) ? Number(val) : NaN;
    return isNaN(n) ? val : n;
};

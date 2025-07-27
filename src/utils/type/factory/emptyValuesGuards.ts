/* 空值检测工具 */

import { isString, isArray, isPlainObject } from "@/utils";

/* ========== */

/**
 * @description 严格判断字符串是否为空（仅包含空格也不算空字符串）
 * @function isEmptyString
 * @param val 要判断的值
 * @returns 如果是空字符串则返回 true
 */
export const isEmptyString = (val: unknown): val is string => isString(val) && val === "";

/**
 * @description 判断字符串是否为空（仅包含空格也算作空字符串）
 * @function isEmptyStringLoose
 * @param val 要判断的值
 * @returns 如果是空字符串则返回 true
 */
export const isEmptyStringLoose = (val: unknown): val is string =>
    isString(val) && val.trim() === "";

/**
 * @description 判断数组是否为空
 * @function isEmptyArray
 * @param val 要判断的值
 * @returns 如果是空数组则返回 true
 */
export const isEmptyArray = (val: unknown): val is Array<never> => isArray(val) && val.length === 0;

/**
 * @description 判断普通对象是否为空
 * @function isEmptyObject
 * @param val 要判断的值
 * @returns 如果是空对象则返回 true
 */
export const isEmptyObject = (val: unknown): val is Record<string | symbol, never> =>
    isPlainObject(val) && Object.keys(val).length === 0;

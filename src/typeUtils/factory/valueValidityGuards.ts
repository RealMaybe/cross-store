/* 类型有效性验证工具 */

import type { InvalidChecker, IgnoreList } from "@tsTypes";
import { isInfinity, isNull, isNotANumber, isUndefined } from "@/typeUtils";

/* ========== */

/**
 * 判断一个值的类型是否为无效类型（其值内容为 null、undefined、NaN、Infinity 或 -Infinity 中的任一）
 * 可以通过第二个参数来指定要忽略的类型
 * @function isInvalid
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @param { IgnoreList } [ignore] 要忽略的类型，可选参数
 * @returns { boolean } 如果值是无效类型且没有被忽略，则返回 true，否则返回 false
 */
export const isInvalid = (val: unknown, ignore?: IgnoreList): boolean => {
    // 获取忽略列表
    const ignoreList: IgnoreList = ignore ?? [];

    // 检查预定义无效类型（仅检查未忽略的类型）
    const checkers: Array<InvalidChecker> = [
        { type: "null", check: isNull },
        { type: "undefined", check: isUndefined },
        { type: "NaN", check: isNotANumber },
        { type: "Infinity", check: isInfinity },
    ];

    // 检查自定义无效判断
    for (const { type, check } of checkers) {
        // 跳过忽略的类型
        if (ignoreList.includes(type)) continue;

        // 命中预定义无效类型
        if (check(val)) return true;
    }

    return false;
};

/**
 * 判断一个值的类型是否为有效效类型（其值内容不为 null、undefined、NaN、Infinity 或 -Infinity 中的任一）
 * 可以通过第二个参数来指定要忽略的类型
 * @function isValid
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @param { IgnoreList } [ignore] 要忽略的类型，可选参数
 * @returns { boolean } 如果值是有效类型（或有效值）且没有被忽略，则返回 true，否则返回 false
 */
export const isValid = (val: unknown, ignore?: IgnoreList): boolean => !isInvalid(val, ignore);

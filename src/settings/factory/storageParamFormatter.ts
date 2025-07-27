/* 用户参数验证和格式化 */

import type { } from "@tsTypes";
import { isString, isObjectAndNotArray } from "@/utils";

/* ========== */

/**
 * @description 对传入的用户参数进行验证和格式化
 * @function storageParamFormatter
 * @param { string | object } userOptions 用户参数
 * @returns { object } 处理后的用户参数
 */
export function storageParamFormatter(userOptions: string | object): object {
    // 如果用户参数是字符串，则将其格式化为对象
    if (isString(userOptions)) return { key: userOptions };

    // 如果用户参数是对象，则返回该对象
    else if (isObjectAndNotArray(userOptions)) return { ...userOptions, key: userOptions.key };

    // 否则抛出错误
    else throw new TypeError("用户参数格式错误");
}

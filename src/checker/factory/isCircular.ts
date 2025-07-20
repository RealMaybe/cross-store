/* 检测对象是否是循环引用 */

import type { CircularItem, CheckCircularResult } from "@tsTypes";
import { isObject, isArray, isObjectAndNotArray } from "@/typeUtils";


/* ========== */


/**
 * @description 检测对象是否是循环引用
 * @param { CircularItem } item 需要检测的对象
 * @returns { boolean }
 */
export function isCircular(item: CircularItem): boolean;

/**
 * @description 检测对象是否是循环引用
 * @param { CircularItem } item 需要检测的对象
 * @param { boolean } deal 是否处理
 * @returns { boolean }
 */
export function isCircular(item: CircularItem, deal: true): CheckCircularResult<CircularItem>;

// 实现逻辑
export function isCircular(
    item: CircularItem,
    deal?: boolean
): CheckCircularResult<CircularItem> | boolean {
    const seenObjects = new WeakMap<object, Array<string>>();
    let ObjectIsCircular: boolean = false;

    /**
     * 检测对象或数组中是否存在循环引用。
     * 
     * @param { CircularItem } currentObj 要检测的对象或数组。
     * @param { Array<string> } path 当前路径（用于递归跟踪）。
     * @returns { CircularItem } 如果启用了 `deal` 参数，则返回处理后的对象或数组；否则返回原始对象或数组。
     */
    function detectCircular(
        currentObj: CircularItem,
        path: Array<string> = []
    ): CircularItem {
        // 如果当前对象不是对象或数组，则直接返回
        if (!isObject(currentObj)) return currentObj;

        if (seenObjects.has(currentObj as object)) {
            ObjectIsCircular = true;

            return deal ?
                "[Circular]" as unknown as CircularItem :
                currentObj;
        }

        seenObjects.set(currentObj, path);

        // 是数组
        if (isArray(currentObj))
            for (let i = 0; i < currentObj.length; i++) {
                currentObj[i] = detectCircular(currentObj[i], [...path, i.toString()]);
            }

        // 是对象
        else if (isObjectAndNotArray(currentObj))
            for (const key in currentObj) {
                if (currentObj.hasOwnProperty(key))
                    currentObj[key] = detectCircular(currentObj[key], [...path, key]);
            }

        // 是其他类型
        return currentObj;
    }

    const result = detectCircular(item);

    // 如果 deal 为 true，则返回处理后的结果，否则返回是否是循环引用
    return deal ? { circular: ObjectIsCircular, value: result } : ObjectIsCircular;
}
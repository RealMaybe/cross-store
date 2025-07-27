/* 检测对象是否是循环引用 */

import type { CircularItem, CheckCircularResult } from "@tsTypes";
import { isObject, isArray } from "@/utils";
import { objKeys } from "@/var";

/* ========== */

/**
 * 检测对象或数组是否包含循环引用（不进行任何处理）
 * @function circularFilter
 * @template T
 * @param { T } item - 需要检测的对象或数组
 * @returns { CheckCircularResult } 检测结果
 */
export function circularFilter<T extends CircularItem>(item: T): CheckCircularResult<T>;

/**
 * 检测并处理对象或数组中的循环引用
 * @function circularFilter
 * @template T
 * @param { T } item 需要处理的对象或数组
 * @param { true } filter 设置为 true 以启用循环引用处理
 * @returns { CheckCircularResult } 处理结果（无循环引用时返回原对象）
 */
export function circularFilter<T extends CircularItem>(
    item: T,
    filter: true
): CheckCircularResult<T>;

/* ========== */

/**
 * 循环引用过滤器核心实现
 * @function circularFilter
 * @template T
 * @param { T } item 需要处理的对象或数组
 * @param { boolean } [filter] 是否启用循环引用处理
 * @returns { CheckCircularResult } 处理结果
 */
export function circularFilter<T extends CircularItem>(
    item: T,
    filter?: boolean
): CheckCircularResult<T> {
    const visited = new WeakSet<object>();
    let hasCircular = false;

    /* ========== */

    /**
     * 检测循环引用（深度优先遍历）
     * @param { unknown } obj 当前检测的对象
     * @returns { boolean } 是否检测到循环引用
     */
    function detect(obj: unknown): boolean {
        if (!isObject(obj)) return false;
        if (visited.has(obj)) return true;

        visited.add(obj);
        const keys = [
            ...objKeys(obj),
            ...Object.getOwnPropertySymbols(obj).filter(sym =>
                Object.prototype.propertyIsEnumerable.call(obj, sym)
            ),
        ];

        for (const key of keys) {
            if (detect((obj as Record<string | symbol, unknown>)[key])) {
                hasCircular = true;
                if (!filter) return true;
            }
        }

        visited.delete(obj);
        return false;
    }

    /* ========== */

    /**
     * 处理循环引用（深度克隆并替换循环引用）
     * @param { unknown } obj 当前处理的对象
     * @param { WeakMap<object, object> } [clonedMap] 已克隆对象映射
     * @param { WeakSet<object> } [inProgress] 处理中的对象集合
     * @returns { unknown } 处理后的对象
     */
    function process(
        obj: unknown,
        clonedMap: WeakMap<object, object> = new WeakMap<object, object>(),
        inProgress: WeakSet<object> = new WeakSet<object>()
    ): unknown {
        if (!isObject(obj)) return obj;
        if (clonedMap.has(obj)) return clonedMap.get(obj);

        const newObj: any = isArray(obj) ? [] : {};
        clonedMap.set(obj, newObj);
        inProgress.add(obj);

        const keys = [
            ...Object.keys(obj),
            ...Object.getOwnPropertySymbols(obj).filter(sym =>
                Object.prototype.propertyIsEnumerable.call(obj, sym)
            ),
        ];

        for (const key of keys) {
            const val = (obj as any)[key];
            if (inProgress.has(val as object)) newObj[key] = "[Circular Reference]";
            else newObj[key] = process(val, clonedMap, inProgress);
        }

        inProgress.delete(obj);
        return newObj;
    }

    /* ========== */

    // 执行循环引用检测
    detect(item);

    return {
        isCircular: hasCircular,
        value: filter ? (hasCircular ? (process(item) as T) : item) : void 0,
    };
}

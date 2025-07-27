/* Value to string */

import type { CircularItem } from "@tsTypes";
import {
    isBigInt,
    isCircular,
    isFunction,
    isObject,
    isString,
    isSymbol,
    isUndefined,
} from "@/utils";

/* ========== */

type ClassConfig = { warn?: boolean; circular?: boolean };

declare function CircularLeach(obj: object): object;

/* ========== */

/**
 * @description 将值转换为字符串
 * @function valueToString
 * @param config 配置项
 * @param val 需要处理的值
 * @returns 处理后的字符串
 */
export const valueToString = (
    config: ClassConfig,
    val: unknown
): string => {
    // 自定义序列化处理器
    const replacer = (_key: string, value: any): any => {
        // 处理 BigInt
        if (isBigInt(value)) {
            if (warn) console.warn("BigInt value converted to string");
            return value.toString();
        }

        // 处理 Symbol
        if (isSymbol(value)) {
            if (warn) console.warn("Symbol value converted to string");
            return value.toString();
        }

        // 处理 undefined（在对象属性中）
        if (isUndefined(value)) {
            if (warn) console.warn("Undefined value converted to null");
            return null;
        }

        return value;
    };

    /* ========== */

    // 默认配置
    const { warn = false, circular = false } = config;

    // 处理字符串
    if (isString(val)) return val;

    // 处理循环引用
    if (isObject(val) && isCircular(val as CircularItem)) {
        if (circular) val = CircularLeach(val);
        else throw new Error("Circular reference detected");
    }

    // 特殊处理 undefined（顶层）
    if (isUndefined(val)) {
        if (warn) console.warn("Top-level undefined converted to string");
        return "undefined";
    }

    // 特殊处理函数
    if (isFunction(val)) {
        if (warn) console.warn("Function converted to string");
        return val.toString();
    }

    // 尝试使用 JSON.stringify 处理其他类型
    try {
        return JSON.stringify(val, replacer); // 使用 JSON.stringify 处理其他类型
    } catch (error) {
        if (warn) console.warn("String conversion error:", error); // 处理 JSON.stringify 的异常
        return String(val);
    }
}

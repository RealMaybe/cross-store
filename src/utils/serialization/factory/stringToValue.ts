/*  */

import { convertToBigInt, convertToNumber, inferType, parseObject, isValid } from "@/utils";

/* ========== */

type valueType = "string" | "boolean" | "number" | "bigint" | "object" | "array";

/* ========== */

/**
 * @description 将字符串转换为值
 * @param _config 配置项
 * @param val 字符串值
 * @param to 目标类型
 * @returns 转换后的值
 */
export const stringToValue = (
    _config: null,
    val: string,
    to?: valueType
): any => {
    const trimmed = val.trim();

    // 特殊处理 "null" 和 "undefined" 字符串
    if (trimmed === "null") {
        switch (to) {
            case "string":
                return "null";
            case "boolean":
                return false;
            case "number":
                return 0;
            default:
                return null;
        }
    }

    if (trimmed === "undefined") {
        switch (to) {
            case "string":
                return "undefined";
            case "boolean":
                return false;
            case "number":
                return 0;
            default:
                return undefined;
        }
    }

    // 如果指定了目标类型
    if (isValid(to)) {
        switch (to) {
            case "string":
                return val;

            case "boolean":
                return trimmed.toLowerCase() === "true";

            case "number":
                return convertToNumber(trimmed);

            case "bigint":
                return convertToBigInt(trimmed);

            case "object":
                return parseObject(trimmed, false);

            case "array":
                return parseObject(trimmed, true);

            default:
                return val;
        }
    }

    // 自动类型推断
    return inferType(trimmed);
}
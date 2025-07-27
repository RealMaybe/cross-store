/*  */

import { convertToNumber, convertToBigInt, parseObject } from "@/utils";

// 辅助函数：自动类型推断
export const inferType = (trimmed: string): any => {
    // 处理布尔值
    const lowerTrimmed = trimmed.toLowerCase();
    if (lowerTrimmed === "true") return true;
    if (lowerTrimmed === "false") return false;

    // 处理特殊数字值
    if (["nan", "infinity", "-infinity"].includes(lowerTrimmed))
        return convertToNumber(lowerTrimmed);

    // 处理数字（整数、小数、科学计数法）
    if (/^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(trimmed)) return Number(trimmed);

    // 处理特殊数字格式
    if (/^0x[0-9a-f]+$/i.test(trimmed)) return parseInt(trimmed, 16);
    if (/^0o[0-7]+$/i.test(trimmed)) return parseInt(trimmed.slice(2), 8);
    if (/^0b[01]+$/i.test(trimmed)) return parseInt(trimmed.slice(2), 2);

    // 处理 BigInt（带或不带 'n' 后缀）
    if (/^[-+]?\d+$/.test(trimmed) && trimmed.length > 15) return BigInt(trimmed);
    if (/^[-+]?[\d_]+n$/.test(trimmed)) return convertToBigInt(trimmed);

    // 处理对象和数组
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) return parseObject(trimmed, false);
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) return parseObject(trimmed, true);

    // 默认返回原始字符串
    return trimmed;
}

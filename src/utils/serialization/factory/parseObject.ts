/*  */

import { validateParsedType } from "@/utils";

// 增强的对象/数组解析函数
export const parseObject = (trimmed: string, expectArray: boolean): any => {
    // 尝试解析标准 JSON
    try {
        const result = JSON.parse(trimmed);
        validateParsedType(result, expectArray);
        return result;
    } catch (e: unknown) {
        // 如果标准 JSON 解析失败，尝试解析非标准格式
        try {
            let normalized = trimmed;

            // 为键添加引号（如果缺失）
            if (!expectArray)
                normalized = normalized.replace(/([{,]\s*)([a-zA-Z_$][\w$]*)(\s*:)/g, '$1"$2"$3'); // 对象：将 {key: value} 转换为 {"key": value}

            // 尝试再次解析
            const result = JSON.parse(normalized);
            validateParsedType(result, expectArray);
            return result;
        } catch (e2: unknown) {
            // 作为最后的手段，尝试使用 Function 解析
            try {
                // 安全地评估表达式
                const result = new Function(`return ${trimmed}`)();
                validateParsedType(result, expectArray);
                return result;
            } catch (e3: unknown) {
                throw new Error(
                    `Failed to parse ${expectArray ? "array" : "object"}: ${(e3 as Error).message}`
                );
            }
        }
    }
};

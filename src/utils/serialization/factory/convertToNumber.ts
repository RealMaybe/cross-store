// 辅助函数：转换为数字（处理特殊值）
export const convertToNumber = (trimmed: string): number => {
    const lowerTrimmed = trimmed.toLowerCase();

    switch (lowerTrimmed) {
        case "nan":
            return NaN;
        case "infinity":
            return Infinity;
        case "-infinity":
            return -Infinity;
        default:
            // 处理十六进制、八进制等格式
            if (/^0x[0-9a-f]+$/i.test(lowerTrimmed)) return parseInt(lowerTrimmed, 16);
            if (/^0o[0-7]+$/i.test(lowerTrimmed)) return parseInt(lowerTrimmed.slice(2), 8);
            if (/^0b[01]+$/i.test(lowerTrimmed)) return parseInt(lowerTrimmed.slice(2), 2);
            return Number(trimmed);
    }
};

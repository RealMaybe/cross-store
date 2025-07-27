// 辅助函数：转换为 BigInt
export const convertToBigInt = (trimmed: string): bigint => {
    // 移除数字分隔符和空格
    const cleanVal = trimmed.replace(/[_,\s]/g, "");

    // 移除末尾的 "n"（如果存在）
    const numStr = cleanVal.endsWith("n") ? cleanVal.slice(0, -1) : cleanVal;

    return BigInt(numStr);
};

// 验证解析结果的类型
export function validateParsedType(result: any, expectArray: boolean): void {
    if (expectArray && !Array.isArray(result)) throw new Error("Expected array but got object");
    if (!expectArray && Array.isArray(result)) throw new Error("Expected object but got array");
}

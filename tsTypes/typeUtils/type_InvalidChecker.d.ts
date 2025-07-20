/**
 * @description 允许忽略的类型字面量
 */
export type InvalidTypeString = "null" | "undefined" | "NaN" | "Infinity";

/**
 * @description 允许忽略的类型构成的数组
 */
export type IgnoreList = Array<InvalidTypeString>;

/**
 * @description 检查类型函数的返回值
 */
export interface InvalidChecker {
    type: InvalidTypeString,
    check: (val: unknown) => boolean
};

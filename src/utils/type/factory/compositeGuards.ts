/* 组合类型守卫 */

/* ========== */

/**
 * 类型安全的多重类型守卫检查器
 * 检查值是否满足任意类型守卫条件，并缩小类型范围
 *
 * @template T 由类型守卫推断类型组成的元组
 * @param val 待检测的值
 * @param guards 类型守卫函数元组
 * - 每个守卫为 `(v: unknown) => v is SomeType` 或者 `(v: unknown) => boolean` 的形式
 * @returns 如果满足任意守卫则返回 true，同时将类型缩小为守卫类型的联合类型
 *
 * @example
 * if (isOneOf( // 检测是否为 string 或 number
 *     value,
 *     v => typeof v === "string",
 *     v => typeof v === "number"
 * )) {
 *     // 在这里 value 会被推断为 string | number 类型
 * }
 *
 * @example
 * if (isOneOf(value, isString, isNumber)) {}
 * if (isString(value) || isNumber(value) {}
 * // 上面两个例子是等价的
 */
export const isOneOf = <T extends readonly unknown[]>(
    val: unknown,
    ...guards: { [K in keyof T]: (v: unknown) => v is T[K] | boolean }
): val is T[number] => guards.some(guard => guard(val));

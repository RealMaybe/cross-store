/**
 * @description 所有有效类型的集合
 */
type EffectiveMap = {
    array: Array<unknown>;
    bigint: bigint;
    boolean: boolean;
    function: Function;
    number: number;
    object: Record<string | symbol | number, unknown>;
    string: string;
    symbol: symbol;
};

/**
 * @description 所有无效类型的集合
 */
type InvalidTypesMap = {
    null: null;
    undefined: undefined;
    NaN: typeof NaN;
    Infinity: typeof Infinity;
};

/* ========== */

/**
 * @description 对象和数组的集合
 */
export type ObjectAndArray = Array<unknown> | Record<string, unknown>;

/**
 * @description 函数类型
 */
export type SafeFunction = (...args: unknown[]) => unknown; 

/* ========== */

/**
 * @description 所有类型的集合
 */
type AllTypesMap = EffectiveMap & InvalidTypesMap;

/**
 * @description 所有有效类型对应的字符串
 */
export type StringOfEffectiveTypes = keyof EffectiveMap;

/**
 * @description 所有无效类型对应的字符串
 */
export type StringOfInvalidTypes = keyof InvalidTypesMap;

/**
 * @description 所有类型对应的字符串
 */
export type StringOfAllTypes = keyof AllTypesMap;

/* ========== */

/**
 * @description 所有有效类型
 */
export type EffectiveTypes = EffectiveMap[StringOfEffectiveTypes];

/**
 * @description 所有无效类型
 */
export type InvalidTypes = InvalidTypesMap[StringOfInvalidTypes];

/**
 * @description 所有类型
 */
export type AllTypes = AllTypesMap[StringOfAllTypes];

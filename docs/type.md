# 类型检查工具组合

## index.ts

```typescript
/* 类型检查工具包 */

export * from "./factory/conversionUtils";
export * from "./factory/effectivenessValidators";
export * from "./factory/invalidTypeGuards";
export * from "./factory/objectTypeGuards";
export * from "./factory/typeDetectionUtils";
export * from "./factory/validTypeGuards";
export * from "./factory/typeValidityValidator";
```

---

## conversionUtils.ts

```typescript
/* 类型转换工具 */

import { isString } from "@/typeUtils";

/* ========== */

/**
 * @description 尝试宽松地将一个值转换为数字。
 * @function looseToNumber
 * @param val 要转换的值。
 * @returns 转换后的数字或如果转换失败则返回原始值。
 */
export const looseToNumber = (val: string | number): string | number => {
    const n = parseFloat(val as string);
    return isNaN(n) ? val : n;
};

/**
 * @description 将一个值转换为数字。
 * @function toNumber
 * @param val 要转换的值。
 * @returns 转换后的数字或如果转换失败则返回原始值。
 */
export const toNumber = (val: string | number): string | number => {
    const n = isString(val) ? Number(val) : NaN;
    return isNaN(n) ? val : n;
};
```

---

## effectivenessValidators.ts

```typescript
/* 内容有效性验证工具 */

import {
    checkType,
    isBoolean,
    isInfinity,
    isNotANumber,
    isArray,
    isPlainObject,
} from "@/typeUtils";

/* ========== */

/**
 * 判断一个值是否为有效值
 * - false、null、0、NaN、undefined、Infinity 或 -Infinity、空字符串、空数组、空对象 均会被本函数认为是无效值
 * - 其他值均会被认为是有效值
 * - 去除对 ±Infinity、空数组、空对象 的判断可以使用第二个参数来忽略掉（默认开启这个忽略）
 * @function isEffective
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @param { boolean } [ignore=true] 是否忽略对 ±Infinity、空数组、空对象 的判断，默认为 true
 * @return { boolean } 如果传入的值不是无效值，则返回 true，否则返回 false
 */
export const isEffective = (val: unknown, ignore: boolean = true): boolean => {
    // 1. 基础假值检查（始终执行）
    if (!val && val !== 0 && val !== false) return false;

    // 2. 特殊值检查
    switch (checkType(val)) {
        case "number":
            if (isNotANumber(val) || val === 0) return false;
            if (!ignore && isInfinity(val)) return false;
            break;

        case "string":
            if ((val as string).trim() === "") return false;
            break;

        case "boolean":
            if (isBoolean(val) && val === false) return false;
            break;
    }

    // 3. 如果忽略扩展检查，提前返回
    if (isBoolean(ignore) && ignore) return true;

    // 4. 扩展检查（空集合）
    if (isArray(val) && val.length === 0) return false;
    if (isPlainObject(val) && Object.keys(val).length === 0) return false;

    return true;
};

/**
 * 判断一个值是否为无效值
 * - false、null、0、NaN、undefined、Infinity 或 -Infinity、空字符串、空数组、空对象 均会被本函数认为是无效值
 * - 其他值均会被认为是有效值
 * - 去除对 ±Infinity、空数组、空对象 的判断可以使用第二个参数来忽略掉（默认开启这个忽略）
 * @function isIneffective
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果传入的值是无效值，则返回 true，否则返回 false
 */
export const isIneffective = (val: unknown, ignore?: boolean): boolean => !isEffective(val, ignore);

```

---

## invalidTypeGuards.ts

```typescript
/* 基础类型检查函数 */

import { objIs } from "@/var";
import { isNumber } from "@/typeUtils";

/* ========== */

/**
 * @description 判断一个值是否为 Infinity 或 -Infinity
 * @function isInfinity
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值为 Infinity 或 -Infinity，则返回 true，否则返回 false
 */
export const isInfinity = (val: unknown): val is typeof Infinity =>
    isNumber(val) && (val === Infinity || val === -Infinity);

/**
 * @description 判断一个值是否为 NaN
 * @function isNotANumber
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是 NaN，则返回 true，否则返回 false
 */
export const isNotANumber = (val: unknown): val is typeof NaN => isNumber(val) && objIs(NaN, val);

/**
 * @description 判断一个值是否为 null
 * @function isNull
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是 null，则返回 true，否则返回 false
 */
export const isNull = (val: unknown): val is null => val === null;

/**
 * @description 判断一个值是否为 undefined
 * @function isUndefined
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是 undefined，则返回 true，否则返回 false
 */
export const isUndefined = (val: unknown): val is undefined => val === void 0;

```

---

## objectTypeGuards.ts

```typescript
/* 对象类型守卫 */

import { toTypeString, isFunction, isObject, isObjectAndNotArray } from "@/typeUtils";

/* ========== */

/**
 * @description 判断一个值是否是 Date 实例。
 * @function isDate
 * @param val 要判断的值。
 * @returns 如果值是 Date，则返回 true，否则返回 false。
 */
export const isDate = (val: unknown): boolean => toTypeString(val) === "[object Date]";

/**
 * @description 判断一个值是否是 Map 实例。
 * @function isMap
 * @param val 要判断的值。
 * @returns 如果值是 Map，则返回 true，否则返回 false。
 */
export const isMap = (val: unknown): boolean => toTypeString(val) === "[object Map]";

/**
 * @description 判断一个值是否是普通对象。
 * @function isPlainObject
 * @param val 要判断的值。
 * @returns 如果值是普通对象，则返回 true，否则返回 false。
 */
export const isPlainObject = (val: unknown): boolean =>
    isObjectAndNotArray(val) && toTypeString(val) === "[object Object]";

/**
 * @description 判断一个值是否是 Promise。
 * @function isPromise
 * @param val 要判断的值。
 * @returns 如果值是 Promise，则返回 true，否则返回 false。
 */
export const isPromise = (val: unknown): boolean => {
    return (
        (isObject(val) || isFunction(val)) &&
        isFunction((val as any).then) &&
        isFunction((val as any).catch)
    );
};

/**
 * @description 判断一个值是否是 RegExp 实例。
 * @function isRegExp
 * @param val 要判断的值。
 * @returns 如果值是 RegExp，则返回 true，否则返回 false。
 */
export const isRegExp = (val: unknown): boolean => toTypeString(val) === "[object RegExp]";

/**
 * @description 判断一个值是否是 Set 实例。
 * @function isSet
 * @param val 要判断的值。
 * @returns 如果值是 Set，则返回 true，否则返回 false。
 */
export const isSet = (val: unknown): boolean => toTypeString(val) === "[object Set]";

```

---

## typeDetectionUtil.ts

```typescript
/* 类型检测工具 */

import type { StringOfAllTypes } from "@tsTypes";
import { isArray, isBoolean, isInfinity, isNotANumber, isNull } from "@/typeUtils";

/* ========== */

/**
 * @description 获取变量的类型
 * - 此函数用于判断并返回给定值的数据类型
 * - 它特别处理了 null 和 array 类型，因为这两种类型在 JavaScript 中通过 typeof 操作符判断时会返回不明确的结果
 * - 对于 NaN 和 Infinity，它返回 "NaN" 和 "Infinity"，因为它们是特殊的数字类型，如果需要返回数字，可以修改此函数的第二个参数为 true
 * - 对于其他类型，它直接返回 typeof 操作符的结果
 * @function checkType
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @param { boolean } [strict=false] 是否启用严格检查，可选参数，默认为 false
 * - 如果为 true，则 NaN 返回 "NaN"，Infinity 返回 "Infinity"
 * - 如果为 false，则 NaN 和 Infinity 返回 "number"
 * @returns { StringOfAllTypes } 返回值的类型以字符串形式表示，如 "string", "number", "boolean", "null", "array" 等
 */
export const checkType = (
    val: unknown,
    strict: boolean = false
): StringOfAllTypes => {
    if (isNull(val)) return "null";
    if (isArray(val)) return "array";

    if (isBoolean(strict) && strict) {
        if (isNotANumber(val)) return "NaN";
        if (isInfinity(val)) return "Infinity";
    }

    return typeof val;
};

/**
 * @description 用于检查数组中每个元素的类型
 * @function getTypesFromArray
 * @param { Array<unknown> } val 数组包含任意类型的数据，其类型需要被判断
 * @param { boolean } [strict] 是否启用严格检查，可选参数，默认为 false
 * - 如果为 true，则 NaN 返回 "NaN"，Infinity 返回 "Infinity"
 * - 如果为 false，则 NaN 和 Infinity 返回 "number"
 * @returns { Array<StringOfAllTypes> } 返回数组中每个元素的类型字符串构成的数组
 */
export const getTypesFromArray = (
    val: Array<unknown>,
    strict?: boolean
): Array<StringOfAllTypes> => {
    if (!isArray(val)) throw new TypeError("Please provide valid array data.");
    return val.map(item => checkType(item, strict));
};

/**
 * @description 使用 Object.prototype.toString 返回一个值的类型字符串。
 * @function objectToString
 * @param val 要检查的值。
 * @returns 值的类型字符串。
 */
export const objectToString = Object.prototype.toString as () => string;

/**
 * @description 从一个值的类型字符串中提取原始类型名称。
 * @function toRawType
 * @param val 要提取类型名称的值。
 * @returns 值的原始类型名称。
 */
export const toRawType = (val: unknown): string => {
    return toTypeString(val).slice(8, -1);
};

/**
 * @description 将一个值转换为其类型字符串表示形式。
 * @function toTypeString
 * @param val 要转换的值。
 * @returns 值的类型字符串表示形式。
 */
export const toTypeString = (val: unknown): string => objectToString.call(val);

```

---

## typeValidityValidator.ts

```typescript
/* 类型有效性验证工具 */

import type { InvalidChecker, IgnoreList } from "@tsTypes";
import { isInfinity, isNull, isNotANumber, isUndefined } from "@/typeUtils";

/* ========== */

/**
 * 判断一个值的类型是否为无效类型（其值内容为 null、undefined、NaN、Infinity 或 -Infinity 中的任一）
 * 可以通过第二个参数来指定要忽略的类型
 * @function isInvalid
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @param { IgnoreList } [ignore] 要忽略的类型，可选参数
 * @returns { boolean } 如果值是无效类型且没有被忽略，则返回 true，否则返回 false
 */
export const isInvalid = (val: unknown, ignore?: IgnoreList): boolean => {
    // 获取忽略列表
    const ignoreList: IgnoreList = ignore || [];

    // 检查预定义无效类型（仅检查未忽略的类型）
    const checkers: Array<InvalidChecker> = [
        { type: "null", check: isNull },
        { type: "undefined", check: isUndefined },
        { type: "NaN", check: isNotANumber },
        { type: "Infinity", check: isInfinity },
    ];

    // 检查自定义无效判断
    for (const { type, check } of checkers) {
        // 跳过忽略的类型
        if (ignoreList.includes(type)) continue;

        // 命中预定义无效类型
        if (check(val)) return true;
    }

    return false;
};

/**
 * 判断一个值的类型是否为有效效类型（其值内容不为 null、undefined、NaN、Infinity 或 -Infinity 中的任一）
 * 可以通过第二个参数来指定要忽略的类型
 * @function isValid
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @param { IgnoreList } [ignore] 要忽略的类型，可选参数
 * @returns { boolean } 如果值是有效类型（或有效值）且没有被忽略，则返回 true，否则返回 false
 */
export const isValid = (val: unknown, ignore?: IgnoreList): boolean => !isInvalid(val, ignore);

```

---

## validTypeGuards.ts

```typescript
/* 有效类型守卫 */

import type { ObjectAndArray } from "@tsTypes";

/* ========== */

/**
 * @description 判断一个值是否为数组
 * @function isArray
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是数组，则返回 true，否则返回 false
 */
export const isArray = (val: unknown): val is Array<unknown> => Array.isArray(val);

/**
 * @description 判断一个值是否为 bigint
 * @function isBigInt
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是 bigint，则返回 true，否则返回 false
 */
export const isBigInt = (val: unknown): val is bigint => typeof val === "bigint";

/**
 * @description 判断一个值是否为布尔值
 * @function isBoolean
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是布尔值，则返回 true，否则返回 false
 */
export const isBoolean = (val: unknown): val is boolean => typeof val === "boolean";

/**
 * @description 判断一个值是否为函数
 * @function isFunction
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是函数，则返回 true，否则返回 false
 */
export const isFunction = (val: unknown): val is (...args: Array<unknown>) => unknown =>
    typeof val === "function";

/**
 * @description 判断一个值是否为数字
 * @function isNumber
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是数字，则返回 true，否则返回 false
 */
export const isNumber = (val: unknown): val is number => typeof val === "number";

/**
 * @description 判断一个值是否为非 null 对象
 * @function isObject
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是非 null 对象，则返回 true，否则返回 false
 */
export const isObject = (val: unknown): val is ObjectAndArray =>
    typeof val === "object" && val !== null;

/**
 * @description 判断一个值是否为非 null 非数组对象
 * @function isObjectAndNotArray
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是非 null 非数组对象，则返回 true，否则返回 false
 */
export const isObjectAndNotArray = (val: unknown): val is Record<string, unknown> =>
    isObject(val) && !isArray(val);

/**
 * @description 判断一个值是否为字符串
 * @function isString
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是字符串，则返回 true，否则返回 false
 */
export const isString = (val: unknown): val is string => typeof val === "string";

/**
 * @description 判断一个值是否为 symbol
 * @function isSymbol
 * @param { unknown } val 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值是 symbol，则返回 true，否则返回 false
 */
export const isSymbol = (val: unknown): val is symbol => typeof val === "symbol";

```

## emptyValuesGuards.ts

```typescript
/* 空值检测工具 */

import { isString, isArray, isPlainObject } from "@/typeUtils";

/* ========== */

/**
 * @description 判断字符串是否为空（包含空白字符）
 * @function isEmptyString
 * @param val 要判断的值
 * @returns 如果是空字符串则返回 true
 */
export const isEmptyString = (val: unknown): val is string => isString(val) && val.trim() === "";

/**
 * @description 判断数组是否为空
 * @function isEmptyArray
 * @param val 要判断的值
 * @returns 如果是空数组则返回 true
 */
export const isEmptyArray = (val: unknown): val is Array<never> => isArray(val) && val.length === 0;

/**
 * @description 判断普通对象是否为空
 * @function isEmptyObject
 * @param val 要判断的值
 * @returns 如果是空对象则返回 true
 */
export const isEmptyObject = (val: unknown): val is Record<string, never> =>
    isPlainObject(val) && Object.keys(val).length === 0;

```

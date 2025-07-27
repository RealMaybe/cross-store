export const isArray = <T extends unknown>(v: unknown): v is Array<T> => Array.isArray(v);

export const isString = (v: unknown): v is string => typeof v === "string";
export const isNumber = (v: unknown): v is number => typeof v === "number";
export const isBoolean = (v: unknown): v is boolean => typeof v === "boolean";

export const isObject = (v: unknown): v is object => typeof v === "object" && v !== null;

export const isOneOf = <T extends Array<unknown>>(
    val: unknown,
    ...guards: { [K in keyof T]: (v: unknown) => v is T[K] }
): val is T[number] => guards.some(guard => guard(val));

export function handleInput(input: unknown, ...checkers: Array<(v: unknown) => v is unknown>) {
    if (isOneOf(input, ...checkers)) return input;

    throw new Error("Invalid input type");
}

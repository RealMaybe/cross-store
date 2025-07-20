type CircularObject = {
    [key: string]: CircularObject | Array<CircularObject> | CircularArray; // 自身引用
}

type CircularArray = Array<CircularArray> | Array<CircularObject>;

/**
 * 循环引用检查器需要查验的数据类型。
*/
export type CircularItem = CircularObject | CircularArray;

/**
 * 循环引用检查器的返回结果类型。
 */
export type CheckCircularResult<T extends CircularItem> = {
    circular: boolean,
    value: T
};
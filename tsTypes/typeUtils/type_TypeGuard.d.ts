/**
 * @interface TypeGuard
 * @description TypeGuard interface for TypeScript.
 * 此接口用于定义类型保护函数，该函数检查值是否为特定类型。
 */
export interface Thenable {
    then?: unknown;
}

/**
 * @interface PromiseWithCatch
 * @description PromiseWithCatch interface for TypeScript.
 * 此接口用于定义具有catch方法的Promise类型。
 */
export interface PromiseWithCatch {
    catch?: unknown;
}

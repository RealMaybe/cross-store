/* isProvider */

// import
import { isObjectAndNotArray } from "@/utils";

// type
type Provider = {
    get: () => any
};


/* ========== */


/**
 * @description Check if the value is a Provider
 * @param { unknown } val
 * @returns { boolean }
 */
export function isProvider(val: unknown): val is Provider {
    return isObjectAndNotArray(val)
}
/**
 * @description 如果值相同，则返回true，否则返回false。
 * @param { any } value1 第一个值
 * @param { any } value2 第二个值
 * @return { boolean } 如果值相同，则返回true，否则返回false
 */
export const objIs = (value1: any, value2: any): boolean => Object.is(value1, value2);
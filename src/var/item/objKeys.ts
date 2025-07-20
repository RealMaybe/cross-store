/**
 * @description 获取对象键
 * @param { { [key: string]: any } } obj 对象
 * @return { Array<any> } 对象值数组
 */
export const objKeys = (obj: { [key: string]: any }): Array<string> => Object.keys(obj);
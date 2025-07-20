/**
 * @description 获取对象值
 * @param { { [key: string]: any } } obj 对象
 * @return { Array<any> } 对象值数组
 */
export const objValues = (obj: { [key: string]: any }): Array<any> => Object.values(obj);
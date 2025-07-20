/* 用于检查指定类型的 Web 存储是否可用 */

export type AvailableStorageType = keyof Window & string & ("localStorage" | "sessionStorage");

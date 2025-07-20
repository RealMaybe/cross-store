import type { WebStorageType } from "@tsTypes";
import { StorageRequiredAttributes } from "@tsTypes";


/* ========== */


/**
 * 可选属性
 */
type OptionalAttribute = {
    circular?: boolean,
    maxSize?: number,
    original?: boolean,
    prefix?: string,
};


/**
 * 用户传入的配置对象的类型
 * - 【type 与 storageType 互斥，即 storageType 和 type 只能有一个有值】
 * - 【在 storageType 和 type 都有值的情况下，以 storageType 为准】
 * 
 * - storageType：存储类型
 *     - 可选值："local" 和 "session"
 * - type：存储类型
 *     - 可选值："local" 和 "session"
 * - warn：是否打印警告
 *     - 默认值：true
 * - circular：是否允许循环引用
 *     - 默认值：false
 * - maxSize：最大存储大小
 *     - 默认值：5242880
 * - prefix：前缀
 *     - 默认值："myApp_"

 * - monitor：是否开启监控
 *     - 默认值：false
 * - channelName：频道名称
 *     - 默认值："StorageProvider_Channel"
 */
type UserOptionsObject = StorageRequiredAttributes & OptionalAttribute;

/**
 * 用户传入的配置对象的字符串类型
 */
type UserOptionsString = WebStorageType;

/**
 * 用户传入的配置信息
 */
export type UserOptionsType = UserOptionsObject | UserOptionsString;

/**
 * 经过校验后的用户传入的配置信息
 */
export type UserOptionsObjectType = UserOptionsObject;
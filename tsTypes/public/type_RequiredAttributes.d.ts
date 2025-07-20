import { WebStorageType } from "@tsTypes";

/* ========== */

// 存储配置对象

/**
 * @description 包含 storageType 属性的配置对象类型
 */
declare interface HasStorageType {
    storageType: WebStorageType;
    type?: never;
}

/**
 * @description 包含 type 属性的配置对象类型
 */
declare interface HasType {
    type: WebStorageType;
    storageType?: never;
}

/**
 * @description 配置对象中包含 warn 属性的类型
 */
declare interface HasWarn {
    warn: boolean;
    warning?: never;
}

/**
 * @description 配置对象中包含 warning 属性的类型
 */
declare interface HasWarning {
    warning: boolean;
    warn?: never;
}

/**
 * @description 最终的配置对象类型，包含两个必需的属性
 * - storageType (或 type)
 * - warn (或 warning)
 * - 【type 与 storageType 互斥，即 storageType 和 type 只能有一个有值】
 * - 【在 storageType 和 type 都有值的情况下，以 storageType 为准】
 * - 【warn 与 warning 互斥，即 warn 和 warning 只能有一个有值】
 * - 【在 warn 和 warning 都有值时，以 warn 为准】
 */
export declare type StorageRequiredAttributes =
    | (HasStorageType & HasWarn)
    | (HasType & HasWarn)
    | (HasStorageType & HasWarning)
    | (HasType & HasWarning);

/* ========== */

// 通信配置对象

/**
 * @description 通信配置对象中
 * - channel - 通信频道名称
 * - warn - 是否发出警告
 */
export declare interface CommunicateRequiredAttributes<T extends string> {
    channel: T; // 通信频道名称
    warn: boolean; // 是否发出警告
}

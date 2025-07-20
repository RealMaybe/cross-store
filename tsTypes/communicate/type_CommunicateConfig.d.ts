import type { CommunicateRequiredAttributes } from "@tsTypes";

/* ========== */

/**
 * @description Communicate 配置字符串
 */
type CommunicateConfigString = string;

/**
 * @description Communicate 配置对象
 */
type CommunicateConfigObject = CommunicateRequiredAttributes<CommunicateConfigString> & {
    type?: boolean,
};

/**
 * @description Communicate 配置对象
 * 
 */
export type CommunicateConfig = CommunicateConfigString | CommunicateConfigObject;
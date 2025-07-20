/* 一些必要的方法 */

import { __globalThis__ } from "../index";

/* ========== */

/**
 * @description 本地存储方法
 */
export const localStorage = __globalThis__.localStorage ?? {};

/**
 * @description 会话存储方法
 */
export const sessionStorage = __globalThis__.sessionStorage ?? {};

/**
 * @description 广播存储方法
 */
export const BroadcastChannel = __globalThis__.BroadcastChannel;
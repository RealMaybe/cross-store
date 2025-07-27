/* 用于检查指定类型的 Web 存储是否可用 */

import type { AvailableStorageType } from "@tsTypes";
import { isNull } from "@/utils";

/* ========== */

/**
 * 检查指定类型的 Web 存储是否可用。
 * @function storageAvailable
 * @param { AvailableStorageType } type 要检查的存储类型 ("localStorage" 或 "sessionStorage")。
 * @returns { boolean } 如果指定的存储类型可用，则返回true，否则返回false。
 */
export function storageAvailable(type: AvailableStorageType): boolean {
    let storage: Storage | null = null;

    // 检查浏览器是否支持指定的存储类型
    try {
        storage = window[type];
        const testKey = `__web__storage__test__${Date.now()}__`;

        // 尝试在存储中设置一个值，然后立即移除它
        storage.setItem(testKey, testKey);
        storage.removeItem(testKey);

        return true;
    } catch (event) {
        // 检查捕获的异常是否为 DOMException
        const isDOMException = event instanceof DOMException;

        // 检查错误码或名称是否表示配额超出错误
        let isQuotaExceededError = false;
        if (isDOMException) {
            isQuotaExceededError =
                event.code === 22 ||
                event.code === 1014 ||
                event.name === "QuotaExceededError" ||
                event.name === "NS_ERROR_DOM_QUOTA_REACHED";
        }

        // 检查存储中是否有数据
        const hasDataStored = !isNull(storage) && storage.length !== 0;

        // 返回最终结果：只有当所有条件都满足时才认为存储不可用
        return isDOMException && isQuotaExceededError && hasDataStored;
    }
}

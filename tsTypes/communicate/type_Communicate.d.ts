import type { CommunicateConfig } from "@tsTypes";
import type { CommunicateData } from "@tsTypes";

/**
 * @description 通信类
 */
export declare class Communicate {
    #channel: BroadcastChannel;

    /**
     * @description 构造函数
     * @param options 配置项
     */
    constructor(options: CommunicateConfig): void;

    /**
     * @description 发送消息的方法
     * @param 需要发送的数据
     */
    public send(data: any): void;

    /**
     * @description 接收消息的方法
     * @param callback 接收消息的回调函数
     */
    public receive(callback: (data: CommunicateData) => void): void;
};

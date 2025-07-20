export class Communicate {
    #config;
    #channel;

    /**
     * @constructor
     */
    constructor(options) {
        this.#config = options;
    };


    /* 监听方法 */

    /**
     * @description 用于发送消息
     * @method send
     * @param { any } data 需要发送的消息，可以是任意可克隆的类型
     * @returns { void }
     */
    send(data: any): void {
        m_listener(this.#config, {
            message: data
        })
    };

    /**
     * @description 用于发送消息，此方法会检测传入的消息内容是否有效
     * @method post
     * @param { any } data 需要发送的消息，可以是任意可克隆的类型
     * @returns { void }
     */
    post(data: any): void {
        m_listener(this.#config, {
            message: ValidateValue(this.#config, data)
        })
    };

    /**
     * @description 用于接收消息
     * @method listen
     * @param { (message: any) => void } callback 回调函数
     * - 回调函数中可以使用 this
     * - this 指向实例化出来的 StorageProvider 对象
     * @returns { (close?: boolean) => void }
     */
    listen(callback: (message: any) => void): (close?: boolean) => void {
        return m_listener(this.#config, {
            callback
        }, this)
    };
}


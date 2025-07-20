/**
 * @description 通信数据类型
 * @attribute time 发送数据的时间
 * @attribute sendPage 发送页面
 * @attribute targetPage 目标页面
 * @attribute value 数据
 */
export type CommunicateData = {
    time: number, // 发送数据的时间
    sendPage: string, // 发送页面
    targetPage: string, // 目标页面
    value: any, // 数据
}
import http, { AxiosRequestConfig } from "@/utils/request";

/**
 * 获取经营数据
 * @param params 请求参数
 * @param config 配置项
 * @returns 请求实例
 */
export const getList = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/mangerdata/saleokratedata",
    method: "POST",
    params,
    ...config,
  });
};

/**
 * 个人看板
 * @param params 请求参数
 * @param config 配置项
 * @returns 请求实例
 */
export const getPersonInfo = (params: object, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/personboard/selectpersonboarddate",
    method: "POST",
    data: params,
    ...config,
  });
};

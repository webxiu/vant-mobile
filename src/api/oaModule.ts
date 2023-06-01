import http, { AxiosRequestConfig } from "@/utils/request";

/**
 * 接口请求说明:
 * @param params 请求参数
 * @param config 配置项
 * @returns 请求实例
 */

/** 获取经营数据 */
export const getList = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/mangerdata/saleokratedata",
    method: "POST",
    params,
    ...config,
  });
};

/** 客户投诉 */
export const getCustomerComplaint = (
  params: object,
  config?: AxiosRequestConfig
) => {
  return http.request({
    url: "/app/qywx/workspace/complaint/query",
    method: "POST",
    data: params,
    ...config,
  });
};
/** 客户投诉 - 详情 */
export const getCustomerComplaintDetail = (
  params: object,
  config?: AxiosRequestConfig
) => {
  return http.request({
    url: "/app/qywx/workspace/complaint/querydetail",
    method: "GET",
    params: params,
    ...config,
  });
};

/** 个人看板 */
export const getPersonInfo = (params: object, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/personboard/selectpersonboarddate",
    method: "POST",
    data: params,
    ...config,
  });
};

import http, { AxiosRequestConfig } from "@/utils/request";

/**
<<<<<<< .mine * 获取请假单列表
 * @param params 请求参数
 * @param config 配置项
 * @returns 请求实例
 */
export const getLeaveList = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/oa/hr/askforleave/selectPage",
    // url: "/app/qywx/workspace/askforleave/select",
    method: "POST",
    data: params,
    ...config,
  });
};

/**
 * 获取请假单详情
 * @param params 请求参数
 * @param config 配置项
 * @returns 请求实例
 */
export const getLeaveDetail = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/oa/hr/askforleave/SelectByEdits",
    method: "POST",
    params,
    ...config,
  });
};

/**
 * 新增请假单
 * @param params 请求参数
 * @param config 配置项
 * @returns 请求实例
 */
export const addLeaveList = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/askforleave/calctime",
    method: "POST",
    data: params,
    ...config,
  });
};

/**
 * 获取经营数据
======= * 接口请求说明:
>>>>>>> .theirs * @param params 请求参数
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

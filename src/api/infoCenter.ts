import http, { AxiosRequestConfig } from "@/utils/request";

/**
 * 信息中心 - 我创建的任务
 * @param params 请求参数
 * @param config 配置项
 */
export const getCreateTask = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/mycreatetask/querymytasks",
    method: "POST",
    data: params,
    ...config,
  });
};

/**
 * 信息中心 - 我负责的任务
 * @param params 请求参数
 * @param config 配置项
 */
export const getMyTask = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/mypersontask/querymytasks",
    method: "POST",
    data: params,
    ...config,
  });
};
/**
 * 信息中心 - 业务审批1
 * @param params 请求参数
 * @param config 配置项
 */
export const getAuditTask1 = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/approval/q1",
    method: "POST",
    data: params,
    ...config,
  });
};
/**
 * 信息中心 - 业务审批2
 * @param params 请求参数
 * @param config 配置项
 */
export const getAuditTask2 = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/approval/q2",
    method: "POST",
    data: params,
    ...config,
  });
};
/**
 * 信息中心 - 业务审批2
 * @param params 请求参数
 * @param config 配置项
 */
export const getAuditTask3 = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/approval/q3",
    method: "POST",
    data: params,
    ...config,
  });
};

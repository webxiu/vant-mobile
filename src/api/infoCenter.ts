import http, { AxiosRequestConfig } from "@/utils/request";

/**
 * 信息中心-接口请求说明:
 * @param params 请求参数
 * @param config 配置项
 * @returns 请求实例
 */

/** 我创建的任务 */
export const getCreateTask = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/mycreatetask/querymytasks",
    method: "POST",
    data: params,
    ...config,
  });
};
/** 我负责的任务 */
export const getMyTask = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/mypersontask/querymytasks",
    method: "POST",
    data: params,
    ...config,
  });
};

/** ============================== 金蝶业务审批 ============================== */

/** 金蝶业务审批(我的待办) */
export const getKingdeeAuditTask = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/jindieapproval/getrunningflowdatasbytheapproval",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 金蝶业务审批(我的已办) */
export const getKingdeeAuditedTask = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/jindieapproval/getrunningflowdatasbyprocessed",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 金蝶业务审批(我发起的) */
export const getKingdeeLaunchTask = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "app/qywx/workspace/jindieapproval/getlanuchflowdatasbyprocessed",
    method: "POST",
    data: params,
    ...config,
  });
};

/** ============================== 业务审批 ============================== */

/** 业务审批(我的待办) */
export const getAuditTask1 = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/approval/q1",
    method: "POST",
    data: params,
    ...config,
  });
};
/** 业务审批(我的已办) */
export const getAuditTask2 = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/approval/q2",
    method: "POST",
    data: params,
    ...config,
  });
};
/** 业务审批(我发起的) */
export const getAuditTask3 = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/approval/q3",
    method: "POST",
    data: params,
    ...config,
  });
};

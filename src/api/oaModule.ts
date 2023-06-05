/**
 * 接口请求说明:
 * @param params 请求参数
 * @param config 配置项
 * @returns 请求实例
 */

import http, { AxiosRequestConfig } from "@/utils/request";

/** 获取请假单列表 */
export const getLeaveList = (params, config?: AxiosRequestConfig) => {
  return http.request({
    // url: "/oa/hr/askforleave/selectPage",
    url: "/app/qywx/workspace/askforleave/select",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 获取请假单详情 */
export const getLeaveDetail = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/askforleave/selectdetail",
    method: "GET",
    params,
    ...config,
  });
};

/** 获取加班单列表 */
export const getOvertimeList = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/overtimeapply/select",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 获取加班单详情 */
export const getOverTimeDetail = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/overtimeapply/selectdetail",
    method: "GET",
    params,
    ...config,
  });
};

/** 新增请假单 */
export const addLeaveList = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/askforleave/insert",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 新增加班单 */
export const addOverTimeList = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/overtimeapply/insert",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 计算请假时长 */
export const calcTimes = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/askforleave/calctime",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 计算加班时长 */
export const calcJBTimes = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/overtimeapply/CalcTime",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 获取工资已发放年份 */
export const getPayYears = (data, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/payslip/getmepayslipyear",
    method: "POST",
    data,
    ...config,
  });
};

/** 获取工资条数据列表 */
export const getPayRollList = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/payslip/getmepaysliplistdata",
    method: "POST",
    params,
    ...config,
  });
};

/** 获取工资条数据详情 */
export const getPayRollDetail = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/payslip/getpayslipstatusbyid",
    method: "POST",
    params,
    ...config,
  });
};

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

/** 考勤单 */
export const getAttendanceSheet = (
  params: object,
  config?: AxiosRequestConfig
) => {
  return http.request({
    url: "/app/qywx/workspace/attendancedetail/getattendancebyyear",
    method: "POST",
    params: params,
    ...config,
  });
};

/** 考勤单 - 获取年份 */
export const getAttendanceSheetYear = (
  params: object,
  config?: AxiosRequestConfig
) => {
  return http.request({
    url: "/app/qywx/workspace/attendancedetail/getmeattendancedetailyear",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 考勤单 - 考勤详情 */
export const getAttendanceDetail = (
  params: object,
  config?: AxiosRequestConfig
) => {
  return http.request({
    url: "/app/qywx/workspace/attendancedetail/getmeattendancedetailbyid",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 考勤单 - 签名预提交 */
export const getPreviewSignature = (
  params: object,
  config?: AxiosRequestConfig
) => {
  return http.request({
    url: "/app/qywx/workspace/attendancedetail/getattendancedetailstatusbyid",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 考勤单 - 提交签名 */
export const submitSignature = (
  params: object,
  config?: AxiosRequestConfig
) => {
  return http.request({
    url: "/app/qywx/workspace/attendancedetail/saveattendancedetailsignature",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 考勤单 - 保存异常信息 */
export const saveAttendanceException = (
  params: object,
  config?: AxiosRequestConfig
) => {
  return http.request({
    url: "/app/qywx/workspace/attendancedetail/saveattendancedetailexception",
    method: "POST",
    data: params,
    ...config,
  });
};

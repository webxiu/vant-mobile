/**
 * 接口请求说明:
 * @param params 请求参数
 * @param config 配置项
 * @returns 请求实例
 */

import http, { AxiosRequestConfig } from "@/utils/request";

/** 获取个人请假单列表 */
export const getLeaveList = (params, config?: AxiosRequestConfig) => {
  return http.request({
    // url: "/oa/hr/askforleave/selectPage",
    url: "/app/qywx/workspace/askforleave/select",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 获取请假单抄送列表 */
export const getSendLeaveList = (params = {}, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/askforleave/getaskforleaveforme",
    method: "POST",
    ...config,
  });
};

/** 获取加班单抄送列表 */
export const getSendOverTimeList = (
  params = {},
  config?: AxiosRequestConfig
) => {
  return http.request({
    url: "/app/qywx/workspace/overtimeapply/getovertimeforme",
    method: "POST",
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

/** 编辑请假单 */
export const editLeaveList = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/askforleave/update",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 删除请假单 */
export const deleteLeaveList = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/askforleave/delete",
    method: "POST",
    params,
    ...config,
  });
};

/** 提交请假单 */
export const submitLeaveList = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/askforleave/submit",
    method: "POST",
    params,
    ...config,
  });
};

/** 撤销请假单 */
export const revokeLeaveList = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/askforleave/revoke",
    method: "POST",
    params,
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

/** 编辑加班单 */
export const editOverTimeList = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/overtimeapply/update",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 删除加班单 */
export const deleteOverTimeList = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/overtimeapply/delete",
    method: "POST",
    params,
    ...config,
  });
};

/** 提交加班单 */
export const submitOverTimeList = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/overtimeapply/submit",
    method: "POST",
    params,
    ...config,
  });
};

/** 撤销加班单 */
export const revokeOverTimeList = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/overtimeapply/revoke",
    method: "POST",
    params,
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
    url: "/app/qywx/workspace/payslip/getpayslipdata",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 获取工资条模版数据 */
export const getTemplatePayRoll = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/payslip/getpaysliptemplatedata",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 提交工资单反馈 */
export const submitPayRollFeed = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/payslip/savepayslipexception",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 保存工资单签名信息 */
export const savePayRollsign = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/payslip/savepayslipsignature",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 查询工资单签名信息 */
export const queryPayRollsign = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/payslip/getsignaturebyid",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 查询内购商品列表 */
export const queryShoppingList = (params = {}, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/welfare/getcommoditieslistdata",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 获取区域列表 */
export const getAreaList = (params = {}, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/welfare/getarealist",
    method: "GET",
    params,
    ...config,
  });
};

/** 新增收货地址 */
export const addAddressList = (params = {}, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/qywx/useraddress/insertuseraddress",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 编辑收货地址 */
export const editAddressList = (params = {}, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/qywx/useraddress/updateuseraddressbyid",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 删除收货地址 */
export const deleteAddressList = (params = {}, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/qywx/useraddress/deleteuseraddressbyid",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 查询收货地址列表 */
export const queryAddressList = (params = {}, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/qywx/useraddress/getuseraddresslist",
    method: "GET",
    params,
    ...config,
  });
};

/** 查询收货地址详情 */
export const getAddressListDetailInfo = (
  params = {},
  config?: AxiosRequestConfig
) => {
  return http.request({
    url: "/app/qywx/workspace/qywx/useraddress/selectuseraddressbyid",
    method: "GET",
    params,
    ...config,
  });
};

/** 查询订单列表 */
export const queryOrderList = (params = {}, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/qywx/insideorder/selectallinsideorderbyuserid",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 查询订单详情 */
export const queryOrderDetailInfo = (
  params = {},
  config?: AxiosRequestConfig
) => {
  return http.request({
    url: "/app/qywx/workspace/qywx/insideorder/selectinsideorderbyid",
    method: "GET",
    params,
    ...config,
  });
};

/** 取消订单 */
export const cancelOrderListItem = (
  params = {},
  config?: AxiosRequestConfig
) => {
  return http.request({
    url: "/app/qywx/workspace/qywx/insideorder/deleteinsideordebyid",
    method: "POST",
    params,
    ...config,
  });
};

/** 获取经营数据 */
export const getSaleokratedata = (params, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/mangerdata/saleokratedata",
    method: "GET",
    params,
    ...config,
  });
};

/** 供应商投诉 */
export const getSupplierComplaints = (
  params: object,
  config?: AxiosRequestConfig
) => {
  return http.request({
    url: "/app/qywx/workspace/complaintmanagement/selectAll",
    method: "POST",
    data: params,
    ...config,
  });
};

/** 供应商投诉 - 详情 */
export const getSupplierComplaintsDetail = (
  params: object,
  config?: AxiosRequestConfig
) => {
  return http.request({
    url: "app/qywx/workspace/complaintmanagement/selectdetail",
    method: "GET",
    params: params,
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

/** 考勤单 - 获取签名图片 */
export const getSignature = (params: object, config?: AxiosRequestConfig) => {
  return http.request({
    url: "/app/qywx/workspace/attendancedetail/getsignaturebyid",
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
/** 考勤单 - 获取人员openID */
export const saveAttendanceUserOpenID = (
  params: object,
  config?: AxiosRequestConfig
) => {
  return http.request({
    url: "/app/qywx/workspace/attendancedetail/getwenyuanbyusercode",
    method: "POST",
    data: params,
    ...config,
  });
};

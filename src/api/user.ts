import http, { request } from "@/utils/request";

export type LoginType = { userNo: string; password: string };
export function login(data: LoginType) {
  return http.request({ url: "/verifyuser", method: "POST", data });
}

/** 注销登录 */
export function logout() {
  return http.request({ url: "/logout", method: "GET" });
}

/** 查询用户信息 */
export function queryUserInfo(params) {
  return http.request({ url: "/getowneruserinfo", method: "GET", params });
}

/** 使用Code自动登录(接口未出) */
export function autoLogin(params) {
  // return http.request({ url: "/app/qywx/api/applogin", method: "GET", params });
  return http.request({
    url: "/app/qywx/api/mobileAppLogin",
    method: "GET",
    params,
  });
}

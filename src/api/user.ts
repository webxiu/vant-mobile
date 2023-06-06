import http, { request } from "@/utils/request";

export type LoginType = { userNo: string; password: string };
export function login(data: LoginType) {
  return http.request({ method: "post", url: "/verifyuser", data });
}

export function logout() {
  return http.request({ url: "/logout", method: "get" });
}

/** 查询用户信息 */
export function queryUserInfo(params) {
  return http.request({ method: "GET", url: "/getowneruserinfo", params });
}

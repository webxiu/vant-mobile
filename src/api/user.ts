import http, { request } from "@/utils/request";

import axios from "axios";

export type LoginType = { userNo: string; password: string };
export function login(data: LoginType) {
  return http.request({ method: "post", url: "/verifyuser", data });
}

/** 注销登录 */
export function logout() {
  return http.request({ url: "/logout", method: "get" });
}

/** 查询用户信息 */
export function queryUserInfo(params) {
  return http.request({ method: "GET", url: "/getowneruserinfo", params });
}

/** 获取code */
export const getWxCode = (params: object) => {
  // 域名地址不同, 单独设置
  // return axios({
  //   baseURL: "https://open.weixin.qq.com",
  //   url: "/connect/oauth2/authorize",
  //   method: "GET",
  //   params: {
  //     appid: "wwa8df5d5593162528",
  //     redirect_uri: encodeURIComponent(
  //       "https://nginx.deogra.com:7443/login?orgId=532dad6942c17caf4b00bbd5fc498e79"
  //     ),
  //     response_type: "code",
  //     scope: "snsapi_base",
  //     state: "STATE#wechat_redirect",
  //   },
  // });
  return axios.get(
    "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wwa8df5d5593162528&redirect_uri=https%3A%2F%2Fnginx.deogra.com%3A7443%2Flogin&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
  );
};
/** 自动登录 */
export function autoLogin(params) {
  return http.request({ method: "GET", url: "/app/qywx/api/applogin", params });
}

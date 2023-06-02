import Cookies from "js-cookie";

const COOKIE_KEY = "Token";
const LOGIN_INFO = "LoginInfo";

/**
 * 获取Cookie
 */
export const getCookie = () => {
  return Cookies.get(COOKIE_KEY) || "";
};

/**
 * 设置Cookie
 * @param cookie cookie
 */
export const setCookie = (cookie: string) => {
  Cookies.set(COOKIE_KEY, cookie);
};

/**
 * 移除Cookie
 */
export const removeCookie = () => {
  Cookies.remove(COOKIE_KEY);
};

export interface LoginInfoType {
  userNo: string;
  password: string;
}

/**
 * 获取用户信息
 */
export const getLoginInfo = (): LoginInfoType => {
  return JSON.parse(localStorage.getItem(LOGIN_INFO) || "{}");
};

/**
 * 设置用户信息
 * @param userInfo 用户信息
 */
export const setLoginInfo = (userInfo: LoginInfoType) => {
  localStorage.setItem(LOGIN_INFO, JSON.stringify(userInfo));
};

/**
 * 移除用户信息
 */
export const removeLoginInfo = () => {
  localStorage.removeItem(LOGIN_INFO);
};

import Cookies from "js-cookie";

const CookieKey = "Token";

/**
 * 获取Cookie
 */
export const getCookie = () => {
  return Cookies.get(CookieKey) || "";
};

/**
 * 设置Cookie
 * @param cookie cookie
 */
export const setCookie = (cookie: string) => {
  Cookies.set(CookieKey, cookie);
};

/**
 * 移除Cookie
 */
export const removeCookie = () => {
  Cookies.remove(CookieKey);
};

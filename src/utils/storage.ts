/**
 * 设置Cookie
 * @param name Cookie名称
 * @param value Cookie值
 * @param days 过期时间(天)
 */
export const setCookie = (name: string, value: string, days: number = 5) => {
  days = days || 30;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie =
    name + "=" + escape(value) + ";path:/;expires=" + date.toGMTString();
};

/**
 * 获取Cookie
 * @param name Cookie名称
 */
export const getCookie = (name: string) => {
  let arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
};

/**
 * 删除Cookie
 * @param name Cookie名称
 */
export const delCookie = (name: string) => {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = getCookie(name);
  if (cval != null)
    document.cookie =
      name + "=" + cval + ";path:/;expires=" + exp.toGMTString();
};

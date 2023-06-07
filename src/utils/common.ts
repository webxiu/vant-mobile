const title = "德龙工作台";

/**
 * 设置网页标题
 * @param pageTitle 标题名称
 * @returns 标题名称
 */
export const getPageTitle = (pageTitle) => {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
};

/**
 * 函数防抖
 * @param fn 处理函数
 * @param wait 等待时间
 */
export const debounce = (fn: Function, wait = 300) => {
  let timeout: number;
  return () => {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  };
};

/**
 * 函数节流
 * @param fn 处理函数
 * @param delay 间隔时间
 */
export const throttle = (fn: Function, delay = 300) => {
  let prev = Date.now();
  return (...args: any) => {
    const now = Date.now();
    if (now - prev >= delay) {
      fn.call(null, ...args);
      prev = Date.now();
    }
  };
};

/**
 * 获取当前年月日
 * @param d 几天前的天数
 * @returns
 */
export const getDateTime = (yyyy?: number) => {
  const year = yyyy || new Date().getFullYear();
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const mm = `${month}`.padStart(2, "0");
  const dd = `${day}`.padStart(2, "0");

  return {
    year: year,
    month: mm,
    day: dd,
    dateText: `${year}年${mm}月${dd}日`, // 当前年月
    dateTime: `${year}-${mm}-${dd}`, // 当前日期
    lastDate: `${year}-12-31`, // 当前年的最后一天日期
  };
};

/**
 * 判断是否在移动端应用中打开
 */
export const isApp = () => {
  const device = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return device;
};

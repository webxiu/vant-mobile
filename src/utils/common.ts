const title = "德龙工作台";

/**
 * 设置网页标题
 * @param pageTitle 标题名称
 * @returns 标题名称
 */
export const getPageTitle = (pageTitle) => {
  if (pageTitle) {
    return `${pageTitle}`;
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
 * 获取信息中心列表tag相关颜色
 * @param priority 优先级中文汉字
 * @returns 对应的颜色字符串
 */
export const getColorByPriority = (priority: string): string => {
  let pri: string;
  switch (priority) {
    case "最高":
      pri = "red";
      break;
    case "较高":
      pri = "orange";
      break;
    case "普通":
      pri = "#722ed1";
      break;
    case "较低":
      pri = "#946A2C";
      break;
    case "最低":
      pri = "green";
      break;

    default:
      pri = "#fff";
      break;
  }

  return pri;
};

/**
 * 获取当前年月日
 * @param yyyy 年份
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
 * 判断是否在移动端应用或者企业微信中打开
 */
export const isApp = () => {
  const device = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|wxwork)/i
  );
  return device;
};

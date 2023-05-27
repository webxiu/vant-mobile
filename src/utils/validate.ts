/**
 * 验证网址
 * @param arg 网址
 */
export function isExternal(arg) {
  return /^(https?:|mailto:|tel:)/.test(arg);
}
/**
 * 验证手机号码
 * @param arg 手机号码
 */
export function validPhone(arg) {
  let pass = false;
  const val = String(arg).trim();
  if (
    !/^(0|86|17951)?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9])[0-9]{8}$/i.test(
      val
    )
  ) {
    pass = false;
  } else {
    pass = true;
  }
  return pass;
}

/**
 * 验证网址是否有效
 * @param arg url地址
 */
export function validURL(arg) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(arg);
}

/**
 * 验证邮箱账号
 * @param arg 邮箱账号
 */
export function validEmail(arg) {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(arg);
}

/**
 * 验证身份证号码
 * @param arg 身份证号码
 */
export function validID(arg) {
  const reg =
    /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
  return reg.test(arg);
}

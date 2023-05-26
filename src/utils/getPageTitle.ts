const title = "德龙工作台";

/**
 * 设置网页标题
 * @param pageTitle 标题名称
 * @returns 标题名称
 */
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}

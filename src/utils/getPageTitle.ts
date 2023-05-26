const title = '德龙工作台'

export default function getPageTitle( pageTitle ) {
  if ( pageTitle ) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

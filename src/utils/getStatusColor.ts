import { TagType } from "vant";

/**
 * 列表及详情状态tag颜色
 * @param statusText 状态文本
 * @returns
 */
export const colorSelector = (statusText: string): TagType => {
  let statusColor: TagType;
  switch (statusText) {
    case "待提交":
      statusColor = "primary";
      break;
    case "审核中":
      statusColor = "warning";
      break;
    case "已审核":
      statusColor = "success";
      break;
    case "重新审核":
      statusColor = "danger";
      break;
    default:
      statusColor = "default";
      break;
  }
  return statusColor;
};

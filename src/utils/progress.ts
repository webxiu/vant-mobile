import "nprogress/nprogress.css";

import NProgress from "nprogress";

NProgress.configure({
  // 动画方式
  easing: "ease",
  // 递增进度条的速度
  speed: 500,
  // 关闭显示加载ico
  showSpinner: false,
  // 自动递增间隔
  trickleSpeed: 200,
  // 初始化时的最小百分比
  minimum: 0.3,
  // 设置为false，关闭自动递增行为
  trickle: true,
});

export default NProgress;

import { LoginInfoType, useUserStoreWithOut } from "@/store/modules/user";
import { getCookie, removeCookie } from "@/utils/storage";
import { getPageTitle, isApp } from "@/utils/common";
import { showFailToast, showToast } from "vant";

import NProgress from "@/utils/progress";
import { autoLogin } from "@/api/user";
import router from "@/router";

const hostObj = {
  localhost: "app.deogra.com",
  "127.0.0.1": "app.deogra.com",
  "test.deogra.com": "app.deogra.com",
  "nginx.deogra.com": "app.deogra.com",
};

const userStore = useUserStoreWithOut();
const params = new URLSearchParams(location.search);
const whiteList = ["/login", "/register", "/404", "/401"];
export const orgDomain = hostObj[location.hostname] || location.hostname;

router.beforeEach(async (to, _, next) => {
  if (!isApp()) {
    showToast({
      message: "请使用手机端打开！",
      icon: "warning",
      duration: 0,
      overlay: true,
    });
  }
  NProgress.start();
  document.title = getPageTitle(to.meta?.title);
  const hasToken: string = getCookie();

  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      next();
    }
  } else {
    // ====== 企业微信自动登录 start ======
    const state = params.get("state");
    const code = params.get("code");
    if (code) {
      autoLogin({ orgDomain, state, code })
        .then(() => {
          next({ path: "/" });
          userStore.setUserInfo();
        })
        .catch((err) => {
          next();
          showFailToast(err || "登录失败...");
        });
      return;
    }
    // ====== 企业微信自动登录 end ======

    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
      removeCookie();
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

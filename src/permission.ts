import { getPageTitle, isApp } from "@/utils/common";

import NProgress from "@/utils/progress";
import { getCookie } from "@/utils/storage";
import router from "@/router";
import { showToast } from "vant";

const whiteList = ["/login", "/register", "/404", "/401"];
router.beforeEach(async (to, _, next) => {
  // if (!isApp()) {
  //   showToast({
  //     message: "请使用手机端打开！",
  //     icon: "warning",
  //     duration: 0,
  //     overlay: true,
  //   });
  // }
  NProgress.start();
  document.title = getPageTitle(to.meta?.title);
  const hasToken: string = getCookie();

  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      next();
      // const hasRoles = userStore.roles && userStore.roles.length > 0
      // if ( hasRoles ) {
      //   next()
      // } else {
      //     next( '/login' )
      //     NProgress.done()
      // }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

import NProgress from "@/utils/progress";
import { getCookie } from "@/utils/storage";
import { getPageTitle } from "@/utils/common";
import router from "@/router";

const whiteList = ["/login", "/register", "/404", "/401"];
router.beforeEach(async (to, _, next) => {
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

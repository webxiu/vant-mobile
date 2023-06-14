import {
  RouteRecordRaw,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

// 公共全局路由
const commonRoute: RouteConfigRawType[] = [
  { path: "/", name: "Home", redirect: "/workspace" },
  {
    path: "/workspace",
    name: "Workspace",
    component: () => import("@/views/home/index.vue"),
    meta: { title: "德龙工作台" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: { title: "用户登录" },
  },
  {
    path: "/401",
    name: "Error401",
    component: () => import("@/views/notFound/401.vue"),
    meta: { title: "无访问权限" },
  },
  {
    path: "/:pathMatch(.*)",
    name: "Error404",
    component: () => import("@/views/notFound/404.vue"),
    meta: { title: "页面找不到" },
  },
];
// 动态加载
const modules: Record<string, any> = import.meta.glob(
  ["./modules/**/*.ts", "!./modules/**/remaining.ts"],
  { eager: true }
);

// 路由模块列表
const routeList: RouteConfigRawType[] = [];
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeList.push(...modList);
});

// 动态路由
export const asyncRoutes = [];
export const routeCateList = [...routeList].sort(
  (a: any, b: any) => a.meta?.order - b.meta?.order
);

export const routes = [
  ...commonRoute,
  ...routeList,
  ...asyncRoutes,
] as RouteRecordRaw[];

const router = createRouter({
  history: createWebHistory("./"),
  routes: routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 重置路由
export function resetRouter() {
  const WHITE_NAME_LIST = ["Login"];
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export default router;

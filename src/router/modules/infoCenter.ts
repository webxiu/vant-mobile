import { RouteRecordRaw } from "vue-router";

export default {
  path: "/infoCenter",
  redirect: "/infoCenter/createTask",
  meta: {
    title: "信息中心",
    icon: "friends-o",
    order: 2,
  },
  children: [
    {
      path: "/createTask",
      name: "CreateTask",
      component: () => import("@/views/home/infoCenter/createTask/index.vue"),
      meta: {
        title: "我创建的任务",
        icon: "location-o",
      },
    },
    {
      path: "/myTask",
      name: "MyTask",
      component: () => import("@/views/home/infoCenter/myTask/index.vue"),
      meta: {
        title: "我负责的任务",
        icon: "friends-o",
        affix: true,
      },
    },
    {
      path: "/auditTask",
      name: "AuditTask",
      component: () => import("@/views/home/infoCenter/auditTask/index.vue"),
      meta: {
        title: "业务审批",
        icon: "friends-o",
        affix: true,
      },
    },
  ],
} as RouteRecordRaw;

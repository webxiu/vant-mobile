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
        icon: "certificate",
        showNav: true,
      },
    },
    {
      path: "/myTask",
      name: "MyTask",
      component: () => import("@/views/home/infoCenter/myTask/index.vue"),
      meta: {
        title: "我负责的任务",
        icon: "manager-o",
        showNav: true,
      },
    },
    {
      path: "/auditTask",
      name: "AuditTask",
      component: () => import("@/views/home/infoCenter/auditTask/index.vue"),
      meta: {
        title: "业务审批",
        icon: "cluster-o",
        showNav: true,
      },
    },
  ],
} as RouteConfigRawType;

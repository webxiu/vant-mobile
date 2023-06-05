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
      },
    },
    {
      path: "/myTask",
      name: "MyTask",
      component: () => import("@/views/home/infoCenter/myTask/index.vue"),
      meta: {
        title: "我负责的任务",
        icon: "manager-o",
      },
    },
    {
      path: "/kingdeeAuditTask",
      name: "KingdeeAuditTask",
      component: () => import("@/views/home/infoCenter/kingdeeAudit/index.vue"),
      meta: {
        title: "金蝶业务审批",
        icon: "exchange",
      },
    },
    {
      path: "/auditTask",
      name: "AuditTask",
      component: () => import("@/views/home/infoCenter/auditTask/index.vue"),
      meta: {
        title: "业务审批",
        icon: "cluster-o",
      },
    },
  ],
} as RouteConfigRawType;

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
      path: "/kingdeeAudit",
      name: "KingdeeAudit",
      component: () => import("@/views/home/infoCenter/kingdeeAudit/index.vue"),
      meta: { title: "金蝶业务审批", icon: "exchange" },
    },
    {
      path: "/kingdeeAudit/audit/detail",
      name: "KingdeeAuditDetail",
      props: true,
      component: () =>
        import("@/views/home/infoCenter/kingdeeAudit/audit/detail.vue"),
      meta: { title: "金蝶业务审批 - 待办详情", hidden: true, showNav: true },
    },
    {
      path: "/kingdeeAudit/audited/detail",
      name: "KingdeeAuditedDetail",
      props: true,
      component: () =>
        import("@/views/home/infoCenter/kingdeeAudit/audited/detail.vue"),
      meta: { title: "金蝶业务审批 - 已办详情", hidden: true, showNav: true },
    },
    {
      path: "/kingdeeAudit/initiate/detail",
      name: "KingdeeAuditInitiateDetail",
      props: true,
      component: () =>
        import("@/views/home/infoCenter/kingdeeAudit/initiate/detail.vue"),
      meta: { title: "金蝶业务审批 - 发起详情", hidden: true, showNav: true },
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
    {
      path: "/auditTask/detail",
      name: "auditTaskDetail",
      component: () => import("@/views/home/infoCenter/auditTask/detail.vue"),
      meta: {
        title: "业务审批详情",
        icon: "balance-list-o",
        hidden: true,
        showNav: true,
      },
    },
  ],
} as RouteConfigRawType;

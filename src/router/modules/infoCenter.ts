import Layout from "@/layout/index.vue";

export default {
  path: "/infoCenter",
  redirect: "/infoCenter/createTask",
  component: Layout,
  meta: {
    title: "信息中心",
    icon: "friends-o",
    order: 2,
  },
  children: [
    {
      path: "createTask",
      name: "CreateTask",
      component: () => import("@/views/home/infoCenter/createTask/index.vue"),
      meta: {
        title: "我创建的任务",
        icon: "duixiangchuangjian",
        pathType: "list",
      },
    },
    {
      path: "myTask",
      name: "MyTask",
      component: () => import("@/views/home/infoCenter/myTask/index.vue"),
      meta: {
        title: "我负责的任务",
        icon: "shebeiweixiuweihu",
        pathType: "list",
      },
    },
    {
      path: "kingdeeAudit",
      name: "KingdeeAudit",
      component: () => import("@/views/home/infoCenter/kingdeeAudit/index.vue"),
      meta: { title: "金蝶业务审批", icon: "shenpi", pathType: "list" },
    },
    {
      path: "kingdeeAudit/auditDetail",
      name: "KingdeeAuditDetail",
      props: true,
      component: () =>
        import("@/views/home/infoCenter/kingdeeAudit/detail.vue"),
      meta: {
        title: "我的待办详情",
        hidden: true,
        showNav: true,
        pathType: "detail",
      },
    },
    {
      path: "kingdeeAudit/auditedDetail",
      name: "KingdeeAuditedDetail",
      props: true,
      component: () =>
        import("@/views/home/infoCenter/kingdeeAudit/detail.vue"),
      meta: {
        title: "我的已办详情",
        hidden: true,
        showNav: true,
        pathType: "detail",
      },
    },
    {
      path: "kingdeeAudit/initiateDetail",
      name: "KingdeeAuditInitiateDetail",
      props: true,
      component: () =>
        import("@/views/home/infoCenter/kingdeeAudit/detail.vue"),
      meta: {
        title: "我的发起详情",
        hidden: true,
        showNav: true,
        pathType: "detail",
      },
    },
    {
      path: "auditTask",
      name: "AuditTask",
      component: () => import("@/views/home/infoCenter/auditTask/index.vue"),
      meta: {
        title: "业务审批",
        icon: "icon_app_examine_",
        pathType: "list",
      },
    },
    {
      path: "auditTask/detail",
      name: "auditTaskDetail",
      component: () => import("@/views/home/infoCenter/auditTask/detail.vue"),
      meta: {
        title: "业务审批详情",
        icon: "balance-list-o",
        hidden: true,
        pathType: "detail",
        showNav: true,
      },
    },
  ],
} as RouteConfigRawType;

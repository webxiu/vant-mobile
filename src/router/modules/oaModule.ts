import { RouteRecordRaw } from "vue-router";

export default {
  path: "/oa",
  redirect: "/oa/overTime",
  meta: {
    title: "OA模块",
    icon: "friends-o",
    order: 1,
  },
  children: [
    {
      path: "/overTime",
      name: "OverTime",
      component: () => import("@/views/home/oaModule/overTime/index.vue"),
      meta: {
        title: "加班单",
        icon: "friends-o",
        noCache: true,
        affix: true,
      },
    },
    {
      path: "/requireRegister",
      name: "RequireRegister",
      component: () =>
        import("@/views/home/oaModule/requireRegister/index.vue"),
      meta: {
        title: "需求登记",
        icon: "friends-o",
        noCache: true,
        affix: true,
      },
    },
    {
      path: "/suggestionBox",
      name: "SuggestionBox",
      component: () => import("@/views/home/oaModule/suggestionBox/index.vue"),
      meta: {
        title: "建议箱",
        icon: "friends-o",
        noCache: true,
        affix: true,
      },
    },
    {
      path: "/payroll",
      name: "Payroll",
      component: () => import("@/views/home/oaModule/payroll/index.vue"),
      meta: {
        title: "工资单",
        icon: "friends-o",
        noCache: true,
        affix: true,
      },
    },
    {
      path: "/internalPurchaseBenefits",
      name: "InternalPurchaseBenefits",
      component: () =>
        import("@/views/home/oaModule/internalPurchaseBenefits/index.vue"),
      meta: {
        title: "内购福利",
        icon: "friends-o",
        noCache: true,
        affix: true,
      },
    },
    {
      path: "/businessData",
      name: "BusinessData",
      component: () => import("@/views/home/oaModule/businessData/index.vue"),
      meta: {
        title: "经营数据",
        icon: "friends-o",
        noCache: true,
        affix: true,
      },
    },
    {
      path: "/supplierComplaints",
      name: "SupplierComplaints",
      component: () =>
        import("@/views/home/oaModule/supplierComplaints/index.vue"),
      meta: {
        title: "供应商投诉",
        icon: "friends-o",
        noCache: true,
        affix: true,
      },
    },
    {
      path: "/customerComplaints",
      name: "CustomerComplaints",
      component: () =>
        import("@/views/home/oaModule/customerComplaints/index.vue"),
      meta: {
        title: "客户投诉",
        icon: "friends-o",
        noCache: true,
        affix: true,
      },
    },
    {
      path: "/personalSignage",
      name: "PersonalSignage",
      component: () =>
        import("@/views/home/oaModule/personalSignage/index.vue"),
      meta: {
        title: "个人看板",
        icon: "friends-o",
        noCache: true,
        affix: true,
      },
    },
    {
      path: "/attendanceSheet",
      name: "AttendanceSheet",
      component: () =>
        import("@/views/home/oaModule/attendanceSheet/index.vue"),
      meta: {
        title: "考勤单",
        icon: "friends-o",
        noCache: true,
        affix: true,
      },
    },
  ],
} as RouteRecordRaw;

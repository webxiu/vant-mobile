import { RouteConfigsTable } from "~/types/global.d";
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
        title: "请假单",
        icon: "description",
        noCache: true,
        affix: true,
      },
    },
    {
      path: "/overTime/add",
      name: "OverTimeAdd",
      component: () => import("@/views/home/oaModule/overTime/add.vue"),
      meta: {
        title: "添加申请",
        icon: "description",
        hidden: true,
      },
    },
    {
      path: "/overTime/:id",
      name: "OverTimeDetail",
      props: true,
      component: () => import("@/views/home/oaModule/overTime/detail.vue"),
      meta: {
        title: "详情页面",
        icon: "description",
        hidden: true,
      },
    },
    {
      path: "/requireRegister",
      name: "RequireRegister",
      component: () =>
        import("@/views/home/oaModule/requireRegister/index.vue"),
      meta: {
        title: "需求登记",
        icon: "records",
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
        icon: "envelop-o",
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
        icon: "balance-list-o",
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
        icon: "goods-collect-o",
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
        icon: "chart-trending-o",
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
        icon: "envelop-o",
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
        icon: "envelop-o",
        noCache: true,
        affix: true,
      },
    },
    {
      path: "/customerComplaints/:id",
      name: "CustomerComplaintsDetail",
      component: () =>
        import("@/views/home/oaModule/customerComplaints/detail.vue"),
      meta: {
        title: "详情页面",
        icon: "description",
        hidden: true,
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
        icon: "label-o",
        noCache: true,
        affix: true,
      },
    },
  ],
} as RouteConfigsTable;

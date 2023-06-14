export default {
  path: "/oa",
  redirect: "/oa/leaveApply",
  meta: {
    title: "OA模块",
    icon: "friends-o",
    order: 1,
  },
  children: [
    {
      path: "/leaveApply",
      name: "LeaveApply",
      component: () => import("@/views/home/oaModule/leaveApply/index.vue"),
      meta: {
        title: "请假单列表",
        icon: "leasingcloud_qingjiashenhe",
      },
    },
    {
      path: "/leaveApply/add",
      props: true,
      name: "LeaveApplyAdd",
      component: () => import("@/views/home/oaModule/leaveApply/add.vue"),
      meta: {
        title: "请假申请",
        icon: "description",
        hidden: true,
        showNav: true,
      },
    },
    {
      path: "/leaveApply/:id",
      name: "LeaveApplyDetail",
      props: true,
      component: () => import("@/views/home/oaModule/leaveApply/detail.vue"),
      meta: {
        title: "请假单详情",
        icon: "description",
        hidden: true,
        showNav: true,
      },
    },
    {
      path: "/overTime/:id",
      name: "OverTimeDetail",
      props: true,
      component: () => import("@/views/home/oaModule/overTime/detail.vue"),
      meta: {
        title: "加班单详情",
        icon: "description",
        hidden: true,
        showNav: true,
      },
    },
    {
      path: "/overTime",
      name: "OverTime",
      component: () => import("@/views/home/oaModule/overTime/index.vue"),
      meta: {
        title: "加班单列表",
        icon: "jiaban",
        hidden: true,
      },
    },
    {
      path: "/overTime/add",
      name: "OverTimeAdd",
      component: () => import("@/views/home/oaModule/overTime/add.vue"),
      meta: {
        title: "加班申请",
        icon: "description",
        hidden: true,
        showNav: true,
      },
    },
    {
      path: "/requireRegister",
      name: "RequireRegister",
      component: () =>
        import("@/views/home/oaModule/requireRegister/index.vue"),
      meta: {
        title: "需求登记",
        icon: "xuqiu",
        disable: true,
      },
    },
    {
      path: "/suggestionBox",
      name: "SuggestionBox",
      component: () => import("@/views/home/oaModule/suggestionBox/index.vue"),
      meta: {
        title: "建议箱",
        icon: "tousujianyi",
        disable: true,
      },
    },
    {
      path: "/payroll",
      name: "Payroll",
      component: () => import("@/views/home/oaModule/payroll/index.vue"),
      meta: {
        title: "工资单列表",
        icon: "gongzitiaoicon1x",
      },
    },
    {
      path: "/payroll/:id",
      name: "payrollDetail",
      component: () => import("@/views/home/oaModule/payroll/detail.vue"),
      meta: {
        title: "工资单详情",
        icon: "balance-list-o",
        hidden: true,
        showNav: true,
      },
    },
    {
      path: "/internalPurchaseBenefits",
      name: "InternalPurchaseBenefits",
      component: () =>
        import("@/views/home/oaModule/internalPurchaseBenefits/index.vue"),
      meta: {
        title: "商品列表",
        icon: "wodefuli",
        showNav: true,
      },
    },
    {
      path: "/internalPurchaseBenefits/user",
      name: "InternalPurchaseBenefitsUser",
      component: () =>
        import("@/views/home/oaModule/internalPurchaseBenefits/userCenter.vue"),
      meta: {
        title: "个人中心",
        icon: "goods-collect-o",
        hidden: true,
      },
    },
    {
      path: "/internalPurchaseBenefits/addressList",
      name: "InternalPurchaseBenefitsAddressList",
      component: () =>
        import(
          "@/views/home/oaModule/internalPurchaseBenefits/addressList.vue"
        ),
      meta: {
        title: "收货地址列表",
        icon: "goods-collect-o",
        hidden: true,
      },
    },
    {
      path: "/internalPurchaseBenefits/addressAdd",
      name: "InternalPurchaseBenefitsAddressListAdd",
      component: () =>
        import("@/views/home/oaModule/internalPurchaseBenefits/addressAdd.vue"),
      meta: {
        title: "新增收货地址",
        icon: "goods-collect-o",
        hidden: true,
      },
    },
    {
      path: "/internalPurchaseBenefits/orderList",
      name: "InternalPurchaseBenefitsOrderList",
      component: () =>
        import("@/views/home/oaModule/internalPurchaseBenefits/orderList.vue"),
      meta: {
        title: "订单列表",
        icon: "goods-collect-o",
        hidden: true,
      },
    },
    {
      path: "/internalPurchaseBenefits/orderDetail",
      name: "InternalPurchaseBenefitsOrderDetail",
      component: () =>
        import(
          "@/views/home/oaModule/internalPurchaseBenefits/orderDetail.vue"
        ),
      meta: {
        title: "订单详情",
        icon: "goods-collect-o",
        hidden: true,
      },
    },
    {
      path: "/internalPurchaseBenefits/:id",
      name: "InternalPurchaseBenefitsDetail",
      props: true,
      component: () =>
        import("@/views/home/oaModule/internalPurchaseBenefits/shopDetail.vue"),
      meta: {
        title: "商品详情",
        icon: "description",
        hidden: true,
        showNav: true,
      },
    },
    {
      path: "/businessData",
      name: "BusinessData",
      component: () => import("@/views/home/oaModule/businessData/index.vue"),
      meta: {
        title: "经营数据",
        icon: "shuju",
      },
    },
    {
      path: "/supplierComplaints",
      name: "SupplierComplaints",
      component: () =>
        import("@/views/home/oaModule/supplierComplaints/index.vue"),
      meta: {
        title: "供应商投诉",
        icon: "4",
        showNav: true,
      },
    },
    {
      path: "/supplierComplaints/:id",
      name: "SupplierComplaintsDetail",
      component: () =>
        import("@/views/home/oaModule/supplierComplaints/detail.vue"),
      meta: {
        title: "投诉详情",
        icon: "description",
        hidden: true,
        showNav: true,
      },
    },
    {
      path: "/customerComplaints",
      name: "CustomerComplaints",
      component: () =>
        import("@/views/home/oaModule/customerComplaints/index.vue"),
      meta: {
        title: "客户投诉",
        icon: "xinfangtousu",
      },
    },
    {
      path: "/customerComplaints/:id",
      name: "CustomerComplaintsDetail",
      component: () =>
        import("@/views/home/oaModule/customerComplaints/detail.vue"),
      meta: {
        title: "投诉详情",
        icon: "description",
        hidden: true,
        showNav: true,
      },
    },
    {
      path: "/personalSignage",
      name: "PersonalSignage",
      component: () =>
        import("@/views/home/oaModule/personalSignage/index.vue"),
      meta: {
        title: "个人看板",
        icon: "fenxikanban",
      },
    },
    {
      path: "/attendanceSheet",
      name: "AttendanceSheet",
      component: () =>
        import("@/views/home/oaModule/attendanceSheet/index.vue"),
      meta: {
        title: "考勤单",
        icon: "renlikaoqin",
      },
    },
    {
      path: "/attendanceSheet/:id",
      name: "AttendanceSheetDetail",
      component: () =>
        import("@/views/home/oaModule/attendanceSheet/detail.vue"),
      meta: {
        title: "考勤明细",
        icon: "description",
        hidden: true,
      },
    },
  ],
} as RouteConfigRawType;

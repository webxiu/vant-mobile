<template>
  <div class="ui-h-100 flex-col">
    <template v-for="(item, index) in tabsPage">
      <component
        :detail-info="detailInfo"
        :userName="userName"
        :wxOpenIds="wxOpenIds"
        @refreshAction="refreshAction"
        @setBottomCurrent="setBottomCurrent"
        class="detail-page flex-1 ui-ovy-a"
        v-show="item.idx === activeSelected"
        :is="tabsPage[index].name"
      />
    </template>
    <van-tabbar
      v-model="activeSelected"
      :border="false"
      :fixed="false"
      v-if="calcTabbar"
    >
      <!-- 第一项为占位项 -->
      <!-- <van-tabbar-item style="display: none" /> -->
      <van-tabbar-item icon="label-o" v-show="calcSign"
        >工资详情</van-tabbar-item
      >
      <van-tabbar-item icon="edit" v-show="calcSign">签名</van-tabbar-item>
      <van-tabbar-item icon="smile-comment-o" v-show="calcFeedBack"
        >异常反馈</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

import {
  getPayRollDetail,
  getTemplatePayRoll,
  queryClerkInfo,
} from "@/api/oaModule";
import MyDetail from "./MyDetail.vue";
import MyFeedBack from "./MyFeedBack.vue";
import MySign from "./MySign.vue";
import { useAppStore } from "@/store/modules/app";
import { useUserStore } from "@/store/modules/user";
import { showNotify } from "vant";

interface DetailInfoType {
  holidayType: string;
  remark: string;
  createUserName: string;
  createdate: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  days: string;
  hours: string;
  userName: string;
  billNo: string;
  billState: number;
  statusValue: string;
}

const tabsPage = [
  { name: MyDetail, idx: 0 },
  { name: MySign, idx: 1 },
  { name: MyFeedBack, idx: 2 },
];

defineProps({ id: String });
const route = useRoute();
const appStore = useAppStore();
const userStore = useUserStore();

const detailInfo = ref<DetailInfoType>({
  userName: "",
  billNo: "",
  holidayType: "",
  remark: "",
  createUserName: "",
  createdate: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  days: "",
  hours: "",
  billState: 0,
  statusValue: "",
});
const activeSelected = ref(0);
const wxOpenIds = ref("");
const userName = ref("");

const calcTabbar = computed(() => {
  if (detailInfo.value.statusValue) {
    return !(
      // detailInfo.value.statusValue === "5" ||
      (detailInfo.value.statusValue === "6")
    );
  }
});

const calcSign = computed(() => {
  if (detailInfo.value.statusValue) {
    return (
      detailInfo.value.statusValue === "3" ||
      detailInfo.value.statusValue === "4" ||
      detailInfo.value.statusValue === "5"
    );
  }
});

const calcFeedBack = computed(() => {
  if (detailInfo.value.statusValue) {
    return detailInfo.value.statusValue === "3";
  }
});

const setBottomCurrent = (tabString) =>
  (activeSelected.value = Number(tabString));

const getDetailInfo = async () => {
  let templates = await fetchGzTemplate();
  if (templates.length) {
    const { gzmbb, payslipId, gzmbNo } = route.query;
    getPayRollDetail({ gzmbb, payslipId, gzmbNo }).then((res) => {
      if (res.data && res.data.length) {
        detailInfo.value = res.data[0];
      }
    });
  }
};

const fetchGzTemplate = async () => {
  let templateArr;
  await getTemplatePayRoll({
    isApp: true,
    templateNo: route.query.gzmbNo,
  }).then((res) => {
    if (res.data && res.data.length) {
      templateArr = res.data;
    }
  });

  return templateArr;
};

const refreshAction = () => {
  getDetailInfo();
};

// 获取文员信息
const fetchClerkInfo = () => {
  queryClerkInfo({ userCode: userStore.userInfo.userNo }).then((res) => {
    if (res.data?.length > 0) {
      wxOpenIds.value = res.data.map((item) => item.wxOpenid);
      userName.value = res.data[0].userName;
    }
    // else {
    //   showNotify({
    //     type: "danger",
    //     message: "当前部门未配置文员，请联系系统组！",
    //   });
    // }
  });
};

onMounted(() => {
  getDetailInfo();
  fetchClerkInfo();
  appStore.setNavTitle("工资单详情");
});
</script>

<style lang="scss" scoped></style>

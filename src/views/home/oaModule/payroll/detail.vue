<template>
  <div>
    <div class="detail-page" v-for="(item, index) in tabsPage">
      <component
        :detail-info="detailInfo"
        v-if="item.idx === activeSelected"
        :is="tabsPage[index].name"
      />
    </div>
    <van-tabbar
      @change="changeBottomBar"
      v-model="activeSelected"
      :border="false"
    >
      <!-- 第一项为占位项 -->
      <!-- <van-tabbar-item style="display: none" /> -->
      <van-tabbar-item icon="label-o">工资详情</van-tabbar-item>
      <van-tabbar-item icon="edit">签名</van-tabbar-item>
      <van-tabbar-item icon="smile-comment-o">异常反馈</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { getPayRollDetail, getTemplatePayRoll } from "@/api/oaModule";
import MyDetail from "./MyDetail.vue";
import MyFeedBack from "./MyFeedBack.vue";
import MySign from "./MySign.vue";

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
}

const tabsPage = [
  { name: MyDetail, idx: 0 },
  { name: MySign, idx: 1 },
  { name: MyFeedBack, idx: 2 },
];

defineProps({ id: String });
const route = useRoute();

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
});
const activeSelected = ref(0);

const changeBottomBar = (cur) => {
  console.log(cur, "cur");
};

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

onMounted(() => getDetailInfo());
</script>

<style lang="scss" scoped></style>

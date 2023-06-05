<template>
  <!-- <MyDetail :detail-info="detailInfo" /> -->
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
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getLeaveDetail, getPayRollDetail } from "@/api/oaModule";
import { useRoute } from "vue-router";
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

const props = defineProps({ id: String });
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

const getDetailInfo = () => {
  // console.log(route.params, "route");
  // getPayRollDetail({ gzmbb: "", payslipId: route.params.id }).then((res) => {
  //   // detailInfo.value = res.data;
  //   console.log(res, "res--pay-detail");
  // });
};

// 根据字典数字计算出对应的字符串
const calcStatus = (statusNum: number): string => {
  let statusStr;

  switch (statusNum) {
    case 0:
      statusStr = "待提交";
      break;
    case 1:
      statusStr = "审核中";
      break;
    case 2:
      statusStr = "已审核";
      break;
    case 3:
      statusStr = "重新审核";
      break;

    default:
      break;
  }

  return statusStr;
};

onMounted(() => getDetailInfo());
</script>

<style lang="scss" scoped>
// .detail-page {
//   padding: 60px 80px;
//   margin-bottom: 100px;

//   .des-item {
//     margin-bottom: 24px;
//     font-size: 28px;

//     .label {
//       text-align: right;
//     }
//     .value {
//       font-weight: 600;
//       color: black;
//     }
//   }
//   .user-title {
//     margin-bottom: 50px;
//     font-size: 30px;
//   }
// }
</style>

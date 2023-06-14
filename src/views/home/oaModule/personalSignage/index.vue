<template>
  <div class="home">
    <van-card
      :title="'加入德龙'"
      :desc="dateTime"
      :thumb="personInfo?.avatar"
    />
    <van-grid :column-num="3" :gutter="10" square>
      <van-grid-item :text="`待审批的任务：${personInfo?.approve || 0}条`" />
      <van-grid-item :text="`我负责的任务：${personInfo?.pending || 0}条`" />
      <van-grid-item :text="`我创建的任务：${personInfo?.creation || 0}条`" />
    </van-grid>
    <van-grid :column-num="2" :gutter="10" square>
      <van-grid-item :text="`本年请假天数：${personInfo?.askForLeave || 0}`" />
      <van-grid-item
        :text="`剩余调休时长：${personInfo?.compensatoryLeaveDuration || 0}h`"
      />
      <van-grid-item :text="`本年剩余年假：${personInfo?.annualLeave || 0}`" />
      <van-grid-item :text="`本年加班天数：${personInfo?.overTime || 0}`" />
      <van-grid-item :text="`打卡次数：4`" />
      <van-grid-item text="心怀诚爱，力奉精益" />
    </van-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { showToast } from "vant";
import { getPersonInfo } from "@/api/oaModule";
import { onMounted } from "vue";
import { computed } from "@vue/reactivity";

interface PersonInfoType {
  annualLeave: string; // 年假
  approve: string; // 待审批
  pending: string;
  overTime: string; // 本年加班
  askForLeave: string; // 请假
  avatar: string;
  joinTimeYear: string;
  joinTimeDays: string;
  creation: string; // 我创建的任务
  compensatoryLeaveDuration: string; // 剩余调休时长
}

const isLoading = ref<boolean>(false);
const personInfo = ref<PersonInfoType>();

onMounted(() => {
  getData();
});

const dateTime = computed(
  () =>
    `${personInfo.value?.joinTimeYear || 0}年(${
      personInfo.value?.joinTimeDays || 0
    }天)`
);

const getData = () => {
  isLoading.value = true;
  getPersonInfo({})
    .then((res) => {
      if (!res.data) throw "暂无数据";
      personInfo.value = res.data;
      isLoading.value = false;
    })
    .catch((err) => {
      showToast({ message: "数据获取失败", position: "top" });
    });
};
</script>
<style lang="scss" scoped>
:deep(.van-card__content) {
  justify-content: center;
}
</style>

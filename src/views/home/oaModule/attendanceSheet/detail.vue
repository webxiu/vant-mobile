<template>
  <div class="attendance-detail">
    <van-swipe
      ref="swipeRef"
      :loop="false"
      :immediate="false"
      :touchable="false"
      :show-indicators="false"
    >
      <van-swipe-item v-for="(_, idx) in tabs" :key="idx">
        <component :is="tabs[idx]" ref="childRef" />
      </van-swipe-item>
    </van-swipe>
    <van-tabbar
      v-model="active"
      inactive-color="#646566"
      active-color="#00f"
      @change="onChange"
    >
      <van-tabbar-item icon="label-o">考勤详情</van-tabbar-item>
      <van-tabbar-item icon="edit">签名</van-tabbar-item>
      <van-tabbar-item icon="smile-comment-o">异常反馈</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, VNodeRef } from "vue";
import Attendance from "./components/Attendance.vue";
import Signature from "./components/Signature.vue";
import Feedback from "./components/Feedback.vue";

const tabs = [Attendance, Signature, Feedback];
const swipeRef = ref<VNodeRef>("");
const active = ref<number>(0);

const onChange = (index: number) => {
  swipeRef.value?.swipeTo(index);
};
</script>

<style lang="scss" scoped>
:deep(.van-tabbar-item--active) {
  font-weight: 700;
}
</style>

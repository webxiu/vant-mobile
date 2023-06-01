<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useAppStore } from "@/store/modules/app";
import { useRouter } from "vue-router";
import MyApply from "./MyApply.vue";
import MySend from "./MySend.vue";

const appStore = useAppStore();

const selectedTab = ref(0);
const selectedMenuValue = ref("");

const tabs = [MyApply, MySend];
const router = useRouter();

const swipeRef = ref();
const filterOptions = [
  { text: "全部", value: "" },
  { text: "待提交", value: "0" },
  { text: "审核中", value: "1" },
  { text: "已审核", value: "2" },
  { text: "重新审核", value: "3" },
];

const onTabChange = (index: number) => {
  console.log(index, "index");
  selectedTab.value = index;
  swipeRef.value?.swipeTo(index);
};

const onSwipeChange = (index: number) => {
  selectedTab.value = index;
  swipeRef.value?.swipeTo(index);
};

const handleToAdd = () => {
  console.log(router.push, "router");
  router.push("/overTime/add");
};
</script>

<template>
  <div class="over-time">
    <!-- tab导航 -->
    <van-tabs
      v-model:active="selectedTab"
      title-active-color="#1989fa"
      swipeable
      sticky
      @change="onTabChange"
    >
      <van-tab :key="0" title="我申请的" badge="99" />
      <van-tab :key="1" title="抄送我的" />
    </van-tabs>

    <!-- 下拉菜单 -->
    <van-dropdown-menu>
      <van-dropdown-item v-model="selectedMenuValue" :options="filterOptions" />
    </van-dropdown-menu>

    <!-- 滑动区域 -->
    <van-swipe
      ref="swipeRef"
      @change="onSwipeChange"
      :loop="false"
      :show-indicators="false"
    >
      <van-swipe-item v-for="(_, index) in tabs" :key="index">
        <component :is="tabs[index]"></component>
      </van-swipe-item>
    </van-swipe>

    <!--新增加班单按钮-->
    <div class="add-action" @click="handleToAdd">
      <van-icon name="plus" size="22" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.van-tabs__wrap) {
  touch-action: manipulation;
}
:deep(.van-tabs__content) {
  width: 750px;
  height: 100%;
  background: #f60;
}
.add-action {
  width: 120px;
  border-radius: 50%;
  box-shadow: 2px 3px 6px grey;
  background-color: #5686ff;
  bottom: 30px;
  right: 70px;
  height: 120px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
</style>

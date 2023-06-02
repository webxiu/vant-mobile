<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useAppStore } from "@/store/modules/app";
import { useRouter } from "vue-router";
import PayList from "./PayList.vue";

const appStore = useAppStore();

const selectedTab = ref(0);
const selectedMenuValue = ref("");

const tabs = [PayList];
const router = useRouter();

const swipeRef = ref();
const filterOptions = [
  { text: "全部", value: "" },
  { text: "2023", value: 0 },
  // { text: "审核中", value: 1 },
  // { text: "已审核", value: 2 },
  // { text: "重新审核", value: 3 },
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

const dropMenuChange = (val) => {
  console.log(val, "select");
};
</script>

<template>
  <div class="over-time">
    <van-sticky>
      <!-- 下拉菜单 -->
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="selectedMenuValue"
          :options="filterOptions"
          @change="dropMenuChange"
        />
      </van-dropdown-menu>
    </van-sticky>

    <!-- 滑动区域 -->
    <van-swipe
      ref="swipeRef"
      @change="onSwipeChange"
      :loop="false"
      :show-indicators="false"
    >
      <van-swipe-item v-for="(_, index) in tabs" :key="index">
        <component :is="tabs[index]" :dropKey="selectedMenuValue"></component>
      </van-swipe-item>
    </van-swipe>
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

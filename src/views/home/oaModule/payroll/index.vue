<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import PayList from "./PayList.vue";
import { getPayYears } from "@/api/oaModule";

const selectedTab = ref(0);
const selectedMenuValue = ref("");

const tabs = [PayList];
const router = useRouter();

const swipeRef = ref();
const filterOptions = ref([
  { text: "全部", value: "" },
  { text: "2023", value: "2023" },
  { text: "2022", value: "2022" },
  { text: "2021", value: "2021" },
]);

const onSwipeChange = (index: number) => {
  selectedTab.value = index;
  swipeRef.value?.swipeTo(index);
};


const dropMenuChange = (val) => {
  console.log(val, "select");
};

// 获取已发工资年份列表
const getPayYearsList = () => {
  getPayYears({}).then((res) => {
    res.data.map((item) => {
      filterOptions.value.push({ text: item.year, value: item.year });
    });
  });
};

onMounted(() => {
  getPayYearsList();
});
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

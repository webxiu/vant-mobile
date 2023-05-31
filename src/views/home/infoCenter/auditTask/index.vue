<script lang="ts" setup>
import { showToast } from "vant";
import { reactive, ref, watch, onMounted } from "vue";
import { AuditTaskType, TabActiveColor } from "../useInfoHook";
import { getAuditTask1, getAuditTask2, getAuditTask3 } from "@/api/infoCenter";
import MyAudit from "./MyAudit.vue";
import MyAudited from "./MyAudited.vue";
import MyInitiate from "./MyInitiate.vue";

const auditList = [
  { title: "我的待办", name: "audit1" },
  { title: "我的已办", name: "audit2" },
  { title: "我的发起", name: "audit3" },
];

const API: { [key: string]: any } = {
  audit1: getAuditTask1,
  audit2: getAuditTask2,
  audit3: getAuditTask3,
};

const auditModel: AuditTaskType = reactive({
  pageNo: 1,
  limit: 50,
  searchKey: "",
});
const data = ref();
const swipeRef = ref();
const apiKey = ref("audit1");
const active = ref<number>(0);
const searchValue = ref<string>("");
const isLoading = ref<boolean>(false);
const tabs = [MyAudit, MyAudited, MyInitiate];

onMounted(() => getData());

watch(active, (newVal) => {
  const taskState = auditList[newVal].name;
  apiKey.value = taskState;
  getData();
});

const getData = () => {
  isLoading.value = true;
  API[apiKey.value](auditModel)
    .then((res) => {
      data.value = res;
      isLoading.value = false;
      showToast({ message: "数据获取成功", position: "top" });
    })
    .catch((err) => {
      console.log("err", err);
      showToast({ message: "数据获取失败", position: "top" });
    });
};

const onTabChange = (index: number) => {
  swipeRef.value?.swipeTo(index);
};
const onSwipeChange = (index: number) => {
  active.value = index;
};
const onSearchKey = (value: string) => {
  auditModel.searchKey = value;
  getData();
};
const onRefresh = () => getData();
</script>

<template>
  <van-tabs
    v-model:active="active"
    class="ui-h-100 info-center"
    swipeable
    sticky
    :color="TabActiveColor"
    :title-active-color="TabActiveColor"
    @change="onTabChange"
  >
    <van-tab
      v-for="(item, idx) in auditList"
      :title="item.title"
      :key="idx"
      :badge="idx === 0 && idx === active ? 99 : ''"
    />
  </van-tabs>
  <van-search
    v-model="searchValue"
    :active="active"
    shape="round"
    @search="onSearchKey"
    placeholder="请输入搜索关键词"
  ></van-search>
  <van-swipe
    ref="swipeRef"
    :loop="false"
    :immediate="false"
    :show-indicators="false"
    @change="onSwipeChange"
  >
    <van-swipe-item v-for="(_, idx) in tabs" :key="idx">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <component :is="tabs[idx]" :data="data" />
      </van-pull-refresh>
    </van-swipe-item>
  </van-swipe>
</template>

<style lang="scss" scoped>
@import url("../../index.scss");
:deep(.van-badge) {
  background: var(--tab-active-color);
}
</style>

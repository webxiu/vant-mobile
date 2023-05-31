<script lang="ts" setup>
import { reactive, ref } from "vue";
import { AuditTaskType } from "../useInfoHook";
import MyAudit from "./MyAudit.vue";
import MyAudited from "./MyAudited.vue";
import MyInitiate from "./MyInitiate.vue";
import MyStop from "./MyStop.vue";
import { useSearchHook } from "../useInfoHook";
import { getMyTask } from "@/api/infoCenter";

const auditList = [
  { title: "待处理", name: 2 },
  { title: "已处理", name: 3 },
  { title: "已暂停", name: 1 },
  { title: "已终止", name: 4 },
];

const active = ref(0);
const auditModel: AuditTaskType = reactive({
  page: 1,
  limit: 50,
  searchFrom: 3,
  taskState: 2,
});

const { data, isLoading, getData } = useSearchHook(getMyTask, auditModel);
const tabs = [MyAudit, MyAudited, MyInitiate, MyStop];

const onTabChange = (index: number) => {
  active.value = index;
  const taskState = auditList[index].name;
  auditModel.taskState = taskState;
};
const onRefresh = () => {
  getData();
};
</script>

<template>
  <van-tabs
    v-model:active="active"
    class="ui-h-100 info-center"
    swipeable
    @change="onTabChange"
  >
    <van-tab v-for="(item, idx) in auditList" :title="item.title" :key="idx">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <component :is="tabs[idx]" :data="data" />
      </van-pull-refresh>
    </van-tab>
  </van-tabs>
</template>

<style lang="scss" scoped>
@import url("../../index.scss");
</style>

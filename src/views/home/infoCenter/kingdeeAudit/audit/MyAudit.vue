<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import TaskList, { TaskItemType } from "../components/TaskList.vue";

const resultList = ref();
const router = useRouter();

const onLookInfo = (item: TaskItemType) => {
  console.log("item", item);
  router.push(
    `/kingdeeAudit/audit/detail?billNo=${item.billNo}&fbillNumber=${item.fbillNumber}&billType=${item.formId}&deployKey=${item.deployKey}`
  );
};

const initData = (data) => {
  resultList.value = data;
};
defineExpose({ initData });
</script>

<template>
  <TaskList :dataList="resultList?.data" @onLookInfo="onLookInfo" />
</template>

<style lang="scss" scoped></style>

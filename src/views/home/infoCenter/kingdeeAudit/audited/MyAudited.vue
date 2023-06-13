<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import TaskList, { TaskItemType } from "../components/TaskList.vue";

const resultList = ref();
const router = useRouter();

const onLookInfo = (item: TaskItemType) => {
  router.push(`/kingdeeAudit/audited/detail?billno=${item.billNo}&fbillNumber=${item.fbillNumber}&billType=${item.billType}&deployKey=${item.deployKey}测试采购订单审批&from=home&tabindex=1
  `);
};

const initData = (data) => {
  resultList.value = data;
};
defineExpose({ initData });
</script>

<template>
  <TaskList
    v-if="resultList?.data.length > 0"
    :dataList="resultList?.data"
    @onLookInfo="onLookInfo"
  />
  <van-empty v-else description="暂无数据" />
</template>

<style lang="scss" scoped></style>

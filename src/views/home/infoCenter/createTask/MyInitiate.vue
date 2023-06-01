<script lang="ts" setup>
import { ref } from "vue";
const resultList = ref();
const initData = (data) => {
  resultList.value = data;
  console.log("=已暂停initData:", data);
};
defineExpose({ initData });
</script>

<template>
  <div>===已暂停</div>
  <pre>
    <code>
      {{ JSON.stringify(resultList, null, 2) }}
    </code>
  </pre>
</template>

<style lang="scss" scoped></style>

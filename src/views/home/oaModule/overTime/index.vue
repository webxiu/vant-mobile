<script lang="ts" setup>
import { reactive } from "vue";
import { useAppStore } from "@/store/modules/app";

const appStore = useAppStore();
</script>

<template>
  <div class="overTime">
    加班单 - overTime
    <div class="content">
      <van-button type="primary" @click="appStore.setCount(5)">{{
        appStore.count
      }}</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  text-align: center;
}
</style>

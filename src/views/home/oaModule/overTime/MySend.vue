<template>
  <div class="my-send">
    <div class="list-content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <!-- 无数据时页面 -->
        <van-empty description="暂无数据" />
      </van-pull-refresh>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

const refreshing = ref(false);

const onRefresh = () => {
  setTimeout(() => {
    refreshing.value = false;
  }, 1000);
};

onMounted(() => {
  // fetch list
});
</script>

<style scoped lang="scss"></style>

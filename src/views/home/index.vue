<script lang="ts" setup>
import { routeCateList } from "@/router";
</script>

<template>
  <div class="workspace">
    <template v-for="item in routeCateList">
      <div class="cate-title" v-if="item.meta">{{ item.meta.title }}</div>
      <van-grid :column-num="3">
        <template v-for="cell in item.children">
          <van-grid-item v-if="cell.meta && !cell.meta?.hidden" :icon="cell.meta.icon" :text="cell.meta.title"
            :to="cell.path" />
        </template>
      </van-grid>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.workspace {
  width: 750px;

  .cate-title {
    padding: 60px 30px 20px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: 700;
    font-size: 16px;
    line-height: 16px;
  }
}
</style>

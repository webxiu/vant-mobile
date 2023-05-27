<script lang="ts" setup>
import { routeCateList } from "@/router";
import { getList } from "@/api/oaModule";

// 请求示例
const getData = () => {
  getList(
    { year: 2023, month: 5, time: "2023-05-26", starttime: "2023-01-01" },
    { headers: { "Content-Encoding": "utf-8" } }
  )
    .then((res) => {
      console.log("res", res);
    })
    .catch((err) => {
      console.log("err", err);
    });
};
getData();
</script>

<template>
  <div class="workspace">
    <template v-for="item in routeCateList">
      <div class="cate-title" v-if="item.meta">{{ item.meta.title }}</div>
      <van-grid :column-num="3">
        <template v-for="cell in item.children">
          <van-grid-item
            v-if="cell.meta"
            :icon="cell.meta.icon"
            :text="cell.meta.title"
            :to="cell.path"
          />
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

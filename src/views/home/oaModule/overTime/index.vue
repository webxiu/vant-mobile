<script lang="ts" setup>
import { reactive } from "vue";
const data = reactive([
  {
    oaLiat: [{ title: "加班的", icon: "star-o", url: "/" }],
  },
]);
</script>

<template>
  <div class="home">
    加班单

    <van-button type="primary">oaOvertime</van-button>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 750px;
  height: 750px;
  background: #ccc;
}
</style>

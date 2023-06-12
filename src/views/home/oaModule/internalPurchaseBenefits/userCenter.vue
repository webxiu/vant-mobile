<template>
  <div>
    <div class="page-header" ref="pageheader">
      <!-- <van-nav-bar title="个人中心">
        <template #left>
          <span>{{ userInfo.userName }}</span>
        </template>
      </van-nav-bar> -->
    </div>
    <div class="van-tabs__content">
      <van-cell-group>
        <van-cell
          title="我的收货地址"
          is-link
          to="/internalPurchaseBenefits/addressList"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/modules/app";
import { onMounted } from "vue";
const userInfo = { userName: "谢健" };

onMounted(() => {
  useAppStore().setNavTitle("个人中心");
});
</script>

<style scoped lang="scss"></style>

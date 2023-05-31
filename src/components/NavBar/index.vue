<template>
  <van-nav-bar
    title="标题"
    left-text="返回"
    right-text="退出"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
    v-if="showNav"
  />
</template>

<script lang="ts" setup>
import { showToast } from "vant";
import { unref, ref, watch, toRaw } from "vue";
import routers from "@/router";
import { useRouter, useRoute } from "vue-router";
import { removeCookie } from "@/utils/storage";
import { NavBarList } from "@/config/common";

const route = useRoute();
const router = useRouter();
const showNav = ref<boolean>(false);

const onClickLeft = () => {
  router.go(-1);
};
const onClickRight = () => {
  removeCookie();
  showToast({ message: "退出成功", type: "success", position: "top" });
  routers.push("/login");
};

watch(route, (_, newVal) => {
  showNav.value = NavBarList.includes(unref(toRaw(newVal).path));
});
</script>

<style lang="scss" scoped></style>

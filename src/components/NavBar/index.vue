<template>
  <van-nav-bar
    title="标题"
    left-text="返回"
    right-text="退出"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
</template>

<script lang="ts" setup>
import { showToast } from "vant";
// import { onMounted, computed } from 'vue'
import routers, { routeCateList } from "@/router";
import { useRouter } from "vue-router";
import { removeCookie } from "@/utils/storage";

console.log("routeCateList", routeCateList);
const router = useRouter();
const onClickLeft = () => {
  router.go(-1);
};
const onClickRight = () => {
  removeCookie();
  showToast({ message: "退出成功", type: "success", position: "top" });
  routers.push("/login");
};

// const emit = defineEmits( ['change', 'delete'] )
// onMounted( () => {} )
// const count = computed( () => {} )
</script>

<style lang="scss" scoped></style>

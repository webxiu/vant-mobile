<template>
  <van-nav-bar
    title="标题"
    left-text="返回"
    right-text="按钮"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
</template>

<script lang="ts" setup>
import { showToast } from "vant";
// import { onMounted, computed } from 'vue'
import { routeCateList } from "@/router";
import { useRouter } from "vue-router";

console.log("routeCateList", routeCateList);
const router = useRouter();
const onClickLeft = () => {
  router.go(-1);
};
const onClickRight = () => showToast("按钮");

// const emit = defineEmits( ['change', 'delete'] )
// onMounted( () => {} )
// const count = computed( () => {} )
</script>

<style lang="scss" scoped></style>

<template>
  <div
    ref="ballRef"
    :style="ballStyle"
    class="my-icon"
    @touchstart="onTouchstart"
    @touchmove="onTouchmove"
    @touchend="onTouchend"
    @click="handleClickIconBack"
  >
    <MyIcon
      v-if="route.meta.pathType"
      :iconClass="`${
        route.meta.pathType === 'list' ? 'a-homeliving' : 'liebiaofanhui'
      }`"
      class-name="iconClass"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getSuspendPosition, setSuspendPosition } from "@/utils/storage";
import MyIcon from "@/components/MyIcon/index.vue";

interface SuspendPositionType {
  left: string;
  top: string;
  transition: string;
}

const ballRef = ref<HTMLElement>();
const ballStyle = ref<SuspendPositionType>({
  top: "500px",
  left: "10px",
  transition: "none",
});

const route = useRoute();
const router = useRouter();
const distance = 10; // 悬浮按钮边距
const isMove = ref<boolean>(false); // 是否移动按钮

onMounted(() => {
  const { top = "500px", left = `${distance}px` } = getSuspendPosition();
  ballStyle.value = { top, left, transition: "none" };
});

// 按压
const onTouchstart = (e: TouchEvent) => {
  isMove.value = false;
};

// 移动
const onTouchmove = (e: TouchEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isMove.value = true;
  if (!ballRef.value) return;
  const { clientX, clientY } = e.changedTouches[0];
  const oW = ballRef.value.offsetWidth;
  const { top, left } = limitMoveArea(clientX, clientY);
  const mTop = clientY < oW / 2 ? 0 : top - oW / 2;
  const mLeft = clientX < oW / 2 ? 0 : left - oW / 2;

  ballStyle.value = {
    top: `${mTop}px`,
    left: `${mLeft}px`,
    transition: "none",
  };
};

// 抬起
const onTouchend = (e: TouchEvent) => {
  if (!ballRef.value || !isMove.value) return;
  const width = document.documentElement.clientWidth;
  const { clientX, clientY } = e.changedTouches[0];
  const oW = ballRef.value.offsetWidth;
  const moveRightPos = width - oW - distance;
  const newLeft = clientX > width / 2 ? moveRightPos : distance;
  const { top, left } = limitMoveArea(newLeft, clientY);
  const nTop = top <= 0 ? 0 : top - oW / 2;
  const nLeft = left <= 0 ? 0 : left;

  ballStyle.value = {
    top: `${nTop}px`,
    left: `${nLeft}px`,
    transition: "all 0.5s",
  };
  setSuspendPosition({ top: `${nTop}px`, left: `${nLeft}px` });
};

const limitMoveArea = (left: number, top: number) => {
  if (!ballRef.value) return { top, left };
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  const oW = ballRef.value.offsetWidth;
  const offset = oW / 2;
  if (top < 0) top = 0;
  if (left < 0) left = 0;
  if (top + offset > height) top = height - offset;
  if (left + offset > width) left = width - offset;
  return { top, left };
};

// 路由跳转
const handleClickIconBack = () => {
  if (route.meta.pathType === "list") {
    router.push("/workspace");
  } else if (route.meta.pathType === "detail") {
    router.back();
  }
};
</script>

<style scoped lang="scss">
.my-icon {
  width: 90px;
  height: 90px;
  right: 69px;
  bottom: 350px;
  position: fixed;
  z-index: 1000;
  .iconClass {
    width: 90px;
    height: 90px;
  }
}
</style>

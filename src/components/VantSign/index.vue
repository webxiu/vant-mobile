<template>
  <div class="my-sign flex-1 flex-col" v-if="!showEsign">
    <van-nav-bar title="请在下面灰色区域內签名" />
    <van-signature class="flex-1 ui-h-100 flex-col" @submit="handleImg">
    </van-signature>
  </div>
  <div class="sign-img flex-1 flex-col" v-else>
    <van-nav-bar title="签名预览" />
    <van-image :src="resultImgSrc" alt="图片加载失败" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const resultImgArr = ref<string[]>([]);

const props = defineProps({
  handleImg: Function,
  resultImgSrcArr: { type: Array, default: ["", ""] },
}) as any;

watch(props, (newVal) => {
  resultImgArr.value = newVal.resultImgSrcArr;
});

// 传了数组并且有值不为空
const showEsign = computed(
  () =>
    props.resultImgSrcArr.length && props.resultImgSrcArr.some((item) => item)
);

// 处理后端返回的base64字符串含逗号和不含逗号的情况
const resultImgSrc = computed(() => {
  if (
    props.resultImgSrcArr &&
    props.resultImgSrcArr.length &&
    props.resultImgSrcArr[0].endsWith(",")
  ) {
    return props.resultImgSrcArr[0] + props.resultImgSrcArr[1];
  }
  return props.resultImgSrcArr.toString();
});
</script>

<style scoped lang="scss">
.my-sign {
  background-color: #fff;

  :deep(.van-signature__footer) {
    justify-content: space-around;
  }
  :deep(.van-signature__footer .van-button) {
    border-radius: 30px;
    width: 290px;
  }

  :deep(.van-signature__content) {
    flex: 1;
  }

  .signbtns {
    margin-top: 6px;
  }
}

.sign-img {
  :deep(.van-image) {
    flex: 1;
    box-shadow: 0px 0px 6px 0px #aaa;
    margin: var(--van-signature-padding);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    overflow: hidden;
    img {
      width: auto;
      height: max-content;
    }
  }
}
</style>

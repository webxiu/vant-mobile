<template>
  <div class="my-sign flex-col" v-if="showEsign">
    <van-nav-bar title="请在下面灰色区域內签名" />
    <van-signature class="flex-1 ui-h-100 flex-col" @submit="handleImg">
      <template #footer>aaa</template>
    </van-signature>
  </div>
  <div class="sign-img flex-col" v-else>
    <van-nav-bar title="签名预览" />
    <van-image :src="resultImgSrc" alt="图片加载失败" />
  </div>
</template>

<script setup lang="ts">
defineProps(["handleImg", "resultImgSrc", "showEsign"]);
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
  }

  height: calc(100vh - 220px);
  display: flex;
  overflow: hidden;
  img {
    object-fit: fill;
    margin: auto;
  }
}
</style>

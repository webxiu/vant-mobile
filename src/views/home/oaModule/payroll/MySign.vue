<template>
  <div class="my-sign" v-if="showEsign">
    <van-nav-bar title="请在下面虚线范围內签名" />
    <Esign @handleImg="handleImg" ref="childRef" />
    <div class="signbtns">
      <van-row>
        <van-col span="12" align="center" style="padding: 10px">
          <van-button
            icon="delete-o"
            type="primary"
            v-on:click="handleReset"
            block
            round
            color="gray"
            plain
            size="small"
          >
            清除签名
          </van-button>
        </van-col>

        <van-col span="12" align="center" style="padding: 10px">
          <van-button
            icon="success"
            type="primary"
            v-on:click="handleSubmit"
            block
            round
            plain
            size="small"
          >
            提交签名
          </van-button>
        </van-col>
      </van-row>
    </div>
  </div>
  <div v-else class="sign-img">
    <img :src="resultImgSrc" alt="图片加载失败" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick, ref } from "vue";
import Esign from "@/components/Esign/index.vue";

const childRef = ref(null);
const showEsign = ref(true);
const resultImgSrc = ref(""); // 回显图片地址

// 由子组件触发传过来的是base64图片字符串
const handleImg = (imgStr) => {
  console.log("imgStr,", imgStr);
};

const handleReset = () => (childRef.value as any).handleReset();

const handleSubmit = () => (childRef.value as any).handleGenerate();

onMounted(() => {});

nextTick(() => (childRef.value as any)?.init());
</script>

<style scoped lang="scss">
.my-sign {
  background-color: #fff;

  .signbtns {
    margin-top: 6px;
  }
}

.sign-img {
  background-color: pink;

  img {
    width: 100vw;
  }
}
</style>

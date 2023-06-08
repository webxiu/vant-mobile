<template>
  <div class="sign-wrap">
    <van-nav-bar :title="imgSrc ? '已完成签名' : '请在下面虚线范围內签名'" />
    <div class="sign-content">
      <div v-if="!imgSrc">
        <vue-esign
          ref="signRef"
          :width="600"
          :height="800"
          :isCrop="isCrop"
          :lineWidth="lineWidth"
          :lineColor="lineColor"
          :bgColor.sync="bgColor"
        />
      </div>
      <div v-else class="sign-img">
        <img :src="imgSrc" alt="图片加载失败" />
      </div>
    </div>
    <div class="button" v-if="!imgSrc">
      <slot name="button" v-if="showDefaultBtn" />
      <div class="mt-20" v-else>
        <van-row>
          <van-col span="12" align="center" style="padding: 10px">
            <van-button
              icon="delete-o"
              type="primary"
              @click="handleReset"
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
              @click="handleGenerate"
              block
              round
              plain
              size="small"
              :disabled="loading"
            >
              提交签名
            </van-button>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";
import { showDialog } from "vant";

const lineWidth = ref(6);
const lineColor = ref("#000000");
const bgColor = ref("#fff");
const isCrop = ref(false); // 是否裁剪，在画布设定尺寸基础上裁掉四周空白部分
const signRef = ref(null);

const props = defineProps({
  showDefaultBtn: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  imgSrc: { type: String, default: "" },
  format: { type: String, default: "image/jpeg" },
  singErrorText: { type: String, default: "请您签名后再提交！" },
});
const emits = defineEmits(["onHandleImg"]);

//清空画布
const handleReset = () => (signRef.value as any)?.reset();

// 生成照片
const handleGenerate = () => {
  (signRef.value as any)
    .generate({ format: props.format, quality: 0.5 })
    .then((base64) => emits("onHandleImg", base64))
    .catch(() =>
      showDialog({
        title: props.singErrorText,
        theme: "round-button",
        confirmButtonText: "确认",
      })
    );
};

// 初始化方法
const init = () => nextTick(() => handleReset());

defineExpose({ init, handleReset, handleGenerate, signRef });

onMounted(() => {
  init();
  if (signRef.value) {
    (signRef.value as any).resultImg = "";
  }
});
</script>

<style lang="scss">
.sign-wrap {
  padding: 0 20px 20px;
  height: 100%;
  .sign-content {
    border: 5px dotted gray;
  }
}
.sign-img {
  height: 100%;
  padding: 20px;
  img {
    width: 100%;
  }
}
</style>

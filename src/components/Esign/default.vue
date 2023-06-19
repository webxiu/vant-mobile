<template>
  <div class="sign-wrap">
    <van-nav-bar :title="imgSrc ? '签名预览' : '请在下面虚线范围內签名'" />
    <div class="sign-content flex-1 flex">
      <div v-if="!imgSrc" class="flex-1 ui-ov-h" ref="boxRef">
        <vue-esign
          ref="signRef"
          v-if="width && height"
          :width="width"
          :height="height"
          :isCrop="isCrop"
          :lineWidth="lineWidth"
          :lineColor="lineColor"
          :bgColor.sync="bgColor"
        />
      </div>
      <div v-else class="flex flex-1 p-20">
        <div
          class="sign-img flex-1"
          :style="{ backgroundImage: `url(${imgSrc})` }"
        ></div>
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
const boxRef = ref<HTMLElement>();
const signRef = ref(null);
const width = ref(0);
const height = ref(0);

//
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
  if (boxRef.value) {
    const rect = boxRef.value.getBoundingClientRect();
    width.value = rect.width;
    height.value = rect.height;
  }
  if (signRef.value) {
    (signRef.value as any).resultImg = "";
  }
});
</script>

<style lang="scss">
.sign-wrap {
  padding: 0 20px 20px;
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
  flex-direction: column;
  .sign-content {
    border: 5px dotted gray;
    overflow: hidden;
  }
}
.sign-img {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>

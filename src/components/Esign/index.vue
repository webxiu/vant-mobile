<template>
  <section>
    <div class="sign-wrap">
      <div class="box">
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
      <div class="dialog-footer" v-if="showDefaultBtn">
        <div class="btn" @click="handleReset">清空画板</div>
        <div class="btn confirm-btn" @click="handleGenerate">生成图片</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { showNotify } from "vant";
import { ref, nextTick, onMounted } from "vue";

const lineWidth = ref(6);
const lineColor = ref("#000000");
const bgColor = ref("#f2f3f5");
const resultImg = ref(""); // base64结果数据
const isCrop = ref(false); // 是否裁剪，在画布设定尺寸基础上裁掉四周空白部分
const signRef = ref(null);

const emits = defineEmits(["handleImg"]);
defineProps({ showDefaultBtn: { type: Boolean, value: false } });

//清空画布
const handleReset = () => {
  (signRef.value as any).reset();
};

// 生成照片
const handleGenerate = () => {
  // 可选配置参数 ，在未设置format或quality属性时可在生成图片时配置 例如： {format:'image/jpeg', quality: 0.5}
  (signRef.value as any)
    .generate({ format: "image/jpeg", quality: 0.5 })
    .then((base64) => {
      resultImg.value = base64; //默认生成的是base64形式的图片
      // 将生成的base64格式的图片传给父组件
      emits("handleImg", base64);
    })
    .catch((err) => {
      // 画布没有签字时会执行这里 'Not Signned'
      console.log("err：", err);
      showNotify({ type: "warning", message: "请先签字" });
    });
};
// 初始化方法
const init = () => nextTick(() => handleReset());
defineExpose({ init, handleReset, handleGenerate, signRef });

onMounted(() => {
  (signRef.value as any).resultImg = "";
});
</script>

<style lang="scss">
.sign-wrap {
  padding: 20px;

  .box {
    // margin: 0 auto;
    // margin: 10px 18px;

    // border: 5px dotted gray;
    // background-color: gray;
    width: 100%;
    height: calc(100vh - 360px);
    overflow: hidden;
  }
  .dialog-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    .btn {
      font-size: 14px;
      color: #666;
      width: 45%;
      text-align: center;
      box-sizing: border-box;
      background-color: #f8f8f8;
      padding: 3px 0;
      border-radius: 4px;
    }
    .confirm-btn {
      background-color: #0076bd;
      color: #fff;
    }
  }
}
</style>

<template>
  <Vsign :showEsign="showEsign" :handleImg="handleImg" />
</template>

<script setup lang="ts">
import { onMounted, nextTick, ref } from "vue";
import { useRoute } from "vue-router";
import Vsign from "@/components/VantSign/index.vue";
import { savePayRollsign, queryPayRollsign } from "@/api/oaModule";
import { useUserStore } from "@/store/modules/user";
import { showNotify } from "vant";

const route = useRoute();
const childRef = ref(null);
const appStore = useUserStore();
const showEsign = ref(true);
const resultImgSrc = ref(""); // 回显图片地址

const submitBase64 = (v) => {
  console.log(v, "base64");
};

// 由子组件触发传过来的是base64图片字符串
const handleImg = ({ image }) => {
  const [image1, image2] = image.split(",");
  savePayRollsign({
    payslipId: route.query.payslipId,
    gzmbb: route.query.gzmbb,
    userCode: appStore.userInfo.userNo,
    image1,
    image2,
    mbNo: route.query.gzmbNo,
  }).then((res) => {
    if (res.data && res.status === 200) {
      // 操作成功处理
      showNotify({ type: "success", message: "操作成功" });
      querySign();
    } else
      showNotify({ type: "danger", message: "提交失败，请联系系统组开发人员" });
  });
};

const handleReset = () => (childRef.value as any).handleReset();

const handleSubmit = () => (childRef.value as any).handleGenerate();

const querySign = () => {
  const { payslipId, gzmbNo } = route.query;
  queryPayRollsign({ payslipId: gzmbNo + "" + payslipId }).then((res) => {
    if (res.data) {
      showEsign.value = false;
      resultImgSrc.value = res.data.image1 + "," + res.data.image2;
    }
  });
};

onMounted(() => querySign());

nextTick(() => (childRef.value as any)?.init());
</script>

<!-- <style scoped lang="scss">
.my-sign {
  background-color: #fff;

  :deep(.van-signature__footer) {
    justify-content: space-around;
  }
  :deep(.van-signature__footer .van-button) {
    border-radius: 30px;
    width: 290px;
  }

  // height: 100vh;

  :deep(.van-signature__content) {
    // height: calc(100vh - 350px);
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
  // box-sizing: border-box;
  // width: calc(100vw - 32px);
  // margin: 18px;
  // background-color: red;
  // border: 5px dotted gray;
  height: calc(100vh - 220px);
  display: flex;
  overflow: hidden;
  img {
    object-fit: fill;
    margin: auto;
  }
}
</style> -->

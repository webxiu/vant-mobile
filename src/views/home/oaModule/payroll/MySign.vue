<template>
  <Vsign :resultImgSrcArr="resultImgSrcArr" :handleImg="handleImg" />
</template>

<script setup lang="ts">
import { onMounted, nextTick, ref } from "vue";
import { useRoute } from "vue-router";
import { showNotify } from "vant";
import Vsign from "@/components/VantSign/index.vue";
import { savePayRollsign, queryPayRollsign } from "@/api/oaModule";
import { useUserStore } from "@/store/modules/user";

const route = useRoute();
const childRef = ref(null);
const appStore = useUserStore();
const showEsign = ref(true);
const resultImgSrcArr = ref<string[]>([]); // 回显图片地址

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

const querySign = () => {
  const { payslipId, gzmbNo } = route.query;
  queryPayRollsign({ payslipId: gzmbNo + "" + payslipId }).then((res) => {
    if (res.data) {
      showEsign.value = false;
      resultImgSrcArr.value = [res.data.image1, res.data.image2];
    }
  });
};

onMounted(() => querySign());

nextTick(() => (childRef.value as any)?.init());
</script>

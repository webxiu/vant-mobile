<template>
  <div class="ui-h-100">
    <Esign
      ref="childRef"
      :imgSrc="imgSrc"
      :loading="loading"
      @onHandleImg="onHandleImg"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { showConfirmDialog, showDialog, showToast } from "vant";
import {
  getSignature,
  getPreviewSignature,
  submitSignature,
} from "@/api/oaModule";
import Esign from "@/components/Esign/default.vue";
import { onMounted } from "vue";
import { SignStatus } from "../config";

const route = useRoute();
const loading = ref<boolean>(false);
const imgSrc = ref<string>("");
const emits = defineEmits(["onSubmit"]);

onMounted(() => {
  onGetSignature();
});

// 获取签名图片
const onGetSignature = () => {
  getSignature({ detailId: route.params.id })
    .then((res) => {
      imgSrc.value = res.data.image1 + res.data.image2;
    })
    .catch((err) => {
      showToast({ message: "签名信息获取失败", position: "top" });
    });
};

// 提交前预请求
const onHandleImg = (imgStr: string) => {
  loading.value = true;
  getPreviewSignature({ appId: route.params.id })
    .then((res) => {
      if (
        ![SignStatus.noSign, SignStatus.exception].includes(res.data[0]?.status)
      ) {
        showDialog({
          title: "重复提交提示:",
          message: "只有在考勤明细处于【待签名、异常反馈】状态，方可提交签名！",
          theme: "round-button",
          confirmButtonText: "确认",
        });
        loading.value = false;
        return;
      }

      showConfirmDialog({ title: "", message: "您确定要提交当前签名吗？" })
        .then(() => onSubmitSignature(imgStr))
        .finally(() => (loading.value = false));
    })
    .catch((err) => {
      loading.value = false;
      showToast({ message: "网络错误", position: "top" });
    });
};

// 提交签名
const onSubmitSignature = (imgStr) => {
  const [image1, image2] = imgStr.split(",");
  submitSignature({
    detailId: route.params.id,
    userCode: route.query.userCode,
    image1: image1 + ",",
    image2: image2,
  })
    .then((res) => {
      emits("onSubmit", 0, true);
      showDialog({
        title: "签名成功！",
        theme: "round-button",
        confirmButtonText: "确定",
        confirmButtonColor: "green",
      });
    })
    .finally(() => (loading.value = false));
};
</script>
<style lang="scss" scoped></style>

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
import { useRoute } from "vue-router";
import Esign from "@/components/Esign/index.vue";
import { savePayRollsign, queryPayRollsign } from "@/api/oaModule";
import { useUserStore } from "@/store/modules/user";

const route = useRoute();
const childRef = ref(null);
const appStore = useUserStore();
const showEsign = ref(true);
const resultImgSrc = ref(""); // 回显图片地址

// 由子组件触发传过来的是base64图片字符串
const handleImg = (imgStr) => {
  const [image1, image2] = imgStr.split(",");
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
    }
  });
};

const handleReset = () => (childRef.value as any).handleReset();

const handleSubmit = () => (childRef.value as any).handleGenerate();

const querySign = () => {
  const { payslipId, gzmbNo } = route.query;
  queryPayRollsign({ payslipId: gzmbNo + "" + payslipId }).then((res) => {
    if (res.data) {
      showEsign.value = false;
      resultImgSrc.value = res.data.image1 + res.data.image2;
    }
  });
};

onMounted(() => querySign());

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
  img {
    width: 100vw;
  }
}
</style>

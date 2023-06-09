<template>
  <div class="feed-back">
    <van-nav-bar title="异常反馈"></van-nav-bar>

    <van-notice-bar
      color="#1989fa"
      background="#ecf9ff"
      style="font-size: 12px; margin-top: 6px"
      :speed="30"
      left-icon="volume-o"
      text="如您发现工资项有异常，可以提交反馈内容。"
    ></van-notice-bar>

    <van-cell-group style="margin-top: 40px">
      <van-field
        ref="fieldRef"
        class="mustinput"
        label-align="right"
        :autosize="true"
        minHeight="500"
        v-model="feedBackValue"
        rows="2"
        label="反馈内容："
        required
        type="textarea"
        maxlength="1000"
        placeholder="请输入反馈内容"
        show-word-limit
        :rules="[{ required: true, message: '请输入反馈内容' }]"
      />
    </van-cell-group>

    <div class="submitbtns">
      <van-row>
        <van-col span="24" align="center" style="padding: 10px">
          <van-button
            icon="success"
            color="#1989fa"
            v-on:click="submitFeedBack"
            block
            round
            plain
          >
            提交反馈
          </van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { submitPayRollFeed } from "@/api/oaModule";
import { useUserStore } from "@/store/modules/user";
import { showNotify } from "vant";

const feedBackValue = ref("");
const fieldRef = ref(null);
const appStore = useUserStore();
const route = useRoute();
const emit = defineEmits(["refreshAction", "setBottomCurrent"]);

const submitFeedBack = () => {
  (fieldRef.value as any).validate();
  if (!feedBackValue.value) return;

  // Com.Api.qywx.sendmessage = Com.Api.qywxdomain + '/qywx/oasendmessage';

  submitPayRollFeed({
    payslipId: route.query.payslipId,
    gzmbb: route.query.gzmbb,
    userCode: appStore.userInfo.userNo,
    content: feedBackValue.value,
    mbNo: route.query.gzmbNo,
  }).then((res) => {
    if (res.data === 1) {
      // 成功的操作
      showNotify({ type: "success", message: "提交成功" });
      // emit("refreshAction");
      setTimeout(() => {
        emit("setBottomCurrent", 0);
        emit("refreshAction");
      });
    }
  });
};

onMounted(() => {
  // console.log("first");
  // emit("refreshAction", 888);
});
</script>

<style scoped lang="scss">
.feed-back {
  margin-bottom: 150px;
  .submitbtns {
    margin-top: 30px 0;
  }
}
</style>

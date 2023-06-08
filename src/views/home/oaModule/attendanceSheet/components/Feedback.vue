<template>
  <div class="pb-120">
    <van-nav-bar title="异常反馈" />
    <van-notice-bar
      class="fz-24 mt-12"
      :speed="30"
      left-icon="volume-o"
      :text="noticeText"
    />
    <van-form @submit="onHandleClick">
      <van-cell-group inset>
        <van-field
          type="textarea"
          v-model="content"
          label-align="right"
          autosize
          minHeight="500"
          name="content"
          label="反馈内容："
          placeholder="请输入反馈内容"
          show-word-limit
          maxlength="1000"
          :rules="[{ required: true, message: '反馈内容不能为空！' }]"
        />
      </van-cell-group>
      <div class="m-32">
        <van-button
          round
          plain
          block
          type="danger"
          native-type="submit"
          :disabled="loading"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { showToast, showConfirmDialog } from "vant";
import {
  saveAttendanceException,
  saveAttendanceUserOpenID,
} from "@/api/oaModule";
import { SignStatus } from "../config";

const content = ref("");
const route = useRoute();
const detailData = ref();
const loading = ref<boolean>(false);

const noticeText = ref<string>("如您发现考勤明细有异常，可以提交反馈内容。");
onMounted(() => {
  getOpenID();
});
const detailId = route.params.id;
const userCode = route.query.userCode;

const getOpenID = async () => {
  try {
    const res = await saveAttendanceUserOpenID({ userCode });
    console.log("获取人员openID", res);
  } catch (error) {
    showToast({ message: "提交失败", type: "fail", position: "top" });
  }
};
const onHandleClick = async ({ content }) => {
  showConfirmDialog({
    title: "",
    message: "您确定要提交当前反馈吗？",
  })
    .then(() => onSubmit())
    .finally(() => (loading.value = false));
};
const onSubmit = async ({ content }) => {
  return;
  try {
    await saveAttendanceException({ detailId, userCode, content });
    showToast({ message: "提交成功", position: "top" });
  } catch (error) {
    showToast({ message: "提交失败", type: "fail", position: "top" });
  }
};

const initData = (data: Array<Record<string, any>>) => {
  detailData.value = data[0];
};

defineExpose({ initData });
</script>
<style lang="scss" scoped></style>

<template>
  <div class="pb-120">
    <van-nav-bar title="异常反馈" />
    <van-notice-bar
      class="fz-24 mt-12"
      :speed="30"
      left-icon="volume-o"
      :text="noticeText"
    />
    <van-form @submit="onSubmit">
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
          :rules="[{ required: true, message: '请输入反馈内容' }]"
        />
      </van-cell-group>
      <div class="m-32">
        <van-button round plain block type="danger" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { showToast } from "vant";
import { saveAttendanceException } from "@/api/oaModule";

const content = ref("");
const route = useRoute();

const noticeText = ref<string>("如您发现考勤明细有异常，可以提交反馈内容。");
onMounted(() => {});
const detailId = route.params.id;
const userCode = route.query.userCode;

const onSubmit = async ({ content }) => {
  try {
    await saveAttendanceException({ detailId, userCode, content });
    showToast({ message: "提交成功", position: "top" });
  } catch (error) {
    showToast({ message: "提交失败", type: "fail", position: "top" });
  }
};
</script>
<style lang="scss" scoped></style>

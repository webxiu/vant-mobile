<template>
  <login-layout>
    <template #body>
      <van-form label-width="0" @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="formState.userNo"
            :rules="rules.userNo"
            name="userNo"
            label=""
            placeholder="用户名"
            maxlength="11"
            clearable
          />
          <van-field
            v-model="formState.password"
            type="password"
            name="password"
            label=""
            placeholder="密码"
            clearable
            :rules="rules.password"
          />
        </van-cell-group>
        <div class="form-btn">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            class="btn-item h50"
          >
            提交
          </van-button>
        </div>
      </van-form>
    </template>

    <template #foot>
      <div class="mt-100">
        <van-divider class="line">Beauty Your Life</van-divider>
      </div>
    </template>
  </login-layout>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
// import { validPhone } from "@/utils/validate";
import { login } from "@/api/user";
import { LoginLayout } from "./components/Layout";
import { useRouter } from "vue-router";
import { showFailToast, FieldRule } from "vant";
import md5 from "md5";
import { regExp } from "@/utils/regExp";

import { useUserStore, LoginInfoType } from "@/store/modules/user";
const userStore = useUserStore();

const router = useRouter();

const formState = reactive<LoginInfoType>({
  userNo: "",
  password: "",
});

const checkUserName = (value, rule) => {
  if (!value) return "请填写登录账号！";
  if (!regExp.enNumber.test(value)) return "登录账号格式不正确！";
  return true;
};

const rules: { [key: string]: FieldRule[] } = {
  userNo: [
    { required: true, message: "请填写用户名", trigger: "onBlur" },
    { validator: checkUserName, trigger: "onBlur" },
  ],
  password: [{ required: true, message: "密码不能为空", trigger: "onBlur" }],
};

const onSubmit = async (values: LoginInfoType) => {
  const password = md5(values.password).substr(8, 16).toUpperCase();
  const params = { ...values, password };
  try {
    const { data } = await login(params);
    const { token } = data;
    userStore.setUserInfo(params);
    router.push("/workspace");
  } catch (e) {
    showFailToast("登录失败，请稍后再试...");
  } finally {
  }
};
</script>

<style lang="scss">
@import "./index.scss";

.line {
  color: var(--main-color);
  font-size: 34px;
  margin-top: 30px;
}
</style>

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
            class="mt-20"
            :rules="rules.password"
          />
          <van-field hidden readonly />
        </van-cell-group>
        <div class="form-btn">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            class="btn-item"
          >
            提交
          </van-button>
        </div>
      </van-form>
    </template>

    <template #foot>
      <div class="mb-20 mt-100">
        <van-divider class="line">心怀成爱&nbsp;&nbsp;力奉精益</van-divider>
      </div>
    </template>
  </login-layout>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import md5 from "md5";
import { login } from "@/api/user";
import { useRouter } from "vue-router";
import { regExp } from "@/utils/regExp";
import { orgDomain } from "@/permission";
import { showFailToast, FieldRule } from "vant";
import { LoginLayout } from "./components/Layout";
import { useUserStore, LoginInfoType } from "@/store/modules/user";

const router = useRouter();
const userStore = useUserStore();

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

// 用户密码登录
const onSubmit = (values: LoginInfoType) => {
  const password = md5(values.password).substr(8, 16).toUpperCase();
  const params = { ...values, password, orgDomain };
  login(params)
    .then(() => {
      router.push("/workspace");
      userStore.setUserInfo();
    })
    .catch((err) => showFailToast(err || "登录失败，请稍后再试..."));
};
</script>

<style lang="scss">
@import "./index.scss";

.line {
  color: var(--main-color);
  font-size: 28px;
}
</style>

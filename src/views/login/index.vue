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
import { reactive, onMounted } from "vue";
import md5 from "md5";
import { login, autoLogin, getWxCode } from "@/api/user";
import { useRoute, useRouter } from "vue-router";
import { regExp } from "@/utils/regExp";
import { showFailToast, FieldRule, showConfirmDialog, showDialog } from "vant";
import { LoginLayout } from "./components/Layout";

// import { validPhone } from "@/utils/validate";

import { useUserStore, LoginInfoType } from "@/store/modules/user";
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const formState = reactive<LoginInfoType>({
  userNo: "",
  password: "",
});

onMounted(() => {
  getAutoLogin();
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

const onSubmit = (values: LoginInfoType) => {
  const password = md5(values.password).substr(8, 16).toUpperCase();
  const orgDomain = "app.deogra.com"; // 仅仅测试使用
  const params = { ...values, password, orgDomain };
  login(params)
    .then((res) => {
      if (res.status !== 200) throw (res as any).message;
      userStore.setUserInfo(params);
      router.push("/workspace");
    })
    .catch((err) => showFailToast(err || "登录失败，请稍后再试..."));
};

const getAutoLogin = () => {
  const { state } = route.query;
  alert(11);
  getWxCode({})
    .then((res) => {
      console.log("getWxCode:", res);

      showDialog({
        title: "",
        message: JSON.stringify(res.data),
        theme: "round-button",
        confirmButtonColor: "green",
        confirmButtonText: "确认",
      });

      showConfirmDialog({
        title: "",
        message: "自动登录成功state:" + state + JSON.stringify(res.data),
      }).then(() => {
        const orgDomain =
          location.hostname === "nginx.deogra.com"
            ? "app.deogra.com"
            : location.hostname;
        autoLogin({ orgDomain, state })
          .then((res) => {
            // router.push("/workspace");
            showDialog({
              title: "",
              message: JSON.stringify(res.data),
              theme: "round-button",
              confirmButtonColor: "green",
              confirmButtonText: "确认",
            });
            console.log("自动登录成功:", res);
          })
          .catch((err) => {
            console.log("自动登录err:", err);
            router.push("/login");
          });
      });
    })
    .catch((err) => {
      showDialog({
        title: "",
        message: JSON.stringify(err),
        theme: "round-button",
        confirmButtonColor: "green",
        confirmButtonText: "确认",
      });
    });
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

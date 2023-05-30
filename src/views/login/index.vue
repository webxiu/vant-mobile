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
      <div>
        <div class="handle">
          <van-button
            plain
            class="txt-btn no-border yellow-btn"
            @click="router.push('/forgot')"
            >忘记密码</van-button
          >
          <span class="split-line"></span>
          <van-button
            plain
            class="txt-btn no-border yellow-btn"
            @click="router.push('/register')"
            >注册账号</van-button
          >
        </div>

        <div class="third">
          <van-divider class="line">其他登录方式</van-divider>
          <svg-icon icon-class="wechat" class-name="third-icon wechat" />
          <svg-icon icon-class="weibo" class-name="third-icon weibo" />
        </div>
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

interface LoginParams {
  userNo: string;
  password: string;
}

// import { useUserStore } from '@/store'
// const userStore = useUserStore()

const router = useRouter();

const formState = reactive<LoginParams>({
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

const onSubmit = async (values: LoginParams) => {
  const password = md5(values.password).substr(8, 16).toUpperCase();
  try {
    const { data } = await login({ ...values, password });
    const { token } = data;
    // userStore.SET_TOKEN(token);
    router.push("/workspace");
  } catch (e) {
    showFailToast("登录失败，请稍后再试...");
  } finally {
  }
};
</script>

<style lang="scss">
@import "./index.scss";
.handle {
  text-align: center;
  .txt-btn {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
  }
  .split-line {
    vertical-align: middle;
    display: inline-block;
    width: 2px;
    height: 12px;
    background: var(--yellow-color);
  }
}

.third {
  text-align: center;
  .line {
    width: 200px;
    margin: 80px auto 20px;
  }

  .third-icon {
    cursor: pointer;
    width: 40px;
    height: 40px;

    display: inline-block;
    color: var(--red-color);
    margin: 0 20px;
    &.wechat {
      color: var(--green-color);
    }
  }
}
</style>

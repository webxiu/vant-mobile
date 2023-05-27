<template>
  <div class="section yu-login-layout">
    <div class="logo-container">
      <img :src="logo" alt="" />
    </div>

    <div class="body-container">
      <slot name="body"></slot>
    </div>

    <div class="foot-container">
      <slot name="foot"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import logo from "@/assets/images/logo.png";
</script>

<style lang="scss" scoped>
.logo-container {
  text-align: center;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin: 60px auto 40px;
  overflow: hidden;
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
</style>

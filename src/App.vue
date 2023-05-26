<template>
  <van-config-provider :theme="theme">
    <NavBar />
    <router-view />
  </van-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ConfigProvider, ConfigProviderTheme } from "vant";
import NavBar from "@/components/NavBar/index.vue";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
    [ConfigProvider.name]: ConfigProvider,
  },
  setup() {
    const theme = ref<ConfigProviderTheme>("light");
    return {
      theme,
    };
  },
});
</script>

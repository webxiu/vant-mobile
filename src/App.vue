<template>
  <van-config-provider :theme="theme" class="ui-h-100 ui-p-r">
    <router-view />
  </van-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ConfigProvider, ConfigProviderTheme } from "vant";

export default defineComponent({
  name: "App",
  components: {
    [ConfigProvider.name]: ConfigProvider,
  },
  setup() {
    const theme = ref<ConfigProviderTheme>("light");

    return { theme };
  },
});
</script>

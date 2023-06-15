<template>
  <div class="my-icon">
    <MyIcon
      v-if="route.meta.pathType"
      @click="handleClickIconBack"
      :iconClass="`${
        route.meta.pathType === 'list' ? 'a-homeliving' : 'liebiaofanhui'
      }`"
      class-name="iconClass"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import MyIcon from "@/components/MyIcon/index.vue";

const route = useRoute();
const router = useRouter();

const handleClickIconBack = () => {
  if (route.meta.pathType === "list") {
    router.push("/workspace");
  } else if (route.meta.pathType === "detail") {
    router.back();
  }
};
</script>

<style scoped lang="scss">
.my-icon {
  .iconClass {
    width: 90px;
    height: 90px;
    right: 84px;
    bottom: 190px;
    position: fixed;
    z-index: 1000;
  }
}
</style>

<template>
  <van-sticky>
    <div>
      <van-nav-bar
        :title="appStore.navTitle"
        left-text="返回"
        right-text="退出"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        v-if="showNav"
      />
    </div>
  </van-sticky>
</template>

<script lang="ts" setup>
import { showToast } from "vant";
import { unref, ref, watch, toRaw } from "vue";
import { useRouter, useRoute } from "vue-router";
import { removeCookie } from "@/utils/storage";
import { routeCateList } from "@/router";
import { useAppStore } from "@/store/modules/app";

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const showNav = ref<boolean>(false);

/** 获取路由meta中配置showNav: true的路由地址 */
const getNavList = (routers: RouteConfigRawType[]) => {
  const navList: string[] = [];
  const navFn = (list: RouteConfigRawType[]) => {
    list.forEach((item) => {
      if (item.children) {
        navFn(item.children);
      } else if (item.meta?.showNav) {
        navList.push(item.path.split(":")[0]);
      }
    });
  };
  navFn(routers);
  return navList;
};

const NavBarList = getNavList(routeCateList);

const onClickLeft = () => {
  router.go(-1);
};
const onClickRight = () => {
  removeCookie();
  showToast({ message: "退出成功", type: "success", position: "top" });
  router.push("/login");
};

watch(route, (_, newVal) => {
  showNav.value = NavBarList.some(
    (item) => unref(toRaw(newVal).path).indexOf(item) > -1
  );
});
</script>

<style lang="scss" scoped></style>

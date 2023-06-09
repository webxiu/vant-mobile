<template>
  <div class="manage">
    <!-- <van-sticky>
      <van-nav-bar title="福利商品" />
    </van-sticky> -->
    <div class="wrap-swip">
      <van-swipe
        class="my-swipe"
        :show-indicators="false"
        :loop="false"
        indicator-color="white"
        ref="swiperObject"
      >
        <van-pull-refresh
          v-model="isLoading"
          success-text="刷新成功"
          @refresh="onRefresh"
          @touchmove.stop
        >
          <van-swipe-item class="data-list">
            <van-cell
              v-for="(item, index) in shopListInfo.list"
              v-on:click="router.push(`/internalPurchaseBenefits/${item.id}`)"
            >
              <van-card
                centered
                :price="
                  item.commoditiesSpecs.length > 0
                    ? item.commoditiesSpecs[0].discountPrice
                    : 0.0
                "
                :desc="(item.classifyName ?? '') + ' ' + (item.brandName ?? '')"
                :title="item.commodityName"
                :thumb="
                  item.commoditiesImages.length > 0
                    ? `https://test.deogra.com:8443/static/virtual/file/ftpfile/${item.commoditiesImages[0].imagefilename}` // ? globalData.virtualPath + //   item.commoditiesImages[0].imagefilename
                    : 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
                "
                :origin-price="item.commoditiesSpecs[0].officialPrice"
              >
                <template #tags>
                  <span class="van-tag van-tag--plain van-tag--primary">{{
                    item.model
                  }}</span>
                </template>

                <template #num>
                  <div class="van-card__num">库存：{{ item.totalStock }}</div>
                </template>

                <template #footer>
                  <span style="color: #ff0008df; font-size: 12px"
                    >详情<van-icon name="arrow"></van-icon
                  ></span>
                </template>
              </van-card>
            </van-cell>
            <!-- createDate -->

            <van-empty
              v-if="shopEmpty"
              style="position: relative; top: 30%"
              description="商品上架中,敬请期待..."
            />
          </van-swipe-item>
        </van-pull-refresh>
      </van-swipe>
    </div>
    <div class="bar-group">
      <van-tabbar
        v-model="currentBar"
        active-color="#1989fa"
        @change="bottomChangeBar"
      >
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="orders-o">订单</van-tabbar-item>
        <van-tabbar-item icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { queryShoppingList } from "@/api/oaModule";
import { useAppStore } from "@/store/modules/app";

const appStore = useAppStore();
const currentBar = ref(0);
const shopEmpty = ref(false);
const isLoading = ref(false);
const router = useRouter();

const onRefresh = () => {
  setTimeout(() => {
    isLoading.value = false;
    fetchShoppingList();
  }, 1000);
};

const shopListInfo: { list: any[] } = reactive({ list: [] });

const navigateToDetail = (id) => {
  console.log(id, "detail,id");
  router.push({ path: "" });
};

const bottomChangeBar = (v) => {
  console.log(v, "changed-bottom-bar");

  if (v === 2) {
    router.push("/internalPurchaseBenefits/user");
  }

  if (v === 1) {
    router.push("/internalPurchaseBenefits/orderList");
  }
};

const fetchShoppingList = () => {
  queryShoppingList().then((res) => {
    console.log(res, "商品列表返回");
    if (res.data && res.data.length) {
      shopListInfo.list = res.data;
    }
  });
};

onMounted(() => {
  appStore.setNavTitle("商品列表");
  fetchShoppingList();
});
</script>

<style lang="scss" scoped>
.manage {
  :deep(.van-nav-bar__title) {
    color: red !important;
    font-weight: 800;
  }
  :deep(.van-hairline--bottom:after) {
    border-bottom: 7px solid red;
  }

  .wrap-swip {
    margin-bottom: 100px;

    .data-list {
      :deep(.van-cell__value) {
        text-align: left;
      }
    }
  }
}
</style>

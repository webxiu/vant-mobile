<template>
  <div class="manage">
    <MyLayout>
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
                  :desc="
                    (item.classifyName ?? '') + ' ' + (item.brandName ?? '')
                  "
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
    </MyLayout>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { queryShoppingList } from "@/api/oaModule";
import { useAppStore } from "@/store/modules/app";
import MyLayout from "./MyLayout.vue";

const appStore = useAppStore();
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

const fetchShoppingList = () => {
  queryShoppingList().then((res) => {
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
    padding-bottom: 100px;
    // margin-bottom: 180px;

    .data-list {
      :deep(.van-cell__value) {
        text-align: left;
      }
    }
  }
}
</style>

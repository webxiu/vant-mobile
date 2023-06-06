<template>
  <div>
    <section class="commodityDetail">
      <van-swipe
        class="my-swipe"
        :show-indicators="false"
        :loop="false"
        :touchable="false"
        ref="swiperObject"
        indicator-color="white"
      >
        <van-swipe-item>
          <div class="detail-form">
            <div>
              <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-panel>
                  <van-swipe
                    class="my-swipe1"
                    autoplay="20000"
                    indicator-color="red"
                    loop
                  >
                    <van-swipe-item
                      v-for="(image, index) in images"
                      :key="index"
                    >
                      <img :src="image" lazy="loaded" height="300px" />
                    </van-swipe-item>
                  </van-swipe>

                  <van-cell-group>
                    <van-cell
                      title="商品编号："
                      :value="commodityDetail.billNo"
                    />
                  </van-cell-group>
                  <van-cell-group>
                    <van-cell
                      title="商品名称："
                      :value="commodityDetail.commodityName"
                    />
                  </van-cell-group>
                  <van-cell-group>
                    <van-cell
                      title="商品型号："
                      :value="commodityDetail.model"
                    />
                  </van-cell-group>
                  <van-cell-group>
                    <van-cell title="原价：" value="">
                      <template #extra>
                        <div class="van-card__origin-price">
                          ¥ {{ officialPrice }}
                        </div>
                      </template>
                    </van-cell>
                  </van-cell-group>
                  <van-cell-group>
                    <van-cell title="折扣价：" :value="'￥' + discountPrice" />
                  </van-cell-group>
                  <van-cell-group>
                    <van-cell title="商品描述：" />
                    <template #label>
                      <p v-html="commodityDetail.commodityDescription"></p>
                    </template>
                  </van-cell-group>
                </van-panel>

                <van-form
                  style="margin-left: 20px; font-size: 14px; padding-top: 10px"
                >
                  <van-sku
                    v-model="show"
                    :sku="{}"
                    :initial-sku="initialSku"
                    :goods="goods"
                    goods-id="1"
                    quota="0"
                    :start-sale-num="1"
                    :reset-stepper-on-hide="true"
                    :show-add-cart-btn="false"
                    :safe-area-inset-bottom="false"
                    @buy-clicked="() => {}"
                    ref="sku"
                  >
                    <template #sku-messages="props">
                      <div class="van-cell van-cell--center">
                        <div class="van-cell__title"><span>交货方式</span></div>
                        <van-radio-group
                          v-model="radio"
                          direction="horizontal"
                          @change="() => {}"
                          disabled
                        >
                          <van-radio name="0" checked-color="#ee0a24"
                            >自提</van-radio
                          >
                          <van-radio name="1" checked-color="#ee0a24"
                            >快递</van-radio
                          >
                        </van-radio-group>
                      </div>

                      <div
                        :class="
                          'van-address-item' +
                          ' ' +
                          (addressDivShow ? '' : 'van-address-item--disabled')
                        "
                      >
                        <div class="van-cell van-cell--borderless">
                          <div
                            class="van-cell__value van-cell__value--alone van-address-item__value"
                          >
                            <div
                              role="radio"
                              tabindex="0"
                              aria-checked="true"
                              class="van-radio"
                            >
                              <span class="van-radio__label">
                                <div class="van-address-item__name">
                                  {{ chosenAddress.name ?? "" }}
                                  {{ chosenAddress.tel ?? "" }}
                                </div>
                                <div class="van-address-item__address">
                                  {{ chosenAddress.address ?? "" }}
                                </div>
                              </span>
                            </div>
                          </div>
                          <i
                            :class="
                              'van-icon van-icon-arrow van-cell__right-icon1' +
                              ' ' +
                              (addressDivShow ? '' : 'van-cell__disabled')
                            "
                            v-on:click="() => {}"
                            ><!----></i
                          >
                        </div>
                      </div>
                    </template>
                  </van-sku>

                  <van-dialog
                    v-model="addressShow"
                    title="选择地址"
                    show-cancel-button
                  >
                    <van-address-list
                      v-model="chosenAddressId"
                      :list="addressList"
                      default-tag-text="默认"
                      add-button-text="确定"
                      @add="() => {}"
                      @edit="() => {}"
                    />
                  </van-dialog>
                </van-form>
              </van-pull-refresh>
            </div>

            <div class="van-goods-action">
              <van-button
                round
                block
                type="danger"
                native-type="submit"
                chosenAddress
                style="background-color: #ff0008"
                @click="() => {}"
                >购买</van-button
              >
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const commodityDetail = ref({}) as any;
const chosenAddressId = ref("1");
const addressShow = ref(false);
const addressDivShow = ref(false);
const radio = ref(0);

const show = ref(false);
const discountPrice = ref("");
const officialPrice = ref("");
const images = ref([]);
const isLoading = ref(false);

const initialSku = {};
const goods = {
  // 默认商品 sku 缩略图
  picture: "",
};
const chosenAddress = {
  id: "1",
  name: "张三",
  tel: "13000000000",
  address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
  isDefault: true,
};

const addressList = [
  {
    id: "1",
    name: "张三",
    tel: "13000000000",
    address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
    isDefault: true,
  },
  {
    id: "2",
    name: "李四",
    tel: "1310000000",
    address: "浙江省杭州市拱墅区莫干山路 50 号",
  },
];

console.log(route.params, "params");
const onRefresh = () => {
  setTimeout(() => {
    isLoading.value = true;
  }, 1000);
};
</script>

<style scoped></style>

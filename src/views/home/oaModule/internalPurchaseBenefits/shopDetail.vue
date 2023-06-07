<template>
  <div class="shop-detail" ref="boxRef">
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
            <!-- <div> -->
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <van-swipe
                class="my-swipe1"
                autoplay="20000"
                indicator-color="red"
                loop
              >
                <van-swipe-item
                  v-for="(image, index) in commodityDetail.commoditiesImages"
                  :key="index"
                >
                  <van-image
                    height="300px"
                    :src="`https://test.deogra.com:8443/static/virtual/file/ftpfile/${image.imagefilename}`"
                  />
                  <!-- <img
                    :src="`https://test.deogra.com:8443/static/virtual/file/ftpfile/${image.imagefilename}`"
                    lazy="loaded"
                    height="300px"
                    width="300px"
                  /> -->
                </van-swipe-item>
              </van-swipe>

              <van-cell-group>
                <van-cell title="商品编号：" :value="commodityDetail.billNo" />
              </van-cell-group>
              <van-cell-group>
                <van-cell
                  title="商品名称："
                  :value="commodityDetail.commodityName"
                />
              </van-cell-group>
              <van-cell-group>
                <van-cell title="商品型号：" :value="commodityDetail.model" />
              </van-cell-group>
              <van-cell-group>
                <van-cell title="原价：" value="">
                  <template #extra>
                    <div class="van-card__origin-price">
                      ¥
                      {{
                        commodityDetail.commoditiesSpecs?.length
                          ? commodityDetail.commoditiesSpecs[0]?.officialPrice
                          : ""
                      }}
                    </div>
                  </template>
                </van-cell>
                <!-- https://test.deogra.com:8443/static/virtual/file/ftpfile/imageRealUpload/66E43538485F4FE090149638224AF584.jpg -->
              </van-cell-group>
              <van-cell-group>
                <van-cell
                  title="折扣价："
                  :value="
                    '￥' +
                    (commodityDetail.commoditiesSpecs?.length
                      ? commodityDetail.commoditiesSpecs[0]?.discountPrice
                      : '')
                  "
                />
              </van-cell-group>
              <van-cell-group>
                <van-cell title="商品描述：">
                  <template #label>
                    <pre style="font-family: inherit">{{
                      commodityDetail.commodityDescription
                    }}</pre>
                  </template>
                </van-cell>
              </van-cell-group>

              <van-form
                style="margin-left: 20px; font-size: 14px; padding-top: 10px"
              >
                <div>
                  <van-sku
                    v-model="show"
                    :sku="sku"
                    :goods="goods"
                    :goods-id="goods_id"
                    :quota="0"
                    :initial-sku="initialSku"
                    reset-stepper-on-hide
                    reset-selected-sku-on-hide
                    disable-stepper-input
                    :get-container="boxRef"
                    :show-add-cart-btn="false"
                    :quota-used="0"
                    @buy-clicked="() => {}"
                  >
                    <template #sku-actions-top="props">
                      <div>
                        <div class="van-cell van-cell--center">
                          <div class="van-cell__title">
                            <span>交货方式</span>
                          </div>
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
                      </div>
                    </template>
                  </van-sku>
                </div>

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
            <!-- </div> -->

            <div class="van-goods-action">
              <van-button
                round
                block
                type="danger"
                native-type="submit"
                chosenAddress
                style="background-color: #ff0008"
                @click="show = true"
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
import { queryShoppingList } from "@/api/oaModule";
import { onMounted } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const commodityDetail = ref({}) as any;
const chosenAddressId = ref("1");
const addressShow = ref(false);
const addressDivShow = ref(false);
const radio = ref("0");
const boxRef = ref(null);

let show = ref(false);
const discountPrice = ref("");
const officialPrice = ref("");
const images = ref([]);
const isLoading = ref(false);

const chosenAddress = {
  id: "1",
  name: "张三",
  tel: "13000000000",
  address: "广东省深圳市光明区马田街道合水口社区横岭新村十一巷6号202房间",
  isDefault: true,
};

const addressList = [
  {
    id: "1",
    name: "张三",
    tel: "13000000000",
    address: "浙江省杭州市西湖区文三路 138 ",
    isDefault: true,
  },
];

console.log(route.params, "params");
const onRefresh = () => {
  setTimeout(() => {
    isLoading.value = true;
  }, 1000);
};

const goods_id = "1";

const sku = {
  // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
  // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
  tree: [
    {
      k: "规格",
      k_id: "1",
      v: [
        {
          id: "30349",
          name: "天蓝色",
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg",
        },
        {
          id: "1215",
          name: "白色",
        },
      ],
      k_s: "s1",
      count: 2,
    },
  ],
  // 所有 sku 的组合列表，如下是：白色1、白色2、天蓝色1、天蓝色2
  list: [
    {
      id: 2259,
      price: 120, //价格
      discount: 122,
      s1: "1215",
      s2: "1193",
      s3: "0",
      s4: "0",
      s5: "0",
      stock_num: 20, //库存
      goods_id: 946755,
    },
    {
      id: 2260,
      price: 110,
      discount: 112,
      s1: "1215",
      s2: "1194",
      s3: "0",
      s4: "0",
      s5: "0",
      stock_num: 2, //库存
      goods_id: 946755,
    },
    {
      id: 2257,
      price: 130,
      discount: 132,
      s1: "30349",
      s2: "1193",
      s3: "0",
      s4: "0",
      s5: "0",
      stock_num: 40, //库存
      goods_id: 946755,
    },
    {
      id: 2258,
      price: 100,
      discount: 100,
      s1: "30349",
      s2: "1194",
      s3: "0",
      s4: "0",
      s5: "0",
      stock_num: 50, //库存
      goods_id: 946755,
    },
  ],
  price: "5.00",
  stock_num: 227, // 商品总库存
  none_sku: false, // 是否无规格商品
  hide_stock: false, // 是否隐藏剩余库存
};
const goods = {
  title: "测试商品A",
  picture:
    "https://img.yzcdn.cn/upload_files/2017/03/16/Fs_OMbSFPa183sBwvG_94llUYiLa.jpeg?imageView2/2/w/100/h/100/q/75/format/jpg",
};
const initialSku = {
  s1: "0001",
  s2: "1001",
  selectedNum: 3,
};

const fetchDetailInfo = () => {
  queryShoppingList({ id: route.params.id }).then((res) => {
    console.log(res, "detail--res");
    if (res.data && res.data.length) {
      commodityDetail.value = res.data[0];
    }
  });
};

onMounted(() => {
  fetchDetailInfo();
});
</script>

<style scoped></style>

<template>
  <div class="business-data">
    <van-search
      readonly
      clickable
      size="large"
      id="business-search"
      placeholder="请选择日期"
      v-model="timeValue"
      @click="show"
    ></van-search>
    <van-popup v-model:show="isOpen" position="bottom">
      <van-date-picker
        v-model="currentDate"
        type="year-month"
        title="选择年月"
        @confirm="onConfirm"
        @cancel="isOpen = false"
        :columns-type="['year', 'month']"
      />
    </van-popup>
    <div ref="echartsRef1" class="graph"></div>
    <div ref="echartsRef2" class="graph"></div>
    <div ref="echartsRef3" class="graph"></div>
    <div ref="echartsRef4" class="graph"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, VNodeRef } from "vue";
import { getDateTime } from "@/utils/common";
import { getSaleokratedata } from "@/api/oaModule";
import { initEcharts01, initEcharts02, SaleItemType } from "./config";
import { showToast } from "vant";
const { year, month, dateText, dateTime } = getDateTime();

const isOpen = ref();
const timeValue = ref<string>(`${year}年${month}月`);
const echartsRef1 = ref<HTMLElement>();
const echartsRef2 = ref<VNodeRef>();
const echartsRef3 = ref<VNodeRef>();
const echartsRef4 = ref<VNodeRef>();

const currentDate = ref<string[]>([]);
const querParams = reactive({
  year: year,
  month: month,
  time: `${year}-01-01`,
  starttime: dateTime,
});

onMounted(() => {
  currentDate.value = [`${year}`, month];
  getData();
});

const show = () => {
  isOpen.value = true;
};

const onConfirm = ({ selectedValues }) => {
  isOpen.value = false;
  currentDate.value = selectedValues;
  querParams.starttime = `${selectedValues[0]}`;
  querParams.time = `${selectedValues[1]}`;
  getData();
};

const getData = async () => {
  try {
    const { year, month } = querParams;
    const res = await getSaleokratedata(querParams);
    if (res.status !== 200) throw new Error(res.data);

    console.log("图标数据", querParams, res);
    const salesData: SaleItemType[] = res.data.saleokratedata; //销售数据
    const productData = res.data.productioninstockdetail; //生产数据
    const complainData = res.data.complaintlistTomanagerdate; //客诉数据
    const xAxis = Array.from(new Array(12)).map((_, i) => `${i + 1}月`);

    if (echartsRef1.value) {
      initEcharts01({
        el: echartsRef1.value,
        data: salesData,
        year,
        month,
        xAxis,
      });
    }

    if (echartsRef2.value) {
      initEcharts02({
        el: echartsRef2.value,
        data: productData,
        year,
        month,
        xAxis,
      });
    }

    // console.log("生产数据", salesData);
    // console.log("客诉数据", complainData);
  } catch (error) {
    console.log("error", error);
    showToast({ message: "数据获取失败", position: "top" });
  }
};
</script>

<style lang="scss" scoped>
.business-data {
  padding: 0 40px;
  .graph {
    width: 100%;
    height: 500px;
    box-sizing: border-box;
    margin-bottom: 40px;
    box-shadow: 0 0 4px 1px #ccc;
  }
  :deep(.van-search) {
    padding: 56px 24px;
    background-color: #fff;
  }
  :deep(#business-search) {
    text-align: center;
    font-size: 60px;
    color: #ff0000;
  }
  :deep(.van-icon-search) {
    display: block;
    font-size: 64px;
  }
}
</style>

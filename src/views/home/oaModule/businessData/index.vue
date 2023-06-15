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
    <div ref="chartRef1" class="graph" style="height: 300px"></div>
    <div ref="chartRef2" class="graph" style="height: 300px"></div>
    <div ref="chartRef3" class="graph" style="height: 300px"></div>
    <div ref="chartRef4" class="graph" style="height: 600px"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import { getDateTime } from "@/utils/common";
import { getSaleokratedata } from "@/api/oaModule";
import {
  initEchart_1,
  initEchart_2,
  initEchart_3,
  initEchart_4,
} from "./config";
import { showToast } from "vant";
const { year, month, dateTime } = getDateTime();
const isOpen = ref<boolean>(false);
const timeValue = ref<string>(`${year}年${month}月`);
const chartRef1 = ref<HTMLElement>();
const chartRef2 = ref<HTMLElement>();
const chartRef3 = ref<HTMLElement>();
const chartRef4 = ref<HTMLElement>();

const currentDate = ref<string[]>([]);
const querParams = reactive({
  year: year,
  month: month,
  time: dateTime,
  starttime: `${year}-01-01`,
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
  const curYear = new Date().getFullYear().toString();
  const selectYear = selectedValues[0];
  const { year, lastDate, dateTime } = getDateTime(selectYear);
  const endTime = selectYear < curYear ? lastDate : dateTime;

  currentDate.value = selectedValues;
  querParams.time = endTime;
  querParams.starttime = `${year}-01-01`;
  querParams.year = selectedValues[0];
  querParams.month = selectedValues[1];
  timeValue.value = `${selectedValues[0]}年${selectedValues[1]}月`;

  getData();
};

const getData = async () => {
  try {
    let { year, month } = querParams;
    const res = await getSaleokratedata(querParams);
    if (!res.data) throw (res as any).message;
    const data1 = res.data.saleokratedata;
    const data2 = res.data.productioninstockdetail;
    const data3 = res.data.complaintlistTomanagerdate;
    const data4 = res.data.staffinfodate;

    //销售数据
    if (chartRef1.value) {
      initEchart_1({ el: chartRef1.value, data: data1, year, month });
    }
    //生产数据
    if (chartRef2.value) {
      initEchart_2({ el: chartRef2.value, data: data2, year, month });
    }
    //客户投诉
    if (chartRef3.value) {
      initEchart_3({ el: chartRef3.value, data: data3, year, month });
    }
    //人力资源
    if (chartRef4.value) {
      initEchart_4({ el: chartRef4.value, data: data4, year, month });
    }
  } catch (error) {
    showToast({ message: "数据获取失败", position: "top" });
    console.log("error:", error);
  }
};
</script>

<style lang="scss" scoped>
.business-data {
  padding: 0 20px;
  .graph {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 40px;
    box-shadow: 0 0 4px 0 #ccc;
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

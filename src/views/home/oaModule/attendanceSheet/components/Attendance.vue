<template>
  <div>
    <van-sticky>
      <van-nav-bar
        :title="`${navTitle}考勤明细`"
        left-text="返回"
        right-text="退出"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </van-sticky>
    <div class="customer-complaints">
      <van-form class="pt-40">
        <van-row
          :key="idx"
          v-for="(item, idx) in dataList"
          type="flex"
          class="mt-28 fz-28"
        >
          <van-col span="10" class="ui-ta-r fw-700 color-666">
            {{ item.label }}
          </van-col>
          <van-col span="14" class="ui-ta-l pl-28 fw-700 color-111">
            {{ item.value }}
          </van-col>
        </van-row>
      </van-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import { removeCookie } from "@/utils/storage";
import { statusObj } from "../config";

const columnObj = {
  userCode: "编号",
  productionGroup: "组别",
  status: "状态",
  staffName: "姓名",
  annualLeaveTerms: "年假(H)",
  beLateTime: "迟到时间(M)",
  earlyTime: "早退时间(M)",
  absenteeismTime: "旷工时间(H)",
  thingLeaveTime: "事假(H)",
  peacetimeOverTime: "平时加班时间(H)",
  beAttendanceDay: "应出勤(天)",
  actualAttendanceDay: "实际出勤(天)",
  restOverTime: "休息加班时间(H)",
  overTimeSum: "加班汇总(H)",
  yearMonthTime: "时间",
  // beOnDuty: "应出勤(H)",
  // actualAttendance: "实际出勤(H)",
  // description: "备注",
  // signature: "签名",
};

const props = defineProps({
  detailData: {
    type: Array,
    default: () => [],
  },
});

const router = useRouter();
const navTitle = ref<string>("");
const dataList = ref<Array<{ label: string; value: any }>>([]);

const onClickLeft = () => {
  router.go(-1);
};
const onClickRight = () => {
  removeCookie();
  showToast({ message: "退出成功", type: "success", position: "top" });
  router.push("/login");
};

const initData = (data: Array<Record<string, any>>) => {
  navTitle.value = data[0].yearMonthTime;
  data.forEach((item) => {
    for (const k in columnObj) {
      const value = k === "status" ? statusObj[item[k]]?.title : item[k];
      if (columnObj[k]) dataList.value.push({ label: columnObj[k], value });
    }
  });
};

defineExpose({ initData });
</script>
<style lang="scss" scoped></style>

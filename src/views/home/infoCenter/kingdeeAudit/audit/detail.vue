<template>
  <div class="kingdee-detail">
    <div class="title">
      <div class="content pre-line">测试采购订单审批</div>
      <div class="content pre-line">PO20230515003</div>
    </div>
    <van-form class="pt-40">
      <van-cell-group inset>
        <van-row type="flex">
          <van-col span="8">
            <div class="fw-700">客诉单详情</div>
          </van-col>
        </van-row>
        <van-divider :style="{ margin: '6px 0' }" />
        <van-row
          type="flex"
          class="mt-28 fz-28"
          v-for="item in customerOrderList"
        >
          <van-col span="8" class="ui-ta-r fw-700 color-666">
            {{ item.label }}：
          </van-col>
          <van-col span="14" class="ui-ta-l pl-8">{{ item.value }}</van-col>
        </van-row>
      </van-cell-group>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType, onMounted } from "vue";
import { useRoute } from "vue-router";
import { showToast } from "vant";
import { useAppStore } from "@/store/modules/app";
import { detailsByBillNoforProduce } from "@/api/infoCenter";

interface BillNoForProduceType {
  billNo: any;
  fbillNumber: any;
  formId: any;
  status: any;
  processState: any;
  deployKey: any;
  processCreateUserName: any;
  approvalResult: any;
  processStartTime: any;
  approverUserNames: any;
  completedTime: any;
  userCode: any;
  unApprovalCount: any;
  detailMasterResults: Array<Record<string, any>>;
  detailChildrenResults: Array<Record<string, any>>;
  detailChildrenColumns: Array<Record<string, any>>;
}

defineProps({
  dataList: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});
const appStore = useAppStore();
const route = useRoute();
const masterResult = ref();
const emits = defineEmits(["onLookInfo"]);
const { billNo, billType, fbillNumber } = route.query;

const customerOrderList = ref([
  { label: "采购日期", field: "采购日期", value: "" },
  { label: "采购组织", field: "采购组织", value: "" },
  { label: "供应商", field: "供应商", value: "" },
  { label: "采购员", field: "采购员", value: "" },
]);

onMounted(() => {
  getData();
  appStore.setNavTitle("业务审批详情");
});

const getData = async () => {
  try {
    const result = await detailsByBillNoforProduce({
      billNo,
      billType,
      fbillNumber,
      searchType: 1,
    });

    const data: BillNoForProduceType = result.data;
    // masterResult.value = data.detailMasterResults
    console.log("data", data);
    // data.detailMasterResults.forEach((key) => {
    //   customerOrderList.value.map((item) => {
    //     if (item.field === key) {
    //       item.value = data.info[key];
    //     }
    //   });
    // });
    // detailInfoList.value = data.detailInfo;
  } catch (error) {
    console.log("error:", error);
    showToast({ message: "获取详情信息失败", position: "top" });
  }
};

const onClickItem = (item) => {
  emits("onLookInfo", item);
};
</script>

<style lang="scss" scoped>
.custom-index {
  background: gray;
  color: #fff;
  border-radius: 50%;
  display: inline-block;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
}
.customer-cell {
  margin-top: 20px;
  border: 1px solid #dddee1;
}
:deep(.van-cell__value) {
  text-align: left;
}
</style>

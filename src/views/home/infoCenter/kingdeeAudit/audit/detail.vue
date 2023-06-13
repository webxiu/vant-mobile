<template>
  <div class="mt-40 pl-28 pr-28">
    <div class="title">
      <div class="fz-36 color-111 fw-700">测试采购订单审批</div>
      <div class="fz-12 color-999 mt-10">PO20230515003</div>
    </div>
    <van-form class="pt-10">
      <van-cell-group inset>
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
    <div class="pt-24 pb-24">
      <div class="fw-700 mt-20 mb-20 fz-32 color-111">明细</div>
      <div class="kd-table ui-ovy-a">
        <table>
          <thead>
            <tr>
              <td class="row-td" v-for="item in tableColumns">
                {{ item.label }}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="row-td" v-for="item in tableColumns">
                <span class="table-cell-cont text-ellipsis-3">
                  {{ item.value }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex-col mt-30">
      <FlowAudit :item="item" v-for="(item, i) in auditNodeList" :key="i" />
    </div>

    <van-tabbar id="detailBottom" active-color="#646566">
      <van-tabbar-item
        @click="onClickAudit('1')"
        icon="success"
        style="color: #32cd32"
      >
        审核通过
      </van-tabbar-item>
      <van-tabbar-item @click="onClickAudit('2')" icon="revoke">
        驳回重审
      </van-tabbar-item>
      <van-tabbar-item
        @click="onClickAudit('3')"
        icon="close"
        style="color: #f00"
      >
        终止
      </van-tabbar-item>
    </van-tabbar>
    <van-overlay :show="showLayer" @click="showLayer = false">
      <div class="flex just-center align-center ui-h-100">
        <div class="approval-form-box">
          <van-form @submit="onSubmit" @click.stop>
            <van-cell-group inset>
              <van-field
                v-model="auditForm.approvalType"
                name="approvalType"
                label="快捷选择意见"
                placeholder="点击选择"
                is-link
                readonly
                @click.stop="showPicker = true"
              />
              <van-popup
                v-model:show="showPicker"
                position="bottom"
                @click.stop
              >
                <van-picker
                  title="快捷选择"
                  :columns="columns"
                  @confirm="onConfirm"
                  @cancel="showPicker = false"
                />
              </van-popup>
              <van-field
                v-model="auditForm.disposition"
                name="disposition"
                label="通过意见"
                placeholder="驳回原因"
              />
            </van-cell-group>
            <div style="margin: 16px" class="ui-ta-c flex jus-between">
              <van-button
                round
                class="mr-80 flex-1"
                @click.stop="showLayer = false"
              >
                取消
              </van-button>
              <van-button
                round
                @click.stop
                type="primary"
                native-type="submit"
                class="flex-1"
                color="#07c160"
                :loading="loading"
              >
                确认
              </van-button>
            </div>
          </van-form>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { reactive, ref, PropType, onMounted } from "vue";
import { useAppStore } from "@/store/modules/app";
import { showToastModel } from "@/utils/getStatusColor";
import { showConfirmDialog, showSuccessToast, showToast } from "vant";
import FlowAudit, { AuditNodeItemType } from "../components/FlowAudit.vue";
import {
  detailsByBillNoforProduce,
  approvalNodeDetails,
  approvalInstanceDetails,
  fastSelectApprovalAdviceList,
  auditPass,
} from "@/api/infoCenter";

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
const router = useRouter();
const { billNo, billType, fbillNumber } = route.query;

const auditNodeList = ref<AuditNodeItemType[]>([]);
const showLayer = ref<boolean>(false);
const showPicker = ref<boolean>(false);
const loading = ref<boolean>(false);
const auditType = ref<string>("");
const auditForm = reactive({
  approvalType: "",
  disposition: "",
});
// 订单采购详情
const customerOrderList = ref([
  { label: "采购日期", value: "" },
  { label: "采购组织", value: "" },
  { label: "供应商", value: "" },
  { label: "采购员", value: "" },
]);

// 明细表格配置列
const tableColumns = ref<Array<Record<string, any>>>([
  { label: "价税合计", fseq: "", value: "" },
  { label: "物料编码", fseq: "", value: "" },
  { label: "物料名称", fseq: "", value: "" },
  { label: "采购单位", fseq: "", value: "" },
  { label: "采购数量", fseq: "", value: "" },
  { label: "规格型号", fseq: "", value: "" },
  { label: "含税单价", fseq: "", value: "" },
  { label: "交货日期", fseq: "", value: "" },
  { label: "备注", fseq: "", value: "" },
]);

const columns = ref<Array<Record<string, any>>>([]);
const auditOptions = reactive({
  agreeOptions: [],
  rejectOptions: [],
  stopOptions: [],
});

onMounted(() => {
  getData();
  appStore.setNavTitle("业务审批详情");
});

const getData = () => {
  // 1.获取采购订单和明细
  detailsByBillNoforProduce({ billNo, billType, fbillNumber, searchType: 1 })
    .then((res: any) => {
      if (res.status !== 200) throw (res as any).message;
      const data: BillNoForProduceType = res.data;
      // 测试采购订单审批
      data?.detailMasterResults.forEach((item) => {
        Object.keys(item).forEach((key) => {
          customerOrderList.value.map((order) => {
            if (order.label === key) order.value = item[key];
          });
        });
      });
      // 表格列名称
      data.detailChildrenColumns.forEach((item) => {
        tableColumns.value.forEach((col) => {
          if (col.label === item[col.label]) col.fseq = item.FSEQ;
        });
      });
      // 表格行数据
      data?.detailChildrenResults.forEach((item) => {
        Object.keys(item).forEach((key) => {
          tableColumns.value.forEach((col) => {
            if (col.label === key) col.value = item[key];
          });
        });
      });
    })
    .catch((err) => console.log("err:", err));

  // 获取意见下拉框选项
  fastSelectApprovalAdviceList({ billType })
    .then((res) => {
      if (res.status !== 200) throw (res as any).message;
      const data = res.data;
      const agreeList = data[1].map((text: string) => ({ text, value: text }));
      const rejectList = data[2].map((text: string) => ({ text, value: text }));
      const stopList = data[3].map((text: string) => ({ text, value: text }));
      auditOptions.agreeOptions = agreeList;
      auditOptions.rejectOptions = rejectList;
      auditOptions.stopOptions = stopList;
    })
    .catch((err) => console.log("err:", err));

  // 2.获取审批流程
  approvalNodeDetails({ billNo })
    .then((res) => {
      if (res.status !== 200) throw (res as any).message;
      const data: AuditNodeItemType[] = res.data;
      auditNodeList.value = data;
    })
    .catch((err) => console.log("err:", err))
    .finally(() => getRuningAudit());
};

// 3.获取审批流程(运行中)
const getRuningAudit = () => {
  approvalInstanceDetails({ billNo })
    .then((res) => {
      if (res.status !== 200) throw (res as any).message;
      const data: AuditNodeItemType[] = res.data;
      auditNodeList.value = [
        ...JSON.parse(JSON.stringify(auditNodeList.value)),
        ...data,
      ];
    })
    .catch((err) => console.log("err:", err));
};

const onClickAudit = (type: string) => {
  if (type === "1") {
    columns.value = auditOptions.agreeOptions;
  } else if (type === "2") {
    columns.value = auditOptions.rejectOptions;
  } else if (type === "3") {
    columns.value = auditOptions.stopOptions;
  }
  showLayer.value = true;
  auditType.value = type;
  auditForm.approvalType = "";
  auditForm.disposition = "";
};

const onConfirm = ({ selectedOptions }) => {
  auditForm.approvalType = selectedOptions[0]?.text;
  auditForm.disposition = selectedOptions[0]?.text;
  showPicker.value = false;
};
// 提交确认
const onSubmit = () => {
  if (!auditForm.disposition)
    return showToast({ message: "请选择处理意见", position: "top" });
  showConfirmDialog({
    title: "德龙电器温馨提示",
    message: "确定要审核该单据吗?",
  }).then((res) => {
    const approvalType = auditType.value;
    const disposition = auditForm.disposition;
    const params = { billNo, billType, approvalType, disposition };
    loading.value = true;
    auditPass(params)
      .then((res) => {
        if (res.status !== 200) throw (res as any).message;
        showSuccessToast("处理成功！");
        router.go(-1);
      })
      .catch((err) => showToastModel("fail", err.message, "德龙电器温馨提示"))
      .finally(() => (loading.value = false));
  });
};
// 驳回重审
const onApproval = () => {
  console.log("驳回重审");
};
// 终止
const onStop = () => {
  console.log("终止");
};
</script>

<style lang="scss" scoped>
.kd-table {
  padding-bottom: 16px;
  table {
    border-collapse: collapse;
  }
  .row-td {
    background: rgba(244, 246, 250, 1);
    border: 1px solid rgba(234, 239, 243, 1);
    padding: 4px 5px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(63, 63, 63, 1);
    line-height: 36px;
    border: 1px solid #d6d6d6;
  }
  thead td.row-td {
    min-height: 38px;
    line-height: 38px;
    padding: 8px 20px;
    font-weight: 700;
    white-space: nowrap;
  }
  tbody td.row-td {
    min-height: 120px;
    padding: 5px;
    font-size: 14px;
    padding: 28px 20px;
    line-height: 38px;
    .table-cell-cont {
      width: 200px;
    }
  }
}
.approval-form-box {
  margin: 20px;
  padding: 40px 20px;
  border-radius: 12px;
  background-color: #d3d3d3;
}
</style>

<template>
  <div class="audit-detail">
    <div class="detail-page">
      <van-notice-bar
        class="user-title"
        color="#1989fa"
        background="#ecf9ff"
        left-icon="info-o"
      >
        【{{ detailInfo.formName }}】
      </van-notice-bar>
      <div>
        <div class="detail" v-if="detailInfo.itemList">
          <div
            class="des-item"
            v-for="item in detailInfo.itemList[0].detailList"
          >
            <van-row>
              <van-col class="label" span="8">{{ item.inputItemName }}</van-col>
              <van-col
                class="value"
                v-if="
                  item.inputItemName === '开始日期:' ||
                  item.inputItemName === '结束日期:'
                "
                >{{ item.inputItemValue.split("T")[0] }}</van-col
              >
              <van-col v-else class="value">{{ item.inputItemValue }}</van-col>
            </van-row>
          </div>
        </div>
      </div>
    </div>
    <van-tabbar @change="changeBottomBar" v-model="curActive">
      <van-tabbar-item icon="edit" style="display: none"
        >此项为占位项</van-tabbar-item
      >

      <van-tabbar-item icon="revoke">撤销</van-tabbar-item>
      <van-tabbar-item icon="success">审核</van-tabbar-item>
      <van-tabbar-item icon="replay">回退</van-tabbar-item>
      <van-tabbar-item icon="todo-list-o">审核节点详情</van-tabbar-item>

      <van-dialog
        v-model:show="showAuditModal"
        :title="modalTitle"
        show-cancel-button
        :before-close="notNodeDetailAction"
      >
        <van-form @submit="modalSubmit" ref="formRef">
          <van-cell-group inset style="margin-top: 10px" v-if="curActive === 2">
            <van-field
              v-model="auditReason"
              rows="2"
              autosize
              name="auditSugges"
              type="textarea"
              maxlength="50"
              label="审批意见"
              placeholder="请填写审批意见"
              show-word-limit
              colon
              clearable
              required
              label-align="right"
              :rules="[{ required: true, message: '请填写审批意见' }]"
            />
          </van-cell-group>
          <van-cell-group inset style="margin-top: 10px">
            <van-field
              rows="2"
              v-if="isRevokeAction"
              autosize
              v-model="revokeWhy"
              name="comment"
              type="textarea"
              maxlength="50"
              label="撤消原因"
              placeholder="请填写撤消原因"
              show-word-limit
              colon
              clearable
              required
              label-align="right"
              :rules="[{ required: true, message: '请填写撤消原因' }]"
            />
          </van-cell-group>
          <van-cell-group v-if="curActive === 3">
            <van-field
              v-model="backNode"
              is-link
              readonly
              name="picker"
              label="回退节点"
              show-word-limit
              colon
              autosize
              label-align="right"
              rows="2"
              placeholder="请选择回退节点"
              required
              @click="showBackPicker = true"
              :rules="[{ required: true, message: '请选择回退节点' }]"
            />
            <van-popup v-model:show="showBackPicker" position="bottom">
              <van-picker
                :columns="backPickerColumns"
                @confirm="backOnConfirm"
                @cancel="showBackPicker = false"
              />
            </van-popup>
            <!-- </van-cell-group> -->
            <!-- <van-cell-group v-if="isBackAction" inset style="margin-top: 10px"> -->
            <van-field
              ref="backReasonRef"
              v-model="backReason"
              rows="2"
              name="bkReason"
              autosize
              type="textarea"
              maxlength="50"
              label="回退原因"
              placeholder="请输入回退原因"
              show-word-limit
              colon
              clearable
              required
              label-align="right"
              :rules="[{ required: true, message: '请填写回退原因' }]"
            />
          </van-cell-group>
        </van-form>
      </van-dialog>
    </van-tabbar>
    <van-popup
      v-model:show="showApprovalNodePanel"
      closeable
      position="bottom"
      id="popuppanel"
      :style="{ height: '90%', overflow: 'visible' }"
    >
      <van-nav-bar title="审批节点详情" id="popup-navbar"></van-nav-bar>
      <div
        :style="{ marginTop: '10px', 'overflow-y': 'scroll', height: '60vh' }"
      >
        <van-steps direction="vertical" :active="curActiveStep">
          <van-step v-for="(item, index) in approvalNodeData.list">
            <div style="display: flex; justify-content: space-between">
              <div style="display: flex">
                <div
                  class="nodename"
                  style="margin-bottom: 22px; margin-right: 12px"
                >
                  {{ item.nodeName }}
                </div>
                <div class="sp-type" v-if="item.nodeType">
                  <van-tag type="primary">{{ item.nodeType }}</van-tag>
                  <!-- <van-badge color="#1989fa">
                  <template #content>
                    {{ item.nodeType }}
                  </template>
                </van-badge> -->
                </div>
              </div>
              <div
                class="sp-more"
                v-on:click="openDetailOfNode(item.taskDefId)"
              >
                <i class="van-icon van-icon-arrow"></i>
              </div>
            </div>
            <van-row type="flex" class="steprow">
              <van-col span="8">
                <span class="person-firstname">{{ item.firstName }}</span>
                <span class="personname">{{ item.approvalName }}</span>
              </van-col>
              <van-col span="4">
                <span class="sp-status" :style="{ color: item.color }">{{
                  item.nodeStatus
                }}</span>
              </van-col>
              <van-col span="10" class="sp-timeparent">
                <span class="sp-time">{{ item.approvalDate }}</span></van-col
              >
            </van-row>
            <van-row
              type="flex"
              v-if="
                item.taskDefId != 'startEvent1' &&
                item.approvalRemark &&
                item.approvalRemark != ''
              "
              style="margin-top: 14px"
            >
              <van-col span="6">审批意见：</van-col>
              <van-col span="16">
                {{ item.approvalRemark }}
              </van-col>
            </van-row>
          </van-step>
        </van-steps>
      </div>
    </van-popup>

    <van-popup
      v-model:show="showNodeDetailPanel"
      closeable
      position="bottom"
      id="popuppanel"
      @opened="openPopupCallBack(2)"
      :style="{ height: '90%', overflow: 'visible' }"
    >
      <van-nav-bar
        :title="nodeDetailData.nodeName"
        id="popup-navbar"
      ></van-nav-bar>
      <div>
        <van-steps direction="vertical" :active="-1">
          <van-step v-for="(item, index) in nodeDetailData.nodeDetailList">
            <van-row type="flex" style="margin-top: -8px; padding-top: 8px">
              <van-col span="8">
                <span class="person-firstname">{{ item.firstName }}</span>
                <span class="personname">{{ item.approvalName }}</span></van-col
              >
              <van-col span="4">
                <span class="sp-status" :style="{ color: item.color }">{{
                  item.nodeStatus
                }}</span>
              </van-col>
              <van-col span="10" class="sp-timeparent">
                <span class="sp-time">{{ item.approvalDate }}</span></van-col
              >
            </van-row>
            <van-row
              type="flex"
              v-if="
                item.taskDefId != 'startEvent1' &&
                item.approvalRemark &&
                item.approvalRemark != ''
              "
              style="margin-top: 14px"
            >
              <van-col span="5">审批意见：</van-col>
              <van-col span="17">
                {{ item.approvalRemark }}
              </van-col>
            </van-row>
          </van-step>
        </van-steps>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { showConfirmDialog, showNotify } from "vant";
import {
  deleteLeaveList,
  submitLeaveList,
  revokeLeaveList,
} from "@/api/oaModule";
import { colorSelector } from "@/utils/getStatusColor";
import {
  getAuditTaskDetail,
  revokeAuditTask,
  auditAuditTask,
  getBackNodesList,
  backAuditTask,
} from "@/api/infoCenter";
import { useAppStore } from "@/store/modules/app";

const props = defineProps({ id: String });
const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const inputRef = ref(null);
const formRef = ref(null);
const curActive = ref(0);
const curActiveStep = ref(0);

const detailInfo: any = ref({
  userName: "",
  billNo: "",
  holidayType: "",
  remark: "",
  createUserName: "",
  createdate: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  days: "",
  hours: "",
  billState: 0,
  approver: [],
  operationType: 0,
});

const auditReason = ref("");
const approvalNodeData: any = reactive({ list: [] });
const showApprovalNodePanel = ref(false);
const backReason = ref("");
const revokeWhy = ref("");
const backNode = ref("");
const modalTitle = ref("");
const showAuditModal = ref(false);
const isBackAction = ref(false);
const showBackPicker = ref(false);
const backPickerColumns = ref([]);
const isRevokeAction = ref(false);
const showNodeDetailPanel = ref(false);
const backToActivityId = ref("");
const isAuditAction = ref(false);
const nodeDetailData: any = ref({});

const modalSubmit = () => {
  console.log("first");
};

const backOnConfirm = ({ selectedOptions, selectedValues }) => {
  console.log(selectedValues, "selectedValues");
  backNode.value = selectedOptions[0].text;
  backToActivityId.value = selectedValues[0];

  showBackPicker.value = false;
  // backConfirm
};

const openDetailOfNode = (taskDefId) => {
  showNodeDetailPanel.value = true;
  nodeDetailData.value = approvalNodeData.list.filter(
    (item) => item.taskDefId === taskDefId
  )[0];
};

const openPopupCallBack = (num) => {};

const calcActionBtn = computed(() => {
  return (
    detailInfo.value.operationType === 2 ||
    detailInfo.value.billState === 1 ||
    detailInfo.value.billState === 2
  );
});

const notNodeDetailAction = (action) => {
  (formRef.value as any)
    .validate()
    .then(() => {
      const { processDefId, processInstId, billNo, billId } = route.query;
      let defRes;
      if (curActive.value === 1) {
        defRes = revokeAuditTask({
          processDefId,
          processInsId: processInstId,
          billNo,
          ...(formRef.value as any).getValues(),
        });
      } else if (curActive.value === 2) {
        defRes = auditAuditTask({
          processDefId,
          processInsId: processInstId,
          billNo,
          billId,
          comment: (formRef.value as any).getValues().auditSugges,
        });
      } else if (curActive.value === 3) {
        console.log((formRef.value as any).getValues(), "33333");
        defRes = backAuditTask({
          processInsId: processInstId,
          processDefId,
          billNo,
          comment: (formRef.value as any).getValues().bkReason,
          backToActivityId: backToActivityId.value,
        });
      }

      defRes.then((res) => {
        console.log(res, "操作返回");
      });
      // console.log("formRef", (formRef.value as any).getValues());
      // console.log(route.query, "query");
      // const { processDefId, processInstId, billNo } = route.query;
      // revokeAuditTask({
      //   processDefId,
      //   processInsId: processInstId,
      //   billNo,
      //   ...(formRef.value as any).getValues(),
      // }).then((res) => {
      //   if (res.data) {
      //     console.log(res, "撤销成功");
      //   }
      // });
    })
    .catch(() => {
      console.log("fail");
    });

  // return new Promise((resolve) => {
  //   if (action === "cancel") {
  //     resolve(true);
  //     return;
  //   }
  //   if (auditReason.value) {
  //     // revokeLeaveList({ id: props.id, remark: auditReason.value }).then(
  //     //   (res) => {
  //     //     if (res.data) {
  //     //       resolve(true);
  //     //       showNotify({ message: (res as any).message });
  //     //       setTimeout(() => router.push("/leaveApply"), 100);
  //     //     } else {
  //     //       resolve(false);
  //     //       showNotify({ message: "操作失败，请联系开发人员处理！" });
  //     //     }
  //     //   }
  //     // );
  //     console.log(auditReason.value);
  //   }
  //   resolve(false);
  //   (inputRef.value as any).validate();
  // });
};

const getDetailInfo = () => {
  console.log(route.query, "query");
  const { billId, billNo, processDefId, processInstId } = route.query;

  getAuditTaskDetail({
    billId,
    billNo,
    processDefId,
    processInsId: processInstId,
    searchType: 1,
  }).then((res) => {
    if (res.data) {
      detailInfo.value = res.data[0];
      console.log(res.data[0], "审批详情返回");
    }
  });
};

const handleAction = (actionType) => {
  if (actionType === "back") {
    // showAuditModal.value = true;
    // return;
    showAuditModal.value = true;
    isBackAction.value = true;
  }
  if (actionType === "revoke") {
    showAuditModal.value = true;

    isRevokeAction.value = true;
    // isBackAction.value = false;
  }

  if (actionType === "audit") {
    showAuditModal.value = true;

    // isRevokeAction.value = true;
    // isBackAction.value = false;
  }

  if (actionType === "auditPop") {
    console.log("auditPop", approvalNodeData.list);
    showApprovalNodePanel.value = true;
  }
};

const fetchNodesList = () => {
  getBackNodesList({
    processInsId: route.query.processInstId,
    processDefId: route.query.processDefId,
    billNo: route.query.billNo,
  }).then((res) => {
    if (res.data) {
      // fetch success
      console.log(res.data, "节点列表返回");
      backPickerColumns.value = res.data.map((item) => ({
        text: item.activeName,
        value: item.activeId,
      }));
    }
  });
};

const fetchType2DetailInfo = () => {
  const { billId, billNo, processDefId, processInstId } = route.query;

  getAuditTaskDetail({
    billId,
    billNo,
    processDefId,
    processInsId: processInstId,
    searchType: 2,
  }).then((res) => {
    if (res.data) {
      // detailInfo.value = res.data[0];
      console.log(res.data, "审批详情2222返回");
      curActiveStep.value = res.data.curActive;
      approvalNodeData.list = res.data.nodeList;
      // console.log(approvalNodeData.value, "vvvvv---");
    }
  });
};

const changeBottomBar = (active) => {
  console.log(active, "active");
  curActive.value = active;
  // 点击修改跳转到添加页面并且携带参数，修改标志以及记录id
  switch (active) {
    case 1:
      handleAction("revoke");
      modalTitle.value = "撤消原因";
      break;
    case 2:
      handleAction("audit");
      modalTitle.value = "审批意见";

      break;

    case 3:
      fetchNodesList();

      handleAction("back");
      modalTitle.value = "回退操作";

      break;

    case 4:
      fetchType2DetailInfo();
      handleAction("auditPop");
      break;

    default:
      break;
  }
};

// 根据字典数字计算出对应的字符串
const calcStatus = (statusNum: number): string => {
  let statusStr;

  switch (statusNum) {
    case 0:
      statusStr = "待提交";
      break;
    case 1:
      statusStr = "审核中";
      break;
    case 2:
      statusStr = "已审核";
      break;
    case 3:
      statusStr = "重新审核";
      break;

    default:
      break;
  }

  return statusStr;
};

onMounted(() => {
  appStore.setNavTitle("业务审批详情");
  getDetailInfo();
  fetchType2DetailInfo();
});
</script>

<style lang="scss" scoped>
.audit-detail {
  .detail-page {
    padding: 60px 80px;
    margin-bottom: 80px;

    .des-item {
      margin-bottom: 24px;
      font-size: 28px;

      .label {
        // text-align: right;
        margin-right: 15px;
        text-align: right;
        font-weight: bold;
        color: gray;
        letter-spacing: 1px;
      }
    }
    .user-title {
      margin-bottom: 100px;
      font-size: 30px;
    }
  }
}
</style>

<template>
  <div class="audit-detail">
    <div class="detail-page">
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item
          :title="item.formName"
          :name="index"
          v-for="(item, index) in detailInfo"
        >
          <div class="des-item" v-for="el in item.itemList">
            <van-row :wrap="false" v-if="item.formModel === 'info'">
              <van-row v-if="el.itemName">{{ el.itemName }}</van-row>
              <van-col class="label" span="9">{{ el.inputItemName }}</van-col>
              <van-col
                v-if="el.inputItemModel === 'date'"
                span="16"
                class="textright"
              >
                {{ dateFormatYMD(el.inputItemValue) }}
              </van-col>
              <van-col v-else class="value">{{
                el.inputItemValue || "无"
              }}</van-col>
            </van-row>
            <div v-if="item.formModel === 'detail'">
              <van-collapse v-model="activeNames1" accordion>
                <van-collapse-item
                  :title="child.itemName || '-'"
                  :name="index"
                  v-for="(child, idx) in item.itemList"
                >
                  <div class="des-item" v-for="el in child.detailList">
                    <van-row :wrap="false">
                      <van-col class="label" span="12">{{
                        el.inputItemName
                      }}</van-col>
                      <van-col
                        v-if="el.inputItemModel === 'date'"
                        span="16"
                        class="textright"
                      >
                        {{ dateFormatYMD(el.inputItemValue) }}
                      </van-col>
                      <van-col
                        v-else-if="el.inputItemModel === 'file'"
                        span="16"
                        class="textright"
                      >
                        <a target="_blank" :href="vPath + el.inputItemValue"
                          >点击预览或下载</a
                        >
                      </van-col>
                      <van-col v-else span="16" class="textright">
                        {{ el.inputItemValue }}
                      </van-col>
                    </van-row>
                  </div>
                </van-collapse-item>
              </van-collapse>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <van-tabbar @change="changeBottomBar" v-model="curActive">
      <van-tabbar-item icon="edit" style="display: none"
        >此项为占位项</van-tabbar-item
      >

      <van-tabbar-item icon="revoke" v-show="route.query.tab === '3'"
        >撤销</van-tabbar-item
      >
      <van-tabbar-item icon="success" v-show="route.query.tab !== '3'"
        >审核</van-tabbar-item
      >
      <van-tabbar-item icon="replay" v-show="route.query.tab !== '3'"
        >回退</van-tabbar-item
      >
      <van-tabbar-item icon="todo-list-o">审核节点详情</van-tabbar-item>

      <van-dialog
        v-model:show="showAuditModal"
        :title="modalTitle"
        show-cancel-button
        :before-close="notNodeDetailAction"
      >
        <van-form ref="formRef" validate-trigger="onSubmit">
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
        :style="{
          marginTop: '10px',
          'overflow-y': 'scroll',
        }"
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
              <van-col span="6">
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
              <van-col span="8">审批意见：</van-col>
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
              <van-col span="6">
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
              <van-col span="8">审批意见：</van-col>
              <van-col span="16">
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
import { showNotify } from "vant";

import {
  getAuditTaskDetail,
  revokeAuditTask,
  auditAuditTask,
  getBackNodesList,
  backAuditTask,
} from "@/api/infoCenter";
import { useAppStore } from "@/store/modules/app";

const vPath = import.meta.env.VITE_IMAGEURL_PREFIX;

defineProps({ id: String });
const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
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
const nodeDetailData: any = ref({});
const activeNames = ref(0);
const activeNames1 = ref(0);

const dateFormatYMD = (date: string) => date.split("T")[0];

const backOnConfirm = ({ selectedOptions, selectedValues }) => {
  backNode.value = selectedOptions[0].text;
  backToActivityId.value = selectedValues[0];
  showBackPicker.value = false;
};

const openDetailOfNode = (taskDefId) => {
  showNodeDetailPanel.value = true;
  nodeDetailData.value = approvalNodeData.list.filter(
    (item) => item.taskDefId === taskDefId
  )[0];
};

const notNodeDetailAction = (action: string) => {
  if (action === "cancel") {
    curActive.value = 0;
    return true;
  }
  if (action === "confirm") {
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
          if (res.data) {
            showNotify({ message: (res as any).message, type: "success" });
            setTimeout(() => router.push("/infoCenter/auditTask"), 500);
          } else {
            showNotify({ message: "操作失败，请联系开发人员处理！" });
            return false;
          }
        });
      })
      .catch(() => {
        return false;
      });
  }
};

const getDetailInfo = () => {
  const { billId, billNo, processDefId, processInstId } = route.query;

  getAuditTaskDetail({
    billId,
    billNo,
    processDefId,
    processInsId: processInstId,
    searchType: 1,
  }).then((res) => {
    if (res.data) {
      detailInfo.value = res.data;
    }
  });
};

const handleAction = (actionType) => {
  if (actionType === "back") {
    showAuditModal.value = true;
    isBackAction.value = true;
  }
  if (actionType === "revoke") {
    showAuditModal.value = true;
    isRevokeAction.value = true;
  }

  if (actionType === "audit") {
    showAuditModal.value = true;
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
      curActiveStep.value = res.data.curActive;
      approvalNodeData.list = res.data.nodeList;
    }
  });
};

const changeBottomBar = (active) => {
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

onMounted(() => {
  appStore.setNavTitle("业务审批详情");
  getDetailInfo();
  fetchType2DetailInfo();
});
</script>

<style lang="scss" scoped>
.person-firstname {
  width: 40px;
  height: 40px;
  border: 1px solid #75b9e6;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  display: inline-block;
  color: white;
  background-color: #75b9e6;
  font-size: 16px;
}
.personname {
  margin-left: 10px;
}
.audit-detail {
  .detail-page {
    padding: 30px;

    .des-item {
      margin-bottom: 24px;
      font-size: 28px;

      .label {
        margin-right: 15px;
        text-align: right;
        font-weight: bold;
        color: gray;
        letter-spacing: 1px;
      }
    }
    .user-title {
      margin-top: 60px;
      font-size: 30px;
    }
  }
}
</style>

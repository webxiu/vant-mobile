<template>
  <div>
    <div class="detail-page">
      <van-notice-bar
        class="user-title"
        color="#1989fa"
        background="#ecf9ff"
        left-icon="info-o"
      >
        【{{ detailInfo.userName }}】的请假单
      </van-notice-bar>
      <div>
        <div class="detail">
          <van-divider content-position="center">请假详情</van-divider>
          <div class="des-item">
            <van-row>
              <van-col class="label" span="8">请假人：</van-col>
              <van-col class="value">{{ detailInfo.userName }}</van-col>
            </van-row>
          </div>
          <div class="des-item">
            <van-row>
              <van-col class="label" span="8">请假单号：</van-col>
              <van-col class="value">{{ detailInfo.billNo }}</van-col>
            </van-row>
          </div>
          <div class="des-item">
            <van-row>
              <van-col class="label" span="8">请假类型：</van-col>
              <van-col class="value">{{ detailInfo.holidayType }}</van-col>
            </van-row>
          </div>
          <div class="des-item">
            <van-row>
              <van-col class="label" span="8">请假缘由：</van-col>
              <van-col class="value">{{ detailInfo.remark || "无" }}</van-col>
            </van-row>
          </div>
          <div class="des-item">
            <van-row>
              <van-col class="label" span="8">创建人：</van-col>
              <van-col class="value">{{ detailInfo.createUserName }}</van-col>
            </van-row>
          </div>
          <div class="des-item">
            <van-row>
              <van-col class="label" span="8">创建日期：</van-col>
              <van-col class="value">{{ detailInfo.createdate }}</van-col>
            </van-row>
          </div>
        </div>
        <div class="date">
          <van-divider content-position="center">请假日期</van-divider>
          <div class="des-item">
            <van-row>
              <van-col class="label" span="8">开始日期：</van-col>
              <van-col class="value">
                {{ `${detailInfo.startDate} ${detailInfo.startTime}` }}
              </van-col>
            </van-row>
          </div>
          <div class="des-item">
            <van-row>
              <van-col class="label" span="8">结束日期：</van-col>
              <van-col class="value">
                {{ `${detailInfo.endDate} ${detailInfo.endTime}` }}
              </van-col>
            </van-row>
          </div>
          <div class="des-item">
            <van-row>
              <van-col class="label" span="8">天数：</van-col>
              <van-col class="value">{{ detailInfo.days }}</van-col>
            </van-row>
          </div>
          <div class="des-item">
            <van-row>
              <van-col class="label" span="8">时长：</van-col>
              <van-col class="value">{{ detailInfo.hours }}</van-col>
            </van-row>
          </div>
        </div>
        <div class="msg">
          <van-divider content-position="center">审批信息</van-divider>
          <div class="des-item">
            <van-row>
              <van-col class="label" span="8">当前状态：</van-col>
              <van-col class="value">
                <van-tag :type="colorSelector(detailInfo.billStateName)">
                  {{ detailInfo.billStateName }}
                </van-tag>
              </van-col>
            </van-row>
          </div>
          <div class="des-item" v-if="detailInfo.approver?.length">
            <van-row v-for="(item, index) in detailInfo.approver">
              <van-col span="8" class="label"
                >当前审批人{{
                  detailInfo.approver?.length > 1 ? index + 1 : ""
                }}：</van-col
              >
              <van-col class="value">
                <van-tag :type="colorSelector(detailInfo.billStateName)">
                  {{ item }}
                </van-tag>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </div>
    <van-tabbar
      @change="changeBottomBar"
      v-if="!route.query.tab && !calcActionBtn"
    >
      <van-tabbar-item icon="edit" style="display: none"
        >此项为占位项</van-tabbar-item
      >
      <van-tabbar-item v-show="!calcActionBtn" icon="edit"
        >修改</van-tabbar-item
      >
      <van-tabbar-item v-show="!calcActionBtn" icon="delete-o"
        >删除</van-tabbar-item
      >
      <van-tabbar-item v-show="!calcActionBtn" icon="passed"
        >提交</van-tabbar-item
      >
      <van-tabbar-item icon="revoke" v-show="detailInfo.billState === 1"
        >撤销</van-tabbar-item
      >
      <van-dialog
        v-model:show="showRevoke"
        title="撤销当前请假单"
        show-cancel-button
        :before-close="confirmRevoke"
      >
        <van-form>
          <van-cell-group inset style="margin-top: 10px">
            <van-field
              ref="inputRef"
              v-model="revokeReason"
              rows="2"
              autosize
              label="留言"
              type="textarea"
              maxlength="50"
              placeholder="请填写撤销原因"
              show-word-limit
              colon
              clearable
              required
              label-align="right"
              :rules="[{ required: true, message: '请填写撤销原因' }]"
            />
          </van-cell-group>
        </van-form>
      </van-dialog>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { showConfirmDialog, showNotify } from "vant";
import {
  deleteLeaveList,
  getLeaveDetail,
  submitLeaveList,
  revokeLeaveList,
} from "@/api/oaModule";
import { colorSelector } from "@/utils/getStatusColor";
import { useAppStore } from "@/store/modules/app";

interface DetailInfoType {
  holidayType: string;
  remark: string;
  createUserName: string;
  createdate: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  days: string;
  hours: string;
  userName: string;
  billNo: string;
  billState: number;
  approver: string[];
  operationType: number;
  billStateName: string;
}

const props = defineProps({ id: String });
const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const inputRef = ref(null);

const detailInfo = ref<DetailInfoType>({
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
  billStateName: "",
});

const revokeReason = ref("");
const showRevoke = ref(false);

const calcActionBtn = computed(() => {
  return (
    detailInfo.value.operationType === 2 ||
    detailInfo.value.billState === 1 ||
    detailInfo.value.billState === 2
  );
});

const confirmRevoke = (action: string): boolean | Promise<boolean> => {
  return new Promise((resolve) => {
    if (action === "cancel") {
      resolve(true);
      return;
    }
    if (revokeReason.value) {
      revokeLeaveList({ id: props.id, remark: revokeReason.value }).then(
        (res) => {
          if (res.data) {
            resolve(true);
            showNotify({ type: "success", message: (res as any).message });
            setTimeout(() => router.push("/leaveApply"), 100);
          } else {
            resolve(false);
            showNotify({
              type: "danger",
              message: "操作失败，请联系开发人员处理！",
            });
          }
        }
      );
    }
    resolve(false);
    (inputRef.value as any).validate();
  });
};

const getDetailInfo = () => {
  getLeaveDetail({ id: props.id }).then((res) => {
    detailInfo.value = res.data;
  });
};

const handleAction = (actionType) => {
  if (actionType === "revoke") {
    showRevoke.value = true;
    return;
  }
  showConfirmDialog({
    message: `您确定要${
      actionType === "del" ? "删除" : actionType === "submit" ? "提交" : "撤销"
    }当前请假单吗`,
    confirmButtonColor: "red",
    beforeClose: (action) => {
      return new Promise((resolve) => {
        if (action === "confirm") {
          let actionRes;
          if (actionType === "del") {
            actionRes = deleteLeaveList({ id: props.id });
          } else if (actionType === "submit") {
            actionRes = submitLeaveList({ id: props.id });
          }
          actionRes.then((res) => {
            if (res.data) {
              resolve(true);
              showNotify({ type: "success", message: (res as any).message });
              setTimeout(() => router.push("/leaveApply"), 100);
            } else {
              resolve(false);
              showNotify({
                type: "danger",
                message: "操作失败，请联系开发人员处理！",
              });
            }
          });
        } else resolve(true);
      });
    },
  })
    .then(() => {})
    .catch(() => {});
};

// 点击修改跳转到添加页面并且携带参数，修改标志以及记录id
const changeBottomBar = (active) => {
  switch (active) {
    case 1:
      router.push({
        path: "/leaveApply/add",
        query: { id: props.id, mode: "edit" },
      });
      break;
    case 2:
      handleAction("del");
      break;

    case 3:
      handleAction("submit");
      break;

    case 4:
      handleAction("revoke");
      break;

    default:
      break;
  }
};

onMounted(() => {
  getDetailInfo();
  appStore.setNavTitle("请假单详情");
});
</script>

<style lang="scss" scoped>
.detail-page {
  padding: 60px 80px 120px;
  margin-bottom: 80px;

  .des-item {
    margin-bottom: 24px;
    font-size: 28px;

    .label {
      text-align: right;
    }
  }
  .user-title {
    margin-bottom: 100px;
    font-size: 30px;
  }
}
</style>

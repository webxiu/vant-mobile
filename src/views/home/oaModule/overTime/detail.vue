<template>
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
            <van-col class="label" span="7">请假人：</van-col>
            <van-col class="value">{{ detailInfo.userName }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="7">请假单号：</van-col>
            <van-col class="value">{{ detailInfo.billNo }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="7">请假类型：</van-col>
            <van-col class="value">{{ detailInfo.holidayType }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="7">请假缘由：</van-col>
            <van-col class="value">{{ detailInfo.remark || "无" }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="7">创建人：</van-col>
            <van-col class="value">{{ detailInfo.createUserName }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="7">创建日期：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
      </div>
      <div class="date">
        <van-divider content-position="center">请假日期</van-divider>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="7">开始日期：</van-col>
            <van-col class="value">
              {{ `${detailInfo.startDate} ${detailInfo.startTime}` }}
            </van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="7">结束日期：</van-col>
            <van-col class="value">
              {{ `${detailInfo.endDate} ${detailInfo.endTime}` }}
            </van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="7">天数：</van-col>
            <van-col class="value">{{ detailInfo.days }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="7">时长：</van-col>
            <van-col class="value">{{ detailInfo.hours }}</van-col>
          </van-row>
        </div>
      </div>
      <div class="msg">
        <van-divider content-position="center">审批信息</van-divider>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="7">当前状态：</van-col>
            <van-col class="value">
              <van-tag :type="colorSelector(calcStatus(detailInfo.billState))">
                {{ calcStatus(detailInfo.billState) }}
              </van-tag>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getLeaveDetail } from "@/api/oaModule";
import { colorSelector } from "@/utils/getStatusColor";

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
}

const props = defineProps({ id: String });

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
});

const getDetailInfo = () => {
  getLeaveDetail({ id: props.id }).then((res) => {
    detailInfo.value = res.data[0];
  });
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

onMounted(() => getDetailInfo());
</script>

<style lang="scss" scoped>
.detail-page {
  padding: 60px 80px;

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

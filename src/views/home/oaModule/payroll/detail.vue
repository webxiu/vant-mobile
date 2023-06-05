<template>
  <div class="detail-page">
    <van-notice-bar
      class="user-title"
      color="#1989fa"
      background="#ecf9ff"
      left-icon="info-o"
    >
      【{{ detailInfo.userName }} 2023-03】工资单
    </van-notice-bar>
    <div>
      <div class="detail">
        <!-- <van-divider content-position="center">请假详情</van-divider> -->
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">状态：</van-col>
            <van-col class="value">{{ detailInfo.userName }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">姓名：</van-col>
            <van-col class="value">{{ detailInfo.billNo }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">身份证：</van-col>
            <van-col class="value">{{ detailInfo.holidayType }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">工号：</van-col>
            <van-col class="value">{{ detailInfo.remark }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">标准出勤：</van-col>
            <van-col class="value">{{ detailInfo.createUserName }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">实际出勤：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">正班工资：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">级别工资：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">职务(岗位)津贴：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">保密费：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">工龄津贴：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">房租补贴：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">伙食补贴：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">提成：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">绩效：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">加班费：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">其他：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">应发工资：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">水电费：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">养老保险：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">医疗保险：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">失业保险：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">住房公积金：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">伙食费：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">代缴个人所得税：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
        <div class="des-item">
          <van-row>
            <van-col class="label" span="11">实发工资：</van-col>
            <van-col class="value">{{ detailInfo.createdate }}</van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getLeaveDetail, getPayRollDetail } from "@/api/oaModule";

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
  console.log(props);
  // getPayRollDetail({ id: props.id }).then((res) => {
  //   detailInfo.value = res.data;
  // });
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
    .value {
      font-weight: 600;
      color: black;
    }
  }
  .user-title {
    margin-bottom: 50px;
    font-size: 30px;
  }
}
</style>

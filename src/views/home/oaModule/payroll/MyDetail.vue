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
defineProps(["detailInfo"]);
</script>

<style scoped lang="scss">
.detail-page {
  padding: 60px 80px;
  margin-bottom: 100px;

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

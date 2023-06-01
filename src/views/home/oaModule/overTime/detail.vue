<template>
  <div class="detail-page">
    <div class="user-title">【谢健】的请假单</div>
    <div>
      <div class="detail">
        <van-divider content-position="left">请假详情</van-divider>
        <div class="des-item">
          <div class="label">请假人：</div>
          <div class="value">谢健</div>
        </div>
        <div class="des-item">
          <div class="label">请假单号：</div>
          <div class="value">AFL230504001</div>
        </div>
        <div class="des-item">
          <div class="label">请假类型：</div>
          <div class="value">事假</div>
        </div>
        <div class="des-item">
          <div class="label">请假缘由：</div>
          <div class="value">有事</div>
        </div>
        <div class="des-item">
          <div class="label">创建人：</div>
          <div class="value">谢健</div>
        </div>
        <div class="des-item">
          <div class="label">创建日期：</div>
          <div class="value">2023-05-04 07:18:54</div>
        </div>
      </div>
      <div class="date">
        <van-divider content-position="left">请假日期</van-divider>
        <div class="des-item">
          <div class="label">开始日期：</div>
          <div class="value">2023-05-04 07:18:54</div>
        </div>
        <div class="des-item">
          <div class="label">结束日期：</div>
          <div class="value">2023-05-04 07:18:54</div>
        </div>
        <div class="des-item">
          <div class="label">天数：</div>
          <div class="value">0.6</div>
        </div>
        <div class="des-item">
          <div class="label">时长：</div>
          <div class="value">6</div>
        </div>
      </div>
      <div class="msg">
        <van-divider content-position="left">审批信息</van-divider>
        <div class="des-item">
          <div class="label">当前状态：</div>
          <div class="value">已审核</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.detail-page {
  padding: 60px 80px;

  .des-item {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    font-size: 25px;
  }
  .user-title {
    margin-bottom: 100px;
  }
}
</style>

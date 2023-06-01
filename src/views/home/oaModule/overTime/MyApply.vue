<template>
  <div class="my-apply">
    <div class="list-content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-if="list.length"
          v-model:loading="loading"
          :finished="finished"
          @load="onLoad"
        >
          <div v-for="(item, index) in list" :key="item.userName">
            <div class="list-item">
              <van-cell value="详情" is-link :to="`/overTime/${item.id}`">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                  <van-badge :content="index + 1" color="gray"></van-badge>
                  【{{ item.userName }} - {{ item.overtimeType }}】
                  <van-tag type="primary">{{ item.billStateName }}</van-tag>
                </template>
              </van-cell>

              <van-cell>
                <template #title>
                  <div>
                    <div>
                      <van-icon name="comment-circle-o" />
                      <span class="content-offset">{{ item.remark }}</span>
                    </div>
                    <div>
                      <van-icon name="underway-o" />
                      <span class="content-offset"
                        >{{ item.startDate }} {{ item.startTime }} 至
                        {{ item.endDate }} {{ item.endTime }}</span
                      >
                    </div>
                  </div>
                </template>
              </van-cell>
            </div>
          </div>
        </van-list>

        <!-- 无数据时页面 -->
        <van-empty v-else description="系统没有检索出请假单" />
      </van-pull-refresh>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

let list = reactive([
  {
    userName: "张三",
    overtimeType: "事假",
    billStateName: "已审核",
    remark: "去医院做核酸",
    startDate: "2023-05-06",
    startTime: "14:00",
    endDate: "2023-05-06",
    endTime: "12:00",
    id: 0,
  },

  {
    userName: "李四",
    overtimeType: "婚假",
    billStateName: "审核中",
    remark: "去医院做核酸",
    startDate: "2023-05-06",
    startTime: "14:00",
    endDate: "2023-05-06",
    endTime: "12:00",
    id: 1,
  },
  {
    userName: "王五",
    overtimeType: "调休",
    billStateName: "待提交",
    remark: "去医院做核酸",
    startDate: "2023-05-06",
    startTime: "14:00",
    endDate: "2023-05-06",
    endTime: "12:00",
    id: 2,
  },
  {
    userName: "赵六",
    overtimeType: "年假",
    billStateName: "重新审核",
    remark: "去医院做核酸",
    startDate: "2023-05-06",
    startTime: "14:00",
    endDate: "2023-05-06",
    endTime: "12:00",
    id: 3,
  },
]);

const onLoad = () => {
  setTimeout(() => {
    if (refreshing.value) {
      list = [];
      refreshing.value = false;
    }

    loading.value = false;

    if (list.length >= 1) {
      finished.value = true;
    }
  });
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
</script>

<style scoped lang="scss">
.my-apply {
  //   background-color: red;
  //   height: calc(100vh - 196px);
  .list-content {
    margin-top: 4px;
    padding: 6px;

    .list-item {
      border: 1px solid #dddee1;
      margin-bottom: 6px;

      .content-offset {
        margin-left: 12px;
      }

      :deep(.van-tag--primary) {
        padding: 2px 4px;
      }

      :deep(.van-cell__value),
      :deep(.van-icon-arrow:before) {
        color: #5686ff;
      }

      // :deep(.van-icon-arrow:before) {
      //   color: #5686ff;
      // }
    }

    .custom-title {
      margin-right: 4px;
      vertical-align: middle;
    }

    .search-icon {
      font-size: 16px;
      line-height: inherit;
    }

    :deep(.van-badge--top-right) {
      transform: none;
    }

    :deep(.van-cell__title) {
      display: flex;
      align-items: center;
      flex: 30%;
      // background-color: red;
    }
  }
}
</style>

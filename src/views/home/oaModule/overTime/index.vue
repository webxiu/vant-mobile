<script lang="ts" setup>
import { reactive } from "vue";
import { useAppStore } from "@/store/modules/app";
import { ref } from "vue";

const appStore = useAppStore();

const selectedTab = ref(0);
const selectedMenuValue = ref(0);

let list = reactive([
  {
    userName: '张三',
    overtimeType: '事假',
    billStateName: "已审核",
    remark: '去医院做核酸',
    startDate: '2023-05-06',
    startTime: '14:00',
    endDate: '2023-05-06',
    endTime: '12:00',
  },
  {
    userName: '李四',
    overtimeType: '婚假',
    billStateName: "审核中",
    remark: '去医院做核酸',
    startDate: '2023-05-06',
    startTime: '14:00',
    endDate: '2023-05-06',
    endTime: '12:00',
  },
  {
    userName: '王五',
    overtimeType: '调休',
    billStateName: "待提交",
    remark: '去医院做核酸',
    startDate: '2023-05-06',
    startTime: '14:00',
    endDate: '2023-05-06',
    endTime: '12:00',
  },
  {
    userName: '赵六',
    overtimeType: '年假',
    billStateName: "重新审核",
    remark: '去医院做核酸',
    startDate: '2023-05-06',
    startTime: '14:00',
    endDate: '2023-05-06',
    endTime: '12:00',
  },
]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);


const filterOptions = [
  { text: '全部', value: 0 },
  { text: '待提交', value: 1 },
  { text: '审核中', value: 2 },
  { text: '已审核', value: 3 },
  { text: '重新审核', value: 4 },
];


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

<template>
  <div class="over-time">
    <!-- tab导航 -->
    <van-tabs v-model:active="selectedTab" title-active-color="#1989fa">
      <van-tab title="我申请的" badge="99" />
      <van-tab title="抄送我的" />
    </van-tabs>

    <!-- 下拉菜单 -->
    <van-dropdown-menu>
      <van-dropdown-item v-model="selectedMenuValue" :options="filterOptions" />
    </van-dropdown-menu>

    <!-- 列表区域 -->
    <div class="list-content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-if="list.length" v-model:loading="loading" :finished="finished" @load="onLoad">
          <div v-for="(item, index) in list" :key="item.userName">
            <div class="list-item">
              <van-cell value="详情" is-link>
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                  <van-badge :content="(index + 1)" color="gray"></van-badge>
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
                      <span class="content-offset">{{ item.startDate }} {{ item.startTime }} 至 {{ item.endDate }} {{
                        item.endTime }}</span>
                    </div>
                  </div>
                </template>

              </van-cell>
            </div>
          </div>

        </van-list>

        <!--无数据时页面-->
        <van-empty v-else description="系统没有检索出请假单" />
      </van-pull-refresh>
    </div>

    <!--新增加班单按钮-->
    <div class="add-action" @click="() => { console.log('first') }">
      <van-icon name="plus" size="22" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.over-time {

  .add-action {
    width: 120px;
    border-radius: 50%;
    box-shadow: 2px 3px 6px grey;
    background-color: #5686ff;
    bottom: 30px;
    right: 70px;
    height: 120px;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }

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

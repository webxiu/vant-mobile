<template>
  <div class="my-audit">
    <div class="list-content">
      <van-list
        v-if="resultList.length"
        :offset="10"
        :immediate-check="false"
        finish-text="没有更多了"
      >
        <div
          v-for="(item, index) in resultList"
          :key="item.userName"
          style="
            border-radius: 6px;
            border: 1px solid #dddee1;
            margin: 0 6px 5px;
          "
        >
          <div class="list-item" style="margin: 2px">
            <van-cell value="详情" is-link @click="gotoDetail(item)">
              <!-- 使用title插槽来自定义标题 -->
              <template #title>
                <van-badge :content="index + 1" color="#5686ff"></van-badge>
                【{{ item.flowName }}】

                <van-tag type="primary"> 审核中 </van-tag>
              </template>
            </van-cell>

            <van-cell>
              <template #title>
                <div style="color: #aaa">
                  <div style="text-align: justify">
                    <van-icon name="orders-o" />
                    <span class="content-offset"
                      >业务单号：{{ item.billNo || "无" }}</span
                    >
                  </div>
                  <div>
                    <van-icon name="underway-o" />
                    <span class="content-offset"
                      >发起时间：{{ item.startTime }}</span
                    >
                  </div>
                </div>
              </template>
            </van-cell>
          </div>
        </div>
      </van-list>

      <!-- 无数据时页面 -->
      <van-empty v-else description="暂无数据" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const resultList: any = ref([]);

const initData = (res) => {
  resultList.value = res.data;
};
const gotoDetail = ({ billNo, billId, processDefId, processInstId }) => {
  router.push({
    path: "/infoCenter/auditTask/detail",
    query: { billNo, billId, processDefId, processInstId, tab: 3 },
  });
};
defineExpose({ initData });
</script>

<style lang="scss" scoped>
.my-audit {
  margin: 10px;
  .list-content {
    margin-top: 4px;

    .list-item {
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
      flex-wrap: wrap;
      align-items: center;
      flex: 70%;
    }
  }
}
</style>

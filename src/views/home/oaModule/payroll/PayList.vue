<template>
  <div class="my-pay">
    <div class="list-content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-if="listInfo.payrollList.length">
          <div
            v-for="(item, index) in listInfo.payrollList"
            :key="item.Name"
            style="
              border-radius: 6px;
              border: 1px solid #dddee1;
              margin: 0 3px 5px;
            "
          >
            <div class="list-item" style="margin: 2px">
              <van-cell value="详情" is-link :to="`/payroll/${item.id}`">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                  <van-badge :content="index + 1" color="#5686ff"></van-badge>
                  【{{ item.Name }} - {{ item.GH }}】

                  <van-tag
                    :type="getPayRollListStatusByStr(item.Status).colorStr"
                  >
                    {{ getPayRollListStatusByStr(item.Status).statusText }}
                  </van-tag>
                </template>
              </van-cell>

              <van-cell>
                <template #title>
                  <div style="color: #aaa">
                    <div style="text-align: justify">
                      <van-icon name="gold-coin-o"></van-icon>
                      <span class="content-offset"
                        >实发工资：<span class="sfgz">{{
                          item.SFGZ
                        }}</span></span
                      >
                    </div>
                    <div>
                      <van-icon name="underway-o" />
                      <span class="content-offset"
                        >工资月份：{{ item.YearMonth }}</span
                      >
                    </div>
                  </div>
                </template>
              </van-cell>
            </div>
          </div>
        </van-list>

        <!-- 无数据时页面 -->
        <van-empty v-else description="暂无工资条" />
      </van-pull-refresh>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from "vue";
import { getLeaveList, getPayRollList } from "@/api/oaModule";
import { colorSelector } from "@/utils/getStatusColor";

interface ItemInfoType {
  holidayType: string;
  remark: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  userName: string;
  billStateName: string;
  id: number;
}

const props = defineProps(["dropKey"]);

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

let listInfo = reactive({
  payrollList: [
    {
      id: 1,
      Name: "张三",
      GH: "5562",
      Status: "1",
      SFGZ: "9999",
      YearMonth: "2023-06",
    },
    {
      id: 2,
      Name: "李四",
      GH: "5562",
      Status: "2",
      SFGZ: "9999",
      YearMonth: "2023-06",
    },
    {
      id: 3,
      Name: "王五",
      GH: "5562",
      Status: "3",
      SFGZ: "9999",
      YearMonth: "2023-06",
    },
    {
      id: 4,
      Name: "赵六",
      GH: "5562",
      Status: "4",
      SFGZ: "9999",
      YearMonth: "2023-06",
    },
    {
      id: 5,
      Name: "谢某",
      GH: "5562",
      Status: "5",
      SFGZ: "9999",
      YearMonth: "2023-06",
    },
    {
      id: 6,
      Name: "谭复",
      GH: "5562",
      Status: "6",
      SFGZ: "9999",
      YearMonth: "2023-06",
    },
  ],
});

const onRefresh = () => {
  setTimeout(() => {
    getList();
    refreshing.value = false;
  }, 1000);
};

// 获取列表
const getList = () => {
  getPayRollList({ gzDate: "1890", gzStatus: "" }).then((res) => {
    console.log(res, "pay-res");
    listInfo.payrollList = res.data;
  });
};

const getPayRollListStatusByStr = (str) => {
  let statusText;
  let colorStr;
  switch (str) {
    case "1":
      statusText = "待分发";
      colorStr = "primary";
      break;
    case "2":
      statusText = "分发失败";
      colorStr = "danger";

      break;
    case "3":
      statusText = "待签名";
      colorStr = "primary";

      break;
    case "4":
      statusText = "异常反馈";
      colorStr = "warning";

      break;
    case "5":
      statusText = "已签名";
      colorStr = "success";

      break;
    case "6":
      statusText = "已归档";
      colorStr = "success";

      break;
    default:
      break;
  }

  return { statusText, colorStr };
};

watch(props, (nweProps) => {
  console.log("nweProps", nweProps);

  getList();
});

onMounted(() => {
  console.log(props, "props");
  getList();
});
</script>

<style scoped lang="scss">
.my-pay {
  // background-color: red;
  //   height: calc(100vh - 196px);
  .list-content {
    margin-top: 4px;
    padding: 6px;

    .list-item {
      // border: 1px solid #dddee1;
      // margin-bottom: 6px;

      // border-radius: 2px;
      .sfgz {
        color: black;
      }

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

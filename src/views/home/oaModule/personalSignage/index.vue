<template>
  <div class="p-30">
    <van-card
      :title="'加入德龙'"
      :desc="dateTime"
      :thumb="personInfo?.avatar"
    />

    <div class="flex just-between mt-60">
      <template :key="index" v-for="(item, index) in boardList">
        <div class="audit-item t-border" @click="onHandleClick(item)">
          <div class="fz-28 fw-700">{{ item.label }}</div>
          <div class="mt-20">
            <span class="fw-700">{{ item.value }}</span>
            {{ item.unit }}
          </div>
        </div>
      </template>
    </div>

    <div class="board-list mt-60">
      <template :key="index" v-for="(item, index) in attendanceList">
        <div class="t-border flex just-between align-center p-36 mb-20">
          <div
            class="board-name"
            :style="{
              textAlign: item.field === 'culture' ? 'center' : 'left',
              flex: item.field === 'culture' ? 1 : 'auto',
            }"
          >
            {{ item.label }}
          </div>
          <div class="list-num" v-if="item.field !== 'culture'">
            <span class="fw-700">{{ item.value }}</span>
            {{ item.unit }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { computed } from "@vue/reactivity";
import { getPersonInfo } from "@/api/oaModule";
import { showToast, showLoadingToast, closeToast } from "vant";

interface PersonInfoType {
  annualLeave: string;
  approve: string;
  pending: string;
  overTime: string;
  askForLeave: string;
  avatar: string;
  joinTimeYear: string;
  joinTimeDays: string;
  creation: string;
  compensatoryLeaveDuration: string;
}

const router = useRouter();
const personInfo = ref<PersonInfoType>();
const boardList = ref([
  {
    label: "待审批的任务",
    unit: "条",
    field: "approve",
    value: "0",
    url: "/infoCenter/auditTask",
  },
  {
    label: "我负责的任务",
    unit: "条",
    field: "pending",
    value: "0",
    url: "/infoCenter/myTask",
  },
  {
    label: "我创建的任务",
    unit: "条",
    field: "creation",
    value: "0",
    url: "/infoCenter/createTask",
  },
]);
const attendanceList = ref([
  { label: "本年请假天数", unit: "天", field: "askForLeave", value: "0" },
  {
    label: "剩余调休时长",
    unit: "h",
    field: "compensatoryLeaveDuration",
    value: "0",
  },
  {
    label: "本年剩余年假",
    unit: "天",
    field: "annualLeave",
    value: "0",
  },
  { label: "本年加班天数", unit: "天", field: "overTime", value: "0" },
  { label: "打卡次数", unit: "", field: "count", value: "4" },
  { label: "心怀诚爱，力奉精益", unit: "", field: "culture", value: "" },
]);

onMounted(() => getData());

const dateTime = computed(() => {
  const { joinTimeYear, joinTimeDays } = personInfo.value || {};
  return `${joinTimeYear || 0}年(${joinTimeDays || 0}天)`;
});
const onHandleClick = (item) => {
  if (item.url) {
    router.push(item.url);
  }
};

// 获取数据
const getData = () => {
  showLoadingToast("加载中...");
  getPersonInfo({})
    .then((res) => {
      if (!res.data) throw "暂无数据";
      personInfo.value = res.data;
      boardList.value.forEach((item) => {
        if (res.data[item.field]) item.value = res.data[item.field] || "0";
      });
    })
    .catch(() => showToast({ message: "数据获取失败", position: "top" }))
    .finally(() => closeToast());
};
</script>
<style lang="scss" scoped>
.audit-item {
  padding: 10px 20px 12px;
  border-radius: 8px;
  box-shadow: 0 0 4px 1px #ccc;
  text-align: center;
}
.audit-item:not(:last-child) {
  margin-right: 20px;
}

.t-border {
  border-radius: 8px;
  box-shadow: 0 0 4px 1px #ccc;
  text-align: center;
}

.list-num {
  width: 100px;
  text-align: center;
  font-size: 28px;
}

:deep(.van-card) {
  padding-left: 0;
  .van-image {
    border: 1px solid #ccc;
  }
}
:deep(.van-card__content) {
  font-size: 28px;
  .van-card__desc {
    margin-top: 10px;
  }
}
</style>

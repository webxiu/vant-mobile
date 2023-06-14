<template>
  <div class="detail-page">
    <van-notice-bar
      class="user-title"
      color="#1989fa"
      background="#ecf9ff"
      left-icon="info-o"
    >
      【{{ detailInfo.Name }} {{ detailInfo.YearMonth }}】工资单
    </van-notice-bar>
    <div>
      <div class="detail">
        <div class="des-item" v-for="item in salaryDicts">
          <van-row>
            <van-col class="label" span="11">{{ item.title }}：</van-col>
            <van-col class="value">{{ item.value || "-" }}</van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
const props = defineProps(["detailInfo"]);

const salaryDicts = ref([
  { label: "Status", value: "", title: "状态" },
  { label: "Name", value: "", title: "姓名" },
  { label: "SFZ", value: "", title: "身份证" },
  { label: "GH", value: "", title: "工号" },
  { label: "BZCQ", value: "", title: "标准出勤" },
  { label: "SJCQ", value: "", title: "实际出勤" },
  { label: "ZBGZ", value: "", title: "正班工资" },
  { label: "JBGZ", value: "", title: "级别工资" },
  { label: "ZWGWJT", value: "", title: "职务(岗位)津贴" },
  { label: "BMF", value: "", title: "保密费" },
  { label: "GLJT", value: "", title: "工龄津贴" },
  { label: "FangWuBuTie", value: "", title: "房租补贴" },
  { label: "HSBT", value: "", title: "伙食补贴" },
  { label: "TC", value: "", title: "提成" },
  { label: "JX", value: "", title: "绩效" },
  { label: "JiaBanFei0", value: "", title: "加班费" },
  { label: "QT", value: "", title: "其他" },
  { label: "YFGZ", value: "", title: "应发工资" },
  { label: "SD", value: "", title: "水电费" },
  { label: "YangLBX", value: "", title: "养老保险" },
  { label: "YiLBX", value: "", title: "医疗保险" },
  { label: "SYBX", value: "", title: "失业保险" },
  { label: "ZFGJJ", value: "", title: "住房公积金" },
  { label: "HS", value: "", title: "伙食费" },
  { label: "DJGRSDS", value: "", title: "代缴个人所得税" },
  { label: "SFGZ", value: "", title: "实发工资" },
]) as any;

watch(props, () => {
  salaryDicts.value = salaryDicts.value.map((item) => ({
    label: item.label,
    value: props.detailInfo[item.label],
    title: item.title,
  }));
});
</script>

<style scoped lang="scss">
.detail-page {
  padding: 60px 80px 120px;
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

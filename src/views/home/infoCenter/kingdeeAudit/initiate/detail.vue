<template>
  <div class="flex just-between">顶顶顶顶</div>
  <div class="flex just-between">顶顶顶顶</div>
</template>

<script lang="ts" setup>
import { ref, PropType, onMounted } from "vue";
import { useAppStore } from "@/store/modules/app";

defineProps({
  dataList: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});
const appStore = useAppStore();

onMounted(() => {
  appStore.setNavTitle("业务审批详情");
});

const emits = defineEmits(["onLookInfo"]);
const onClickItem = (item) => {
  emits("onLookInfo", item);
};
</script>

<style lang="scss" scoped>
.custom-index {
  background: gray;
  color: #fff;
  border-radius: 50%;
  display: inline-block;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
}
.customer-cell {
  margin-top: 20px;
  border: 1px solid #dddee1;
}
:deep(.van-cell__value) {
  text-align: left;
}
</style>

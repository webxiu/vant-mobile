<template>
  <div class="supplier-complaints">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model:loading="isLoading"
        :finished="true"
        finished-text="没有更多了"
        class="p-16 box-border"
      >
        <van-cell
          v-for="(item, index) in dataList"
          :key="item.id"
          class="customer-cell"
        >
          <div class="ui-va-m">
            <span class="custom-index">{{ index + 1 }}</span>
            <span class="ml-8 color-333">
              【被投诉采购员 - {{ item.fname }}】
            </span>
          </div>
          <div
            class="flex just-between align-end mt-40"
            @click="onJumpDetail(item)"
          >
            <div>
              <div>
                <van-icon name="comment-circle-o" />
                <span class="ml-8 color-333">{{ item.cryptonym }}</span>
              </div>
              <div>
                <van-icon name="underway-o" />
                <span class="ml-8 color-333">{{ item.creattime }}</span>
              </div>
            </div>
            <van-button type="primary" plain size="mini" style="border: none">
              详情<van-icon name="arrow" />
            </van-button>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getSupplierComplaints } from "@/api/oaModule";

interface SupplierItemType {
  id: number;
  fname: string;
  cryptonym: string;
  content: string;
  name: string;
  phone: string;
  fbillno: string;
  creattime: string;
}
const router = useRouter();
const isLoading = ref<boolean>(false);
const dataList = ref<SupplierItemType[]>([]);

onMounted(() => getData());
const onRefresh = () => getData();

const getData = async () => {
  try {
    isLoading.value = true;
    const res = await getSupplierComplaints({});
    dataList.value = res.data;
    isLoading.value = false;
    console.log("data", res.data);
  } catch (error) {}
};

const onJumpDetail = (item: SupplierItemType) => {
  router.push(`/supplierComplaints/${item.id}`);
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

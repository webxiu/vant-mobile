<template>
  <div class="customer-complaints">
    详情id:{{ id }}

    <pre>
    <code>
        {{ JSON.stringify(customerInfo, null, 2) }}
    </code>
  </pre>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { showToast } from "vant";
import { getCustomerComplaintDetail } from "@/api/oaModule";

const customerInfo = ref();

const route = useRoute();
const id = route.params.id;

onMounted(() => getData());

const getData = async () => {
  try {
    const result = await getCustomerComplaintDetail({ id });
    customerInfo.value = result.data;
  } catch (error) {
    showToast({ message: "获取详情信息失败", position: "top" });
    console.log("error:", error);
  }
};

console.log("route", route);
</script>

<style lang="scss" scoped></style>

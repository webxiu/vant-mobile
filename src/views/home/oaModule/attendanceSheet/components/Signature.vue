<template>
  <div class="customer-complaints">签名</div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { showToast } from "vant";
import { getCustomerComplaintDetail } from "@/api/oaModule";
</script>
<style lang="scss" scoped></style>

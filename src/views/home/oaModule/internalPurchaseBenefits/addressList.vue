<template>
  <div>
    <!-- <div class="page-header" ref="pageheader">
      <div class="van-tabs van-tabs-line">
        <van-nav-bar
          title="收货地址管理"
          left-arrow
          @click-left="clickLeft"
        ></van-nav-bar>
      </div>
    </div> -->
    <div class="van-tabs__content">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      ></van-address-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { queryAddressList } from "@/api/oaModule";
import { queryUserInfo } from "@/api/user";

const router = useRouter();

const chosenAddressId = ref("1");
const userInfo: any = ref({});
const list = ref([]);

const onAdd = () => {
  router.push(`/internalPurchaseBenefits/addressAdd?type=add`);
};
const onEdit = (addressItem) => {
  router.push({
    path: "/internalPurchaseBenefits/addressAdd",
    query: {
      id: +addressItem.id,
      type: "edit",
    },
  });
};

const fetchAddressList = () => {
  queryAddressList({ userId: userInfo.value.id }).then((res) => {
    if (res.data && res.data.length) {
      list.value = res.data.map((item) => ({
        id: item.id,
        name: item.addressee,
        tel: item.addresseePhone,
        address: item.fullAddress,
        isDefault: item.isDefault === 1 ? true : false,
      }));
    }
  });
};

const clickLeft = () => router.replace("/internalPurchaseBenefits/user");

onMounted(() => {
  queryUserInfo({}).then((res) => {
    if (res.data) {
      userInfo.value = res.data;
      fetchAddressList();
    }
  });
});
</script>

<style scoped></style>

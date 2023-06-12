<template>
  <div>
    <section
      class="van-doc-demo-section demo-pull-refresh homepage"
      id="addressdetail"
      name="pull-refresh"
    >
      <!-- <div class="page-header" ref="pageheader">
        <div class="van-tabs van-tabs-line">
          <van-nav-bar
            title="收货地址编辑"
            left-arrow
            @click-left="clickLeft"
          ></van-nav-bar>
        </div>
      </div> -->
      <div class="van-tabs__content">
        <van-address-edit
          :area-list="areaList"
          :address-info="addressInfo"
          show-postal
          :show-delete="isEdit"
          show-set-default
          :area-columns-placeholder="['请选择', '请选择', '请选择']"
          @save="onSave"
          @delete="onDelete"
        >
        </van-address-edit>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getAreaList,
  addAddressList,
  getAddressListDetailInfo,
  editAddressList,
  deleteAddressList,
} from "@/api/oaModule";
import { queryUserInfo } from "@/api/user";
import { showNotify } from "vant";
import { useAppStore } from "@/store/modules/app";

const router = useRouter();
const route = useRoute();
defineProps(["id", "type"]);
const areaList: any = ref({});
const addressInfo: any = ref({});
const userInfo: any = ref({});
const isEdit = ref(false);

const clickLeft = () => router.replace("/internalPurchaseBenefits/addressList");

const onSave = (val) => {
  // 提取通用请求参数
  let params: any = {
    addressee: val.name,
    userId: userInfo.value.id,
    addresseePhone: val.tel,
    areaCode: val.areaCode,
    detailAddress: val.addressDetail,
    isDefault: val.isDefault ? 1 : 0,
  };

  if (isEdit.value) {
    params = {
      ...params,
      id: Number(route.query.id),
      modificationId: userInfo.value.id,
      areaCode: addressInfo.value.areaCode,
    };

    // 编辑
    editAddressList({
      ...params,
    }).then((res) => {
      console.log(res, "update--res");
      if (res.data) {
        // 编辑成功
        showNotify({ type: "success", message: "操作成功" });
        router.push("/internalPurchaseBenefits/addressList");
      }
    });
  } else if (route.query.type === "add") {
    params = {
      ...params,
      createId: userInfo.value.id,
    };

    // 新增
    addAddressList({
      ...params,
    }).then((res) => {
      console.log(res, "insert--res");
      if (res.data) {
        // 新增成功
        showNotify({ type: "success", message: "操作成功" });
        router.push("/internalPurchaseBenefits/addressList");
      }
    });
  }
};
const onDelete = () => {
  deleteAddressList({ id: Number(route.query.id) }).then((res) => {
    if (res.data) {
      // 删除成功
      showNotify({ type: "success", message: "操作成功" });
      router.push("/internalPurchaseBenefits/addressList");
    }
  });
};

const fetchAreaListInfo = () => {
  getAreaList().then((res) => {
    if (res.data) {
      areaList.value = res.data;
    }
  });
};

const fetchDetailInfo = () => {
  getAddressListDetailInfo({ id: route.query.id }).then((res) => {
    if (res.data) {
      addressInfo.value = {
        name: res.data.userName,
        tel: res.data.addresseePhone,
        addressDetail: res.data.detailAddress,
        province: res.data.provinceName,
        city: res.data.cityName,
        areaCode: res.data.adcode,
        county: res.data.districtName,
        isDefault: res.data.isDefault === 1 ? true : false,
      };
    }
  });
};

onMounted(() => {
  if (route.query.id && route.query.type === "edit") {
    useAppStore().setNavTitle("编辑收货地址");

    isEdit.value = true;
    fetchDetailInfo();
  } else useAppStore().setNavTitle("新增收货地址");
  fetchAreaListInfo();

  queryUserInfo({}).then((res) => {
    if (res.data) {
      userInfo.value = res.data;
    }
  });
});
</script>

<style scoped></style>

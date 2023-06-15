<script lang="ts" setup>
import { routeCateList } from "@/router";
import { useRouter } from "vue-router";
import MyIcon from "@/components/MyIcon/index.vue";

const router = useRouter();

const onClickItem = (item: RouteConfigRawType, cell: RouteConfigRawType) => {
  router.push(`${item.path}/${cell.path}`);
};
</script>

<template>
  <div class="workspace">
    <template v-for="item in routeCateList">
      <div class="cate-title" v-if="item.meta">{{ item.meta.title }}</div>
      <van-grid :column-num="3" :gutter="10" :border="false">
        <template v-for="cell in item.children">
          <van-grid-item
            class="no-select"
            :class="{ disable: cell.meta.disable }"
            v-if="cell.meta && !cell.meta.hidden"
            @click="onClickItem(item, cell)"
          >
            <template #icon>
              <MyIcon :iconClass="cell.meta.icon" class-name="iconClass" />
            </template>
            <template #text>
              <span class="icon-text-span">
                {{ cell.meta.title }}
              </span>
            </template>
          </van-grid-item>
        </template>
      </van-grid>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.workspace {
  width: 750px;

  .iconClass {
    width: 90px;
    height: 90px;
  }

  .icon-text-span {
    font-size: 26px;
    margin-top: 5px;
    color: #646566;
  }

  .cate-title {
    padding: 60px 30px 20px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: 700;
    font-size: 26px;
    line-height: 16px;
  }
}
:deep(.van-grid-item) {
  &:hover {
    cursor: pointer;
  }
  &.disable {
    &:hover {
      cursor: not-allowed;
    }
    opacity: 0.5;
  }
}
</style>

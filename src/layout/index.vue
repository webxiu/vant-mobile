<script setup lang="ts">
import { Transition } from "vue";
import BackButton from "@/components/BackButton/index.vue";
</script>

<template>
  <router-view>
    <template #default="{ Component, route }">
      <BackButton />
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </router-view>
</template>

<script lang="ts" setup>
defineProps({ data: Object });
</script>

<template>
  <div>88888888待处理</div>
  <pre>
    <code>
      {{ JSON.stringify(data, null, 2) }}
    </code>
  </pre>
</template>

<style lang="scss" scoped></style>

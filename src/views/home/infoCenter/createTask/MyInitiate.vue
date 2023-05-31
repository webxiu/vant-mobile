<script lang="ts" setup>
defineProps({ data: Object });
</script>

<template>
  <div>===已暂停</div>
  <pre>
    <code>
      {{ JSON.stringify(data, null, 2) }}
    </code>
  </pre>
</template>

<style lang="scss" scoped></style>

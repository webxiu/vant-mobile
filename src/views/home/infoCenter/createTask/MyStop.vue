<script lang="ts" setup>
defineProps({ data: Object });
</script>

<template>
  <div>===已终止</div>
  <pre>
    <code>
      {{ JSON.stringify(data, null, 2) }}
    </code>
  </pre>
</template>

<style lang="scss" scoped></style>

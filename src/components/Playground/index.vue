<template>
  <div class="playground" :style="sizeStyle">
    <Cube />
  </div>
</template>

<script setup lang="ts">
const halfSize = 20;
const sizeStyle = computed(() => `--size: ${ halfSize * 2 }px; --halfSize: ${ halfSize }px`);
</script>

<style scoped lang="less">
.playground {
  width: 50%;
  height: 100%;
  position: fixed;
  left: 0;
  box-sizing: border-box;
}
</style>


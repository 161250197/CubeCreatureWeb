<template>
  <div class="playground" :style="sizeStyle">
    <Cube v-for="cube of cubes" :cube="cube" />
  </div>
</template>

<script setup lang="ts">
import { getStore } from '../../store';

const halfSize = 20;
// --size、--halfSize 直接写会有警告 TODO 直接改成 less 变量
const sizeStyle = computed(() => `--size: ${ halfSize * 2 }px; --halfSize: ${ halfSize }px`);

const store = getStore();
const cubes = computed(() => store.state.cubes);
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


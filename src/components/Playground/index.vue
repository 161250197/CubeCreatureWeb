<template>
  <div class="playground">
    <Cube v-for="cube of cubes" :cube="cube" />
  </div>
</template>

<script setup lang="ts">
import { getStore } from '../../store';
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


<template>
  <div class="cover" v-if="showCover"></div>
</template>

<script setup lang="ts">
import { getStore } from '../store/store';

const store = getStore();
const showCover = computed(() => store.state.showCover);
</script>

<style scoped lang="less">
.cover {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2000;
}
</style>

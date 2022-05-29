<template>
  <div class="playground">
    <Cube v-for="cube of cubes" :cube="cube" />
    <Cube v-if="validPosition" :cube="addCube" isAddCube />
  </div>
</template>

<script setup lang="ts">
import { getStore } from '../../store/store';
const store = getStore();
const cubes = computed(() => store.state.cubes);
const addCube = computed(() => store.state.addCube);
const validPosition = computed(() => !store.getters.invalidPosition);
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


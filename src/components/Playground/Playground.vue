<template>
  <div class="playground">
    <Cube v-for="cube of cubes" :cube="cube" />
    <Cube v-for="cube of deleteCubes" :cube="cube" isToDelete />
    <Cube v-if="validPosition && devToolTabIsAdd" :cube="addCube" />
  </div>
</template>

<script setup lang="ts">
import { getStore } from '../../store/store';
const store = getStore();
const cubes = computed(() => store.state.cubes);
const deleteCubes = computed(() => store.state.deleteCubes);
const addCube = computed(() => store.state.addCube);
const validPosition = computed(() => !store.getters.invalidPosition);
const devToolTabIsAdd = computed(() => store.getters.devToolTabIsAdd);
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


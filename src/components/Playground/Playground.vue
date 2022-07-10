<template>
  <div class="playground">
    <Cube v-for="cube of cubes" :key="cube.key" :cube="cube" />
    <Cube v-for="cube of deleteCubes" :key="cube.key" :cube="cube" isToDelete />
    <Cube v-if="showAddCube" :cube="addCube" />
  </div>
</template>

<script setup lang="ts">
import { getStore } from "../../store/store";
const store = getStore();
const cubes = computed(() => store.state.cubes);
const deleteCubes = computed(() => store.state.deleteCubes);
const addCube = computed(() => store.state.addCube);
/** 合法的添加方块位置 */
const showAddCube = computed(
  () =>
    !store.getters.invalidPosition &&
    store.getters.devToolTabIsAdd &&
    store.getters.isDevMode
);
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


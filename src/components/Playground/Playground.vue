<template>
  <div class="playground" :class="{ 'is-dev-mode': isDevMode }">
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
const isDevMode = computed(() => store.getters.isDevMode);
</script>

<style scoped lang="less">
.playground {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  box-sizing: border-box;
  z-index: -1;
  &.is-dev-mode {
    width: 50%;
  }
}
</style>


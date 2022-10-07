<template>
  <div class="playground" :class="{ 'is-dev-mode': isDevMode }">
    <template v-if="isGameMode">
      <PromptAddCubes />
      <Score />
    </template>

    <div class="cubes-wrapper">
      <ChessBoard />
      <ChessBoardCube v-for="cube of cubes" :key="cube.key" :cube="cube" />
      <ChessBoardCube
        v-for="cube of deleteCubes"
        :key="cube.key"
        :cube="cube"
        isToDelete
      />
      <ChessBoardCube
        v-for="cube of toShowCubes"
        :key="cube.key"
        :cube="cube"
        isToDelete
      />
      <ChessBoardCube v-if="showAddCube" :cube="addCube" />
      <PromptCubes v-if="isGameMode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getStore } from "../../store/store";
const store = getStore();
const cubes = computed(() => store.state.cubes);
const deleteCubes = computed(() => store.state.deleteCubes);
const toShowCubes = computed(() => store.state.toShowCubes);
const addCube = computed(() => store.state.addCube);
/** 合法的添加方块位置 */
const showAddCube = computed(
  () =>
    !store.getters.invalidPosition &&
    store.getters.devToolTabIsAdd &&
    store.getters.isDevMode
);
const isDevMode = computed(() => store.getters.isDevMode);
const isGameMode = computed(() => store.getters.isGameMode);
</script>

<style scoped lang="less">
.playground {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  box-sizing: border-box;

  .cubes-wrapper {
    position: absolute;
    transform-style: preserve-3d;
    transform: rotate3d(1, 0, 0, 335deg) rotate3d(0, 1, 0, 50deg);
    left: 50%;
    top: 50%;
  }

  &.is-dev-mode {
    width: 50%;
  }
}
</style>

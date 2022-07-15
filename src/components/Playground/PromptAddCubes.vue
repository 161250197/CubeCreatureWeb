<template>
  <div class="prompt-add-cube-wrapper">
    <div
      class="prompt-add-cube"
      v-for="(cubeColor, index) of addCubeColors"
      :key="index"
      :style="{
        width: CUBE_SIZE_PX,
        height: CUBE_SIZE_PX,
      }"
      :class="{ first: index === 0 }"
    >
      <CubeComponent :background="cubeColor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CUBE_SIZE_PX } from "../../util/constant";
import { getStore } from "../../store/store";

const store = getStore();
const addCubeColors = computed(() => store.state.addCubeColors);
</script>

<style scoped lang="less">
.prompt-add-cube {
  transform-style: preserve-3d;
  transform: rotate3d(1, 0, 0, 335deg) rotate3d(0, 1, 0, 50deg);
  margin: 0 25px;

  &.first {
    transform: rotate3d(1, 0, 0, 335deg) rotate3d(0, 1, 0, 50deg)
      scale3d(1.5, 1.5, 1.5);
    margin: 0 40px;
  }

  &-wrapper {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    width: 300px;
    height: 120px;
    position: fixed;
  }
}
</style>

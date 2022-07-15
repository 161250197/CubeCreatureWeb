<template>
  <ChessBoardCube
    v-for="(cube, index) of toLeftCubes"
    :key="index"
    :cube="cube"
    :isValidPrompt="isValidPromptToLeft(cube.y)"
    :background="addCubeColor"
    @prompCubeClick="addToLeftCube(cube.y)"
    isPrompt
    isToLeft
  >
    <span class="cube-slideway" :style="cubeSlidewayToLeftStyle"></span>
  </ChessBoardCube>

  <ChessBoardCube
    v-for="(cube, index) of toRightCubes"
    :key="index"
    :cube="cube"
    :isValidPrompt="isValidPromptToRight(cube.x)"
    :background="addCubeColor"
    @prompCubeClick="addToRightCube(cube.x)"
    isPrompt
  >
    <span class="cube-slideway" :style="cubeSlidewayToRightStyle"></span>
  </ChessBoardCube>
</template>

<script setup lang="ts">
import { CUBE_SIZE_PX, HALF_CUBE_SIZE_PX } from "../../util/constant";
import { cubeRowCount } from "../../util/cube";
import { getStore } from "../../store/store";
import { Location3d } from "vue";
import { ADD_TO_LEFT_CUBE, ADD_TO_RIGHT_CUBE } from "../../store/constant";

const store = getStore();
const addCubeColor = computed(() => store.state.addCubeColors[0]);
const cubeMap = computed(() => store.state.cubeMap);

const toLeftCubes = Array(cubeRowCount)
  .fill(undefined)
  .map((_, index) => {
    return { x: cubeRowCount, y: index, z: 0 };
  });

const cubeSlidewayToLeftStyle = {
  background: unref(addCubeColor),
  transform: `rotateX(-90deg) translate3D(0, -${HALF_CUBE_SIZE_PX}, ${CUBE_SIZE_PX})`,
  width: "100%",
  height: `${cubeRowCount + 1}00%`,
};

const toRightCubes = Array(cubeRowCount)
  .fill(undefined)
  .map((_, index) => {
    return { x: index, y: cubeRowCount, z: 0 };
  });

const cubeSlidewayToRightStyle = {
  background: unref(addCubeColor),
  transform: `rotateX(90deg) translate3D(0, -${HALF_CUBE_SIZE_PX}, -${CUBE_SIZE_PX})`,
  width: `${cubeRowCount + 1}00%`,
  height: "100%",
};

function addToLeftCube(y: number) {
  store.dispatch(ADD_TO_LEFT_CUBE, y);
}

function addToRightCube(x: number) {
  store.dispatch(ADD_TO_RIGHT_CUBE, x);
}

function isValidPrompt(createLocationFunc: (num: number) => Location3d) {
  return [cubeRowCount - 1, cubeRowCount - 2]
    .map(createLocationFunc)
    .some((location) => unref(cubeMap).get(location) === undefined);
}

function isValidPromptToLeft(y: number) {
  return isValidPrompt((x: number) => {
    return { x, y, z: 0 };
  });
}

function isValidPromptToRight(x: number) {
  return isValidPrompt((y: number) => {
    return { x, y, z: 0 };
  });
}
</script>

<style scoped lang="less">
.cube-slideway {
  position: absolute;
  transform-origin: top;
  filter: brightness(1.05);
  opacity: 0.2;
}
</style>

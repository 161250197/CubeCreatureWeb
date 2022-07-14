<template>
  <Cube
    v-for="cube of toLeftCubes"
    :key="cube.key"
    :cube="cube"
    :isValidPrompt="isValidPromptToLeft(cube.y)"
    :background="addCubeColor"
    @prompCubeClick="addToLeftCube(cube.y)"
    isPrompt
    isToLeft
  >
    <span class="cube-slideway" :style="cubeSlidewayToLeftStyle"></span>
  </Cube>

  <Cube
    v-for="cube of toRightCubes"
    :key="cube.key"
    :cube="cube"
    :isValidPrompt="isValidPromptToRight(cube.x)"
    :background="addCubeColor"
    @prompCubeClick="addToRightCube(cube.x)"
    isPrompt
  >
    <span class="cube-slideway" :style="cubeSlidewayToRightStyle"></span>
  </Cube>
</template>

<script setup lang="ts">
import { CUBE_SIZE_PX, HALF_CUBE_SIZE_PX } from "../../util/constant";
import { createCube, cubeRowCount, defaultCubeColor } from "../../util/cube";

// TODO
const addCubeColor = computed(() => defaultCubeColor);

const toLeftCubes = Array(cubeRowCount)
  .fill(undefined)
  .map((_, index) => {
    const x = cubeRowCount;
    const y = index;
    const z = 0;
    return createCube(x, y, z);
  });

const cubeSlidewayToLeftStyle = {
  background: addCubeColor.value,
  transform: `rotateX(-90deg) translate3D(0, -${HALF_CUBE_SIZE_PX}, ${CUBE_SIZE_PX})`,
  width: "100%",
  height: `${cubeRowCount + 1}00%`,
};

const toRightCubes = Array(cubeRowCount)
  .fill(undefined)
  .map((_, index) => {
    const x = index;
    const y = cubeRowCount;
    const z = 0;
    return createCube(x, y, z);
  });

const cubeSlidewayToRightStyle = {
  background: addCubeColor.value,
  transform: `rotateX(90deg) translate3D(0, -${HALF_CUBE_SIZE_PX}, -${CUBE_SIZE_PX})`,
  width: `${cubeRowCount + 1}00%`,
  height: "100%",
};

function addToLeftCube(y: number) {
  console.log("TODO addToLeftCube", y);
}

function addToRightCube(x: number) {
  console.log("TODO addToRightCube", x);
}

function isValidPromptToLeft(y: number) {
  // TODO
  return true;
}

function isValidPromptToRight(x: number) {
  // TODO
  return true;
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

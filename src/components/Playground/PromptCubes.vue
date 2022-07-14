<template>
  <Cube
    v-for="cube of toLeftCubes"
    :key="cube.key"
    :cube="cube"
    :isHoverShow="isValidToLeft(cube.y)"
    :background="addCubeColor"
    @cubeClick="addToLeftCube(cube.y)"
    isHide
    isToLeft
  >
    <span class="cube-slideway" :style="cubeSlidewayToLeftStyle"></span>
  </Cube>

  <Cube
    v-for="cube of toRightCubes"
    :key="cube.key"
    :cube="cube"
    :isHoverShow="isValidToRight(cube.x)"
    :background="addCubeColor"
    @cubeClick="addToRightCube(cube.x)"
    isHide
  >
    <span class="cube-slideway" :style="cubeSlidewayToRightStyle"></span>
  </Cube>
</template>

<script setup lang="ts">
import { CUBE_SIZE } from "../../util/constant";
import {
  createCube,
  cubeRowCount,
  defaultCubeColor,
  pxSuffix,
} from "../../util/cube";

const CUBE_SIZE_PX = pxSuffix(CUBE_SIZE);
const HALF_CUBE_SIZE_PX = pxSuffix(CUBE_SIZE / 2);

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

function isValidToLeft(y: number) {
  // TODO
  return true;
}

function isValidToRight(x: number) {
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

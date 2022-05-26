<template>
  <div class="cube" :style="{ left, top, zIndex }">
    <span class="face front" :style="{ background: color }"></span>
    <span class="face left" :style="{ background: color }"></span>
    <span class="face top" :style="{ background: color }"></span>
  </div>
</template>

<script setup lang="ts">
import { Cube } from 'vue';
import { cubeRowCount } from '../../util/cube';
const props = defineProps({
  cube: Object // 暂时不支持复杂对象类型
});
const cube = (props.cube) as Cube;

const { x, y, z, color } = cube;
const left = pxSuffix(calLeft());
const top = pxSuffix(calTop());
const zIndex = x * cubeRowCount * cubeRowCount + y * cubeRowCount + z;

function pxSuffix(num: number) {
  return `${ num }px`;
}

function calLeft() {
  const xRange = 19;
  const yRange = 35;
  return 400 + xRange * (x - 1) - yRange * (y - 1);
}

function calTop() {
  const xRange = 12;
  const yRange = 6.5;
  const zRange = 38;
  return 400 + xRange * (x - 1) + yRange * (y - 1) - zRange * (z - 1);
}
</script>

<style scoped lang="less">
@size: 40px;

.cube {
  width: @size;
  height: @size;
  transform-style: preserve-3d;
  transform: rotate3d(1, 0, 0, 340deg) rotate3d(0, 1, 0, 30deg);
  position: absolute;

  .face {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    box-shadow: lightgrey -1px -1px 1px 0px;
    opacity: 0.8;
  }

  .front {
    transform: translateZ((@size / 2));
  }

  .left {
    transform: rotateY(-90deg) translateZ((@size / 2));
    filter: brightness(1.05);
  }

  .top {
    transform: rotateX(90deg) translateZ((@size / 2));
    filter: brightness(0.9);
  }
}
</style>

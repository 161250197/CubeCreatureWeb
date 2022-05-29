<template>
  <div class="cube" :style="{ left, top, zIndex }" :class="{ 'prompt': isPromptCube }">
    <span class="face front" :style="{ background }"></span>
    <span class="face left" :style="{ background }"></span>
    <span class="face top" :style="{ background }"></span>
  </div>
</template>

<script setup lang="ts">
import { Cube } from 'vue';
import { CubeState } from '../../util/constant';
import { cubeRowCount } from '../../util/cube';
const props = defineProps({
  cube: Object, // 暂时不支持复杂对象类型
});

const left = computed(() => {
  const { x, y } = (props.cube) as Cube;
  const xRange = 19;
  const yRange = 35;
  const left = 400 + xRange * x - yRange * y;
  return pxSuffix(left);
});

const top = computed(() => {
  const { x, y, z } = (props.cube) as Cube;
  const xRange = 12;
  const yRange = 6.5;
  const zRange = 38;
  const top = 400 + xRange * x + yRange * y - zRange * z;
  return pxSuffix(top);
});

const background = computed(() => ((props.cube) as Cube).color);
const isPromptCube = computed(() => ((props.cube) as Cube).state === CubeState.prompt);

const zIndex = computed(() => {
  const { x, y, z } = (props.cube) as Cube;
  return x * cubeRowCount * cubeRowCount + y * cubeRowCount + z;
});

function pxSuffix(num: number) {
  return `${ num }px`;
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

  &.prompt {
    z-index: 1000 !important;

    .face {
      opacity: 0.5;
      filter: brightness(1.5);
    }
  }

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

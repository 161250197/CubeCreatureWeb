<template>
  <div
    class="cube"
    :style="{
      zIndex,
      transform: transformCube,
      width: CUBE_SIZE_PX,
      height: CUBE_SIZE_PX,
    }"
    :class="{
      prompt: cube.isPromptDev,
      selected: cube.isSelectedDev,
      'to-delete': isToDelete,
      'is-prompt': isPrompt,
      'is-valid-prompt': isValidPrompt,
      [`transition-${cube.moveDistance}`]: cube.moveDistance,
    }"
    @click="onCubeClick"
  >
    <span
      class="face front"
      :style="{ background, transform: transformFront }"
    ></span>
    <span
      class="face left"
      :style="{ background, transform: transformLeft }"
    ></span>
    <span
      class="face top"
      :style="{ background, transform: transformTop }"
    ></span>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { Cube } from "vue";
import { cubeRowCount } from "../../util/cube";
import {
  CUBE_SIZE,
  pxSuffix,
  CUBE_SIZE_PX,
  HALF_CUBE_SIZE_PX,
} from "../../util/constant";

const props = defineProps({
  cube: Object, // 暂时不支持复杂对象类型
  /** 将要删除 */
  isToDelete: Boolean,
  isPrompt: Boolean,
  isValidPrompt: Boolean,
  background: String,
});

const emit = defineEmits<{
  (event: "prompCubeClick"): void;
}>();

const cube = computed(() => props.cube as Cube);

const background = computed(() => props.background || cube.value.color);

const zIndex = computed(() => {
  const { x, y, z } = cube.value;
  return x * cubeRowCount * cubeRowCount + y * cubeRowCount + z;
});

const transformCube = computed(() => {
  const { x, y, z } = cube.value;
  const transformX = pxSuffix(x * CUBE_SIZE);
  const transformY = pxSuffix(-y * CUBE_SIZE);
  const transformZ = pxSuffix(-z * CUBE_SIZE);
  return `translate3d(${transformY}, ${transformZ}, ${transformX})`;
});

const transformFront = `translateZ(${HALF_CUBE_SIZE_PX})`;
const transformLeft = `rotateY(-90deg) translateZ(${HALF_CUBE_SIZE_PX})`;
const transformTop = `rotateX(90deg) translateZ(${HALF_CUBE_SIZE_PX})`;

function onCubeClick() {
  const validPromptCubeClick = props.isPrompt && props.isValidPrompt;
  if (validPromptCubeClick) {
    emit("prompCubeClick");
  }
}
</script>

<style scoped lang="less">
.cube {
  transform-style: preserve-3d;
  position: absolute;

  .face {
    width: 100%;
    height: 100%;
    position: absolute;
    box-shadow: lightgrey -1px -1px 1px 0px, inset lightgrey -1px -1px 1px 0px;
    opacity: 0.8;

    &.left {
      filter: brightness(1.05);
    }

    &.top {
      filter: brightness(0.9);
    }
  }

  &.prompt {
    z-index: 1000 !important;

    .face {
      filter: brightness(1.5);
    }
  }

  &.selected {
    .face {
      opacity: 1;
      filter: brightness(0.8);
      box-shadow: lightgrey -1px -1px 10px 0px,
        inset lightgrey -1px -1px 1px 0px;
    }
  }

  &.prompt {
    .face {
      opacity: 0.5;
    }
  }

  &.to-delete {
    .face {
      animation: delete 0.5s linear 0s 1 forwards;
    }
  }

  &.is-prompt {
    cursor: pointer;
    opacity: 0;
    &.is-valid-prompt:hover {
      opacity: 1;
    }
  }
}

@keyframes delete {
  from {
    opacity: 0.8;
  }

  10% {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@maxDistance: 7;

each(range(@maxDistance), {
  @transitionName: e(%("transition-%s", @value));
  @time: e(%("%ss", (@value * 0.3)));

  .@{transitionName} {
    transition: all @time linear;
  }
});
</style>

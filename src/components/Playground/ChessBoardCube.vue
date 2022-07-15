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
    <CubeComponent :background="background" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { Cube } from "vue";
import { cubeRowCount } from "../../util/cube";
import { CUBE_SIZE, pxSuffix, CUBE_SIZE_PX } from "../../util/constant";

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

const background = computed(() => props.background || unref(cube).color);

const zIndex = computed(() => {
  const { x, y, z } = unref(cube);
  return x * cubeRowCount * cubeRowCount + y * cubeRowCount + z;
});

const transformCube = computed(() => {
  const { x, y, z } = unref(cube);
  const transformX = pxSuffix(x * CUBE_SIZE);
  const transformY = pxSuffix(-y * CUBE_SIZE);
  const transformZ = pxSuffix(-z * CUBE_SIZE);
  return `translate3d(${transformY}, ${transformZ}, ${transformX})`;
});

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

  &.prompt {
    z-index: 1000 !important;
  }

  &.is-prompt {
    cursor: not-allowed;
    opacity: 0;
    &.is-valid-prompt {
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
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

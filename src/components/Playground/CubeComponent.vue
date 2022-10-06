<template>
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
</template>

<script setup lang="ts">
import { HALF_CUBE_SIZE_PX } from "../../util/constant";

const props = defineProps({
  background: String,
});

const transformFront = `translateZ(${HALF_CUBE_SIZE_PX})`;
const transformLeft = `rotateY(-90deg) translateZ(${HALF_CUBE_SIZE_PX})`;
const transformTop = `rotateX(90deg) translateZ(${HALF_CUBE_SIZE_PX})`;
</script>

<style scoped lang="less">
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

// #region ChessBoardCube 外层 class
.prompt {
  .face {
    filter: brightness(1.5);
  }
}

.selected {
  .face {
    opacity: 1;
    filter: brightness(0.8);
    box-shadow: lightgrey -1px -1px 10px 0px, inset lightgrey -1px -1px 1px 0px;
  }
}

.prompt {
  .face {
    opacity: 0.5;
  }
}

@fadeFrameTime: 400 / 1000; /** 同 FADE_FRAME_TIME */

.to-delete {
  .face {
    animation: delete e(%("%ss", (@fadeFrameTime))) linear 0s 1 forwards;
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

.to-show {
  .face {
    animation: show e(%("%ss", (@fadeFrameTime))) linear 0s 1 forwards;
  }
}

@keyframes delete {
  from {
    opacity: 0.2;
  }

  10% {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
// #endregion
</style>

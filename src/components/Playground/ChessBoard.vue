<template>
  <span
    class="chess-board"
    :style="{
      width: chessBoardSideLength,
      height: chessBoardSideLength,
      transform,
      borderWidth,
      borderRadius,
    }"
  >
    <template v-for="row of cubeRowCountPlusOne" :key="row">
      <span
        v-for="col of cubeRowCountPlusOne"
        :key="col"
        :style="{
          width: CUBE_SIZE_PX,
          height: CUBE_SIZE_PX,
        }"
        class="chess-board-grid"
        :class="{ even: (row + col) & 1 }"
      ></span>
    </template>
  </span>
  <span
    class="inner-chess-board"
    :style="{
      width: innerChessBoardSideLength,
      height: innerChessBoardSideLength,
      transform,
      borderWidth,
    }"
  ></span>
</template>

<script setup lang="ts">
import {
  CUBE_SIZE,
  CUBE_SIZE_PX,
  pxSuffix,
  CHESS_BOARD_BORDER_WIDTH,
} from "../../util/constant";
import { cubeRowCount } from "../../util/cube";

const cubeRowCountPlusOne = cubeRowCount + 1;

const borderWidth = pxSuffix(CHESS_BOARD_BORDER_WIDTH);
const borderRadius = [0, borderWidth, CUBE_SIZE_PX].join(" ");
const chessBoardSideLength = pxSuffix(cubeRowCountPlusOne * CUBE_SIZE);
const innerChessBoardSideLength = pxSuffix(cubeRowCount * CUBE_SIZE);
const transform = [
  `translate3d(
    ${pxSuffix(CUBE_SIZE + CHESS_BOARD_BORDER_WIDTH)},
    ${CUBE_SIZE_PX},
    -${pxSuffix(CUBE_SIZE / 2 + CHESS_BOARD_BORDER_WIDTH)}
  )`,
  "rotateX(90deg)",
  "rotateZ(90deg)",
].join(" ");
</script>

<style scoped lang="less">
.inner-chess-board,
.chess-board {
  position: absolute;
  transform-origin: top left;
  border-style: double;
}

.chess-board {
  display: flex;
  flex-wrap: wrap;
  border-color: lightgray;

  .chess-board-grid.even {
    background: lightgray;
  }
}

.inner-chess-board {
  border-color: #409eff;
  border-style: none solid solid none;
}
</style>

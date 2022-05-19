<template>
  <!-- TODO 调整方块位置 -->
  <span>{{ cube }}</span>
  <div class="cube" :style="cubeStyle">
    <span class="face front"></span>
    <span class="face left"></span>
    <span class="face top"></span>
  </div>
  <!-- 手动调整透视效果 -->
  <!-- <div class="playground" data-v-706bbcae="" style="--size: 40px; --halfSize: 20px; display: none;">
    <div class="cube" data-v-61cbc5a9="" data-v-706bbcae="" style="--background: rgb(64, 158, 255);"><span
        class="face front" data-v-61cbc5a9=""></span><span class="face left" data-v-61cbc5a9=""></span><span
        class="face top" data-v-61cbc5a9=""></span></div>
    <div class="cube" data-v-61cbc5a9="" data-v-706bbcae="" style="--background: rgb(64, 158, 255);left: 221px;
    top: 213px;
    transform: rotate3d(1, 0, 0, 340deg) rotate3d(0, 1, 0, 30deg) scale3d(1.05, 1.05, 1.05);"><span class="face front"
        data-v-61cbc5a9=""></span><span class="face left" data-v-61cbc5a9=""></span><span class="face top"
        data-v-61cbc5a9=""></span></div>
    <div class="cube" data-v-61cbc5a9="" data-v-706bbcae="" style="--background: rgb(64, 158, 255);left: 241px;
    top: 225px;
    transform: rotate3d(1, 0, 0, 340deg) rotate3d(0, 1, 0, 30deg) scale3d(1.1, 1.1, 1.1);"><span class="face front"
        data-v-61cbc5a9=""></span><span class="face left" data-v-61cbc5a9=""></span><span class="face top"
        data-v-61cbc5a9=""></span></div>
    <div class="cube" data-v-61cbc5a9="" data-v-706bbcae="" style="--background: rgb(64, 158, 255);left: 261px;
    top: 237px;
    transform: rotate3d(1, 0, 0, 340deg) rotate3d(0, 1, 0, 30deg) scale3d(1.15, 1.15, 1.15);"><span class="face front"
        data-v-61cbc5a9=""></span><span class="face left" data-v-61cbc5a9=""></span><span class="face top"
        data-v-61cbc5a9=""></span></div>
    <div class="cube" data-v-61cbc5a9="" data-v-706bbcae="" style="--background: rgb(64, 158, 255);/* display: none; */left: 284px;
    top: 250px;
    transform: rotate3d(1, 0, 0, 340deg) rotate3d(0, 1, 0, 30deg) scale3d(1.2, 1.2, 1.2);"><span class="face front"
        data-v-61cbc5a9=""></span><span class="face left" data-v-61cbc5a9=""></span><span class="face top"
        data-v-61cbc5a9=""></span></div>
    <div class="cube" data-v-61cbc5a9="" data-v-706bbcae="" style="--background: rgb(64, 158, 255);left: 309px;top: 265px;
    transform: rotate3d(1, 0, 0, 340deg) rotate3d(0, 1, 0, 30deg) scale3d(1.25, 1.25, 1.25);/* display: none; */"><span
        class="face front" data-v-61cbc5a9=""></span><span class="face left" data-v-61cbc5a9=""></span><span
        class="face top" data-v-61cbc5a9=""></span></div>
    <div class="cube" data-v-61cbc5a9="" data-v-706bbcae=""
      style="--background: rgb(64, 158, 255);left: 334px;top: 280px;transform: rotate3d(1, 0, 0, 340deg) rotate3d(0, 1, 0, 30deg) scale3d(1.3, 1.3, 1.3);/* display: none; */">
      <span class="face front" data-v-61cbc5a9=""></span><span class="face left" data-v-61cbc5a9=""></span><span
        class="face top" data-v-61cbc5a9=""></span></div>
  </div> -->
</template>

<script setup lang="ts">
import { Cube } from 'vue';
const props = defineProps({
  cube: Object // 暂时不支持复杂对象类型
});
const cube = (props.cube) as Cube;
// const color = ref("rgb(64, 158, 255)");
// TODO 位置 使用 less 生成 7 * 7 * 7 个类？
const cubeStyle = `--background: ${ cube.color };`;
</script>

<style scoped lang="less">
.cube {
  width: var(--size);
  height: var(--size);
  transform-style: preserve-3d;
  transform: rotate3d(1, 0, 0, 340deg) rotate3d(0, 1, 0, 30deg);
  position: absolute;
  left: 200px;
  top: 200px;
  perspective: 800px;

  .face {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    background: var(--background);
    box-shadow: lightgrey -1px -1px 1px 0px;
    // TODO 一格 0.25s
    transition: all 1.5s linear;
  }

  .front {
    transform: translateZ(var(--halfSize));
  }

  .left {
    transform: rotateY(-90deg) translateZ(var(--halfSize));
    filter: brightness(1.05);
  }

  .top {
    transform: rotateX(90deg) translateZ(var(--halfSize));
    filter: brightness(0.9);
  }
}
</style>

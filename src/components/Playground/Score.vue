<template>
  <div class="score-wrapper">
    <span>第{{ level }}关</span>
    <span>当前分数：{{ score }}</span>
    <span>分数倍率：× {{ scoreMultiple }}</span>
    <span class="prompt">连续消除来增加分数倍率吧！</span>

    <audio preload="none" data-time="1">
      <source
        src="https://img-cdn2.yespik.com/sound/00/27/10/69/271069_a800f35556edbb35170ecc874cf914e3.mp3"
        type="audio/mpeg"
      />
    </audio>
  </div>
</template>

<script setup lang="ts">
import { getStore } from "../../store/store";

const store = getStore();
const level = computed(() => store.state.level);
const score = computed(() => store.state.score);
const scoreMultiple = computed(() => store.state.scoreMultiple);
</script>

<style scoped lang="less">
.score-wrapper {
  position: fixed;
  right: 25px;
  bottom: 25px;
  font-size: 18px;
  line-height: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .prompt {
    font-size: 16px;
    margin-top: 5px;
    font-weight: lighter;
  }
}
</style>

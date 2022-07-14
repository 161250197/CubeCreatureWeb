<template>
  <div class="full-screen" @dblclick="changeGameModeDev">
    <Playground />
  </div>
</template>

<script lang="ts" setup>
import { SET_GAME_MODE } from "../../store/mutation-types";
import { getStore } from "../../store/store";
import { GameMode } from "../../util/constant";
const store = getStore();

function changeGameModeDev() {
  store.commit(SET_GAME_MODE, GameMode.dev);
}
</script>

<style scoped lang="less">
.full-screen {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="full-screen" @dblclick="changeGameModeDev">
    <Playground />
  </div>
</template>

<script lang="ts" setup>
import { ADD_DEFAULT_CUBES, SET_GAME_MODE } from "../../store/constant";
import { getStore } from "../../store/store";
import { GameMode } from "../../util/constant";
const store = getStore();
const cubeCount = computed(() => store.state.cubes.length)

function changeGameModeDev() {
  store.commit(SET_GAME_MODE, GameMode.dev);
}

function checkEmpty() {
  if (cubeCount.value === 0) {
    store.dispatch(ADD_DEFAULT_CUBES)
  }
}

onMounted(checkEmpty)
</script>

<style scoped lang="less"></style>

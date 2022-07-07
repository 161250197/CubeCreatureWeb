<template>
  <HelloWorld v-if="gameMode === GameMode.helloWorld" />
  <template v-else-if="gameMode === GameMode.dev">
    <Playground />
    <DevTools />
  </template>
  <Game v-else-if="gameMode === GameMode.game" />
  <Cover />
</template>

<script setup lang="ts">
import { getStore } from './store/store';
import { GameMode } from './util/constant'; 

const store = getStore();
const gameMode = computed(() => store.state.gameMode);
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  position: fixed;
  user-select: none;
}
</style>

<template>
  <HelloWorld v-if="isHelloWorldMode" />
  <template v-else>
    <Playground />
    <DevTools v-if="isDevMode" />
    <Game v-else />
  </template>
  <Cover />
</template>

<script setup lang="ts">
import { getStore } from "./store/store";

const store = getStore();
const isHelloWorldMode = computed(() => store.getters.isHelloWorldMode);
const isDevMode = computed(() => store.getters.isDevMode);
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

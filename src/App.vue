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
  min-width: 1500px;
  height: 100%;
  margin: 0;
  position: absolute;
  user-select: none;
}
</style>

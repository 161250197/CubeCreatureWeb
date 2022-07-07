<template>
  <div class="wrapper">
    <span class="label">X</span>
    <el-slider v-model="x" :step="step" :min="min" :max="max" show-stops show-input @input="updateAddCube" />
  </div>
  <div class="wrapper">
    <span class="label">Y</span>
    <el-slider v-model="y" :step="step" :min="min" :max="max" show-stops show-input @input="updateAddCube" />
  </div>
  <div class="wrapper">
    <span class="label">Z</span>
    <el-slider v-model="z" :step="step" :min="min" :max="max" show-stops show-input @input="updateAddCube" />
  </div>
  <div class="wrapper">
    <span class="label color-label">颜色</span>
    <div class="color-wrapper">
      <el-button v-for="color of cubeColors" :key="color" :color="color" size="large" circle @click="onSelectedColorChange(color)">
        <template #icon v-if="color === selectedColor">
          <el-icon :size="20">
            <Check />
          </el-icon>
        </template>
      </el-button>
    </div>
  </div>
  <el-divider />
  <div class="wrapper">
    <el-button v-if="invalidPosition" type="warning" size="large" disabled plain>该位置上已有方块</el-button>
    <el-button v-else type="primary" size="large" @click="onAddClick">添加方块</el-button>
  </div>
</template>

<script setup lang="ts">
import { getStore } from '../../store/store';
import { ADD_CUDE, SET_ADD_CUBE } from '../../store/mutation-types';
import { createCube, cubeRowCount, cubeColors, defaultCubeColor } from '../../util/cube';
import { Check } from '@element-plus/icons-vue';

const step = 1;
const min = 0;
const max = cubeRowCount - 1;

const x = ref(0);
const y = ref(0);
const z = ref(0);

const selectedColor = ref(defaultCubeColor);

const store = getStore();
const invalidPosition = computed(() => store.getters.invalidPosition);

function updateAddCube() {
  const addCube = createCube(unref(x), unref(y), unref(z), unref(selectedColor), true);
  store.commit(SET_ADD_CUBE, addCube);
}

function onAddClick() {
  const newCube = createCube(unref(x), unref(y), unref(z), unref(selectedColor));
  store.commit(ADD_CUDE, newCube);
}

function onSelectedColorChange(color: string) {
  selectedColor.value = color;
  updateAddCube();
}
</script>

<style scoped lang="less">
.wrapper {
  display: flex;
  align-items: center;

  .label {
    font-size: 18px;
    font-weight: bolder;
    color: var(--el-text-color-secondary);
    line-height: 60px;
    margin-bottom: 0;
    width: 120px;
    white-space: nowrap;

    &.color-label {
      width: 100px;
    }
  }

  .color-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
  }
}
</style>

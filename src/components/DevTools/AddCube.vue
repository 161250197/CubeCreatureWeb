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
      <span v-for="color of cubeColors" class="color-span" :style="{ background: color }"
        :class="{ selected: color === selectedColor }" @click="onSelectedColorChange(color)">
        <el-icon :size="25" color="lightgrey">
          <Check />
        </el-icon>
      </span>
    </div>
  </div>
  <el-divider />
  <div class="wrapper">
    <el-button v-if="invalidPosition" type="warning" size="large" disabled plain>该位置上已有方块</el-button>
    <el-button v-else type="primary" size="large" @click="onAddClick">添加方块</el-button>
  </div>
</template>

<script setup lang="ts">
import { Cube } from 'vue';
import { getStore } from '../../store';
import { ADD_CUDE, SET_ADD_CUBE } from '../../store/mutation-types';
import { createCube, cubeRowCount, cubeColors, defaultCubeColor } from '../../util/cube';

const step = 1;
const min = 1;
const max = cubeRowCount;

const x = ref(1);
const y = ref(1);
const z = ref(1);

const selectedColor = ref(defaultCubeColor);

const store = getStore();
const invalidPosition = computed(() => store.getters.invalidPosition);

function updateAddCube() {
  const addCubePosition: Cube = {
    x: unref(x) - 1,
    y: unref(y) - 1,
    z: unref(z) - 1,
    color: unref(selectedColor)
  };
  store.commit(SET_ADD_CUBE, addCubePosition);
}

function onAddClick() {
  const newCube = createCube(unref(x) - 1, unref(y) - 1, unref(z) - 1, unref(selectedColor));
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

    &.invalid-warning {
      margin-left: 20px;
      width: auto;
    }
  }

  .el-slider {
    margin-top: 0;
  }

  .color-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;

    .color-span {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      box-sizing: border-box;
      cursor: pointer;
      margin: 0 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      .el-icon {
        display: none;
      }

      &.selected {
        border: 2px solid lightgrey;

        .el-icon {
          display: block;
        }
      }
    }
  }
}
</style>

<template>
  <div class="wrapper">
    <span class="label">X</span>
    <el-slider v-model="x" :step="step" :min="min" :max="max" show-stops show-input />
  </div>
  <div class="wrapper">
    <span class="label">Y</span>
    <el-slider v-model="y" :step="step" :min="min" :max="max" show-stops show-input />
  </div>
  <div class="wrapper">
    <span class="label">Z</span>
    <el-slider v-model="z" :step="step" :min="min" :max="max" show-stops show-input />
  </div>
  <div class="wrapper">
    <span class="label color-label">颜色</span>
    <div class="color-wrapper">
      <span v-for="color of colors" class="color-span" :style="{ background: color }"
        :class="{ selected: color === selectedColor }" @click="selectedColor = color">
        <el-icon :size="25" color="lightgrey">
          <Check />
        </el-icon>
      </span>
    </div>
  </div>
  <el-divider />
  <div class="wrapper">
    <el-button v-if="invalidPosition(x, y, z)" type="warning" size="large" disabled plain>该位置上已有方块</el-button>
    <el-button v-else type="primary" size="large" @click="onAddClick">添加方块</el-button>
  </div>
</template>

<script setup lang="ts">
const step = ref(1);
const min = ref(1);
const max = ref(7);
const x = ref(1);
const y = ref(1);
const z = ref(1);
const colors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#B13DA0'];
const selectedColor = ref(colors[0]);
function onAddClick() {
  // TODO
  console.log('test');
}
function invalidPosition(x: number, y: number, z: number) {
  // TODO
  console.log(x, y, z);
  return x === 2;
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

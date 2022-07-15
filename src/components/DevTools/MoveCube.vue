<template>
  <el-table
    :data="cubes"
    empty-text="现在没有方块，先去添加方块吧"
    max-height="500"
    @cell-mouse-enter="onCellMouseEnter"
    @cell-mouse-leave="onCellMouseLeave"
  >
    <el-table-column label="x" width="50">
      <template #default="{ row }">
        <span>{{ row.x }}</span>
      </template>
    </el-table-column>
    <el-table-column label="y" width="50">
      <template #default="{ row }">
        <span>{{ row.y }}</span>
      </template>
    </el-table-column>
    <el-table-column label="z" width="50">
      <template #default="{ row }">
        <span>{{ row.z }}</span>
      </template>
    </el-table-column>
    <el-table-column label="颜色" width="80">
      <template #default="{ row }">
        <span :style="{ background: row.color }" class="color-tag"></span>
      </template>
    </el-table-column>
    <el-table-column label="移动方向">
      <template #default="{ row }">
        <el-select
          :model-value="row.moveDirection"
          :placeholder="MoveDirection.no"
          size="small"
          @change="(val) => onMoveDirectionChange(row, val)"
        >
          <el-option
            v-for="item in MoveDirection"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="移动距离">
      <template #default="{ row }">
        <el-input-number
          :model-value="row.moveDistance"
          :min="0"
          :max="7"
          :disabled="cubeNoMove(row)"
          size="small"
          @change="(val) => onMoveDistanceChange(row, val)"
        />
      </template>
    </el-table-column>
    <el-table-column label="延迟时间">
      <template #default="{ row }">
        <el-input-number
          :model-value="row.moveDelay"
          :min="0"
          :max="7"
          :disabled="cubeNoMove(row)"
          size="small"
          @change="(val) => onMoveDelayChange(row, val)"
        />
      </template>
    </el-table-column>
  </el-table>
  <el-divider />
  <el-button
    v-if="moveCubeCount"
    type="primary"
    size="large"
    @click="onRemoveClick"
    >移动 {{ moveCubeCount }} 个方块
  </el-button>
  <el-button v-else type="warning" size="large" disabled plain
    >请先选择要移动的方块</el-button
  >
</template>

<script setup lang="ts">
import { Cube } from "vue";
import {
  SET_CUBE_IS_PROMPT_DEV,
  MOVE_CUBES_ACTION,
  SET_CUBE_MOVE_DIRECTION,
  SET_CUBE_MOVE_DISTANCE,
  SET_CUBE_MOVE_DELAY,
} from "../../store/constant";
import { getStore } from "../../store/store";
import { MoveDirection } from "../../util/constant";

const store = getStore();

function onCellMouseEnter(cube: Cube) {
  store.commit(SET_CUBE_IS_PROMPT_DEV, { cube, isPromptDev: true });
}

function onCellMouseLeave(cube: Cube) {
  store.commit(SET_CUBE_IS_PROMPT_DEV, { cube, isPromptDev: false });
}

const cubes = computed(() => store.state.cubes);
const moveCubes = computed(() =>
  store.state.cubes.filter((cube) => !cubeNoMove(cube))
);
const moveCubeCount = computed(() => unref(moveCubes).length);

function onRemoveClick() {
  store.dispatch(MOVE_CUBES_ACTION, unref(moveCubes));
}

function onMoveDirectionChange(cube: Cube, moveDirection: MoveDirection) {
  store.commit(SET_CUBE_MOVE_DIRECTION, { cube, moveDirection });
}

function onMoveDistanceChange(cube: Cube, moveDistance?: number) {
  store.commit(SET_CUBE_MOVE_DISTANCE, { cube, moveDistance });
}

function onMoveDelayChange(cube: Cube, moveDelay?: number) {
  store.commit(SET_CUBE_MOVE_DELAY, { cube, moveDelay });
}

function cubeNoMove(cube: Cube) {
  return cube.moveDirection === MoveDirection.no;
}
</script>

<style scoped lang="less">
.color-tag {
  padding: 0 24px;
  height: 24px;
}
</style>

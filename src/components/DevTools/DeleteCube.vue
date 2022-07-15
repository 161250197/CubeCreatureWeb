<template>
  <el-table
    :data="cubes"
    empty-text="现在没有方块，先去添加方块吧"
    max-height="500"
    @selection-change="handleSelectionChange"
    @cell-mouse-enter="onCellMouseEnter"
    @cell-mouse-leave="onCellMouseLeave"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column label="x">
      <template #default="{ row }">
        <span>{{ row.x }}</span>
      </template>
    </el-table-column>
    <el-table-column label="y">
      <template #default="{ row }">
        <span>{{ row.y }}</span>
      </template>
    </el-table-column>
    <el-table-column label="z">
      <template #default="{ row }">
        <span>{{ row.z }}</span>
      </template>
    </el-table-column>
    <el-table-column label="颜色">
      <template #default="{ row }">
        <span :style="{ background: row.color }" class="color-tag"></span>
      </template>
    </el-table-column>
  </el-table>
  <el-divider />
  <el-button
    v-if="deleteCubeCount"
    type="primary"
    size="large"
    @click="onRemoveClick"
    >删除 {{ deleteCubeCount }} 个方块
  </el-button>
  <el-button v-else type="warning" size="large" disabled plain
    >请先选择要删除的方块</el-button
  >
</template>

<script setup lang="ts">
import { Cube } from "vue";
import {
  SET_CUBE_IS_PROMPT_DEV,
  SET_CUBES_IS_SELECTED_DEV,
  DELETE_CUBES_ACTION,
} from "../../store/constant";
import { getStore } from "../../store/store";

const store = getStore();
const cubes = computed(() => store.state.cubes);
const deleteCubes = ref<Cube[]>([]);
const deleteCubeCount = computed(() => deleteCubes.value.length);

function onRemoveClick() {
  store.dispatch(DELETE_CUBES_ACTION, deleteCubes.value);
}

function handleSelectionChange(selectedCubes: Cube[]) {
  deleteCubes.value = selectedCubes;
  store.commit(SET_CUBES_IS_SELECTED_DEV, selectedCubes);
}

function onCellMouseEnter(cube: Cube) {
  store.commit(SET_CUBE_IS_PROMPT_DEV, { cube, isPromptDev: true });
}

function onCellMouseLeave(cube: Cube) {
  store.commit(SET_CUBE_IS_PROMPT_DEV, { cube, isPromptDev: false });
}
</script>

<style scoped lang="less">
.color-tag {
  padding: 0 24px;
  height: 24px;
}
</style>

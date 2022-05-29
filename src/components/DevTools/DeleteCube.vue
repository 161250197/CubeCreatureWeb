<template>
  <el-table :data="cubes" style="width: 100%" empty-text="现在没有方块，先去添加方块吧" @selection-change="handleSelectionChange"
    @cell-mouse-enter="onCellMouseEnter" @cell-mouse-leave="onCellMouseLeave">
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
    <el-table-column label="颜色" width="180">
      <template #default="{ row }">
        <span :style="{ background: row.color }" class="color-tag"></span>
      </template>
    </el-table-column>
  </el-table>
  <el-divider />
  <div class="wrapper" v-if="deleteCubeCount">
    <el-button type="primary" size="large" @click="onRemoveClick">删除 {{ deleteCubeCount }} 个方块</el-button>
  </div>
</template>

<script setup lang="ts">
import { Cube } from 'vue';
import { SET_CUBE_STATE_BASE, SET_CUBE_STATE_PROMPT } from '../../store/mutation-types';
import { getStore } from '../../store/store';

const store = getStore();
const cubes = computed(() => store.state.cubes);
const deleteCubes = ref<Cube[]>([]);
const deleteCubeCount = computed(() => deleteCubes.value.length);

function onRemoveClick() {
  // TODO
  console.log('onRemoveClick');
}

function handleSelectionChange(selectedCubes: Cube[]) {
  deleteCubes.value = selectedCubes;
}

function onCellMouseEnter(row: Cube) {
  store.commit(SET_CUBE_STATE_PROMPT, row);
}

function onCellMouseLeave(row: Cube) {
  store.commit(SET_CUBE_STATE_BASE, row);
}
</script>


<style scoped lang="less">
.color-tag {
  padding: 0 24px;
  height: 24px;
}
</style>

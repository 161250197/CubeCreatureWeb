<template>
  <el-tabs model-value="0" class="dev-tools-tabs">
    <!-- @tab-click="handleClick"> -->
    <el-tab-pane label="添加">
      <AddCube />
    </el-tab-pane>
    <el-tab-pane label="删除">
      <DeleteCube />
    </el-tab-pane>
    <el-tab-pane label="滑动">
      <MoveCube />
    </el-tab-pane>
  </el-tabs>
  <!-- <span>count: {{ count }}</span> -->
</template>
<script lang="ts" setup>
// import type { TabsPaneContext } from 'element-plus';
// import AddCube from './AddCube.vue';
// import { STORE_KEY } from '../../store';
// import { INCREMENT } from '../../store/mutation-types';

// const store = useStore(STORE_KEY);
// const count = computed(() => store.state.count);

// const activeName = ref('first');

// const handleClick = (tab: TabsPaneContext, event: Event) => {
//   console.log(tab, event);
//   // store.commit(INCREMENT);
// };
</script>

<style scoped lang="less">
.dev-tools-tabs {
  width: 50%;
  height: 100%;
  position: fixed;
  right: 0;
  padding: 0 20px;
  box-sizing: border-box;
  border-left: 2px solid var(--el-border-color-light);
}
</style>

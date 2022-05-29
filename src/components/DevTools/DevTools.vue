<template>
  <el-tabs model-value="0" class="dev-tools-tabs" @tab-click="handleClick">
    <el-tab-pane :label="DevToolTabs.add">
      <AddCube />
    </el-tab-pane>
    <el-tab-pane :label="DevToolTabs.remove">
      <DeleteCube />
    </el-tab-pane>
    <el-tab-pane :label="DevToolTabs.move">
      <MoveCube />
    </el-tab-pane>
  </el-tabs>
  <!-- <span>count: {{ count }}</span> -->
</template>
<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus';
import { DevToolTabs } from '../../util/constant';
import { getStore } from '../../store/store';
import { SET_DEV_TOOL_TAB } from '../../store/mutation-types';

const store = getStore();

const handleClick = (tab: TabsPaneContext) => {
  store.commit(SET_DEV_TOOL_TAB, tab.props.label);
};
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

<template>
  <Playground />
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

    <el-tab-pane :label="DevToolTabs.kawaiMode" />
    <el-tab-pane :label="DevToolTabs.gameMode" />
  </el-tabs>
</template>

<script lang="ts" setup>
import type { TabsPaneContext } from "element-plus";
import { DevToolTabs, GameMode } from "../../util/constant";
import { getStore } from "../../store/store";
import { SET_DEV_TOOL_TAB, SET_GAME_MODE } from "../../store/constant";

const store = getStore();

const handleClick = (tab: TabsPaneContext) => {
  const tabLabel = tab.props.label;
  switch (tabLabel) {
    case DevToolTabs.gameMode:
      store.commit(SET_GAME_MODE, GameMode.game);
      return;
    case DevToolTabs.kawaiMode:
      store.commit(SET_GAME_MODE, GameMode.helloWorld);
      return;
    default:
      store.commit(SET_DEV_TOOL_TAB, tabLabel);
  }
};
</script>

<style scoped lang="less">
.dev-tools-tabs {
  width: 50%;
  height: 100%;
  position: absolute;
  right: 0;
  padding: 0 20px;
  box-sizing: border-box;
  border-left: 2px solid var(--el-border-color-light);
  :deep(.el-tabs__nav) {
    width: 100%;

    // 跳转其他模式
    #tab-3,
    #tab-4 {
      float: right;
    }
  }
}
</style>

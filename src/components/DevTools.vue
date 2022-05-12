<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="User" name="first">User</el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
  </el-tabs>
  <span>count: {{ count }}</span>
</template>
<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus';
import { STORE_KEY } from '../store';
import { INCREMENT } from '../store/mutation-types';

const activeName = ref('first');
const store = useStore(STORE_KEY);
const count = computed(() => store.state.count);


const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
  store.commit(INCREMENT);
};
</script>
<style>
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>

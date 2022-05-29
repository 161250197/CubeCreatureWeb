/** 方块状态 */
export enum CubeState {
  /** 基本状态 */
  base, //  
  /** 
   * 提示状态
   * - 如将要 添加、选中 的方块
   */
  prompt,
}

/** 开发工具标签页 */
export enum DevToolTabs {
  add = '添加',
  remove = '删除',
  move = '滑动',
}

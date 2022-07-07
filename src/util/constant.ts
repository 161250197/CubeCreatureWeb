/** 开发工具标签页 */
export enum DevToolTabs {
  add = '添加',
  remove = '删除',
  move = '滑动',
  jumpToGameMode = '跳转游戏模式',
}

/** 移动方向 */
export enum MoveDirection {
  no = '不移动',
  right = '向右移动',
  left = '向左移动',
  down = '向下移动',
}

/** 游戏模式 */
export enum GameMode {
  helloWorld = '你好！世界',
  dev = '调试模式',
  game = '游戏模式',
}

/** 移动动画时长 */
export const MOVE_FRAME_TIME = 300;
/** 消失动画时长 */
export const FADE_FRAME_TIME = 500;

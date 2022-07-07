import { Cube } from "vue";
import { MoveDirection } from "./constant";

export function createCube(x: number, y: number, z: number, color: string, isPrompt = false, moveDirection = MoveDirection.no) {
  const newCube: Cube = {
    x, y, z, color, isPrompt, isSelected: false, moveDirection, moveDistance: 0, moveDelay: 0,
    key() { return [x, y, z].join('-'); }
  };
  return newCube;
}

/** 每行/列/高 上有几个方块 */
export const cubeRowCount = 7;

/** 方块颜色 */
export const cubeColors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#B13DA0'];
export const defaultCubeColor = cubeColors[0];

/** 默认添加方块位置 */
export const defaultAddCube: Cube = createCube(0, 0, 0, defaultCubeColor, true);

/** 创建方块标识 */
export function createCubeKey({ x, y, z }: Cube) {
  return [x, y, z].join('-');
}

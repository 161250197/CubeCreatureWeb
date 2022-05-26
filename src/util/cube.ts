import { Cube } from "vue";

export function createCube(x: number, y: number, z: number, color: string) {
  const newCube: Cube = { x, y, z, color };
  return newCube;
}

/** 每行/列/高 上有几个方块 */
export const cubeRowCount = 7;

/** 方块颜色 */
export const cubeColors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#B13DA0'];
export const defaultCubeColor = cubeColors[0];

/** 默认添加方块位置 */
export const defaultAddCube = {
  x: 0,
  y: 0,
  z: 0,
  color: defaultCubeColor
};

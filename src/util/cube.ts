import { Cube } from "vue";
import { CubeState } from "./constant";

export function createCube(x: number, y: number, z: number, color: string, state: CubeState = CubeState.base) {
  const newCube: Cube = { x, y, z, color, state };
  return newCube;
}

/** 每行/列/高 上有几个方块 */
export const cubeRowCount = 7;

/** 方块颜色 */
export const cubeColors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#B13DA0'];
export const defaultCubeColor = cubeColors[0];

/** 默认添加方块位置 */
export const defaultAddCube: Cube = {
  x: 0,
  y: 0,
  z: 0,
  color: defaultCubeColor,
  state: CubeState.prompt
};

/**
 * 查找方块 index
 * @param cube 
 * @param cubes 
 * @returns {number} 未找到返回 -1
 */
export function findCubeIndex(cube: Cube, cubes: Cube[]) {
  const { x, y, z } = cube;
  const cubeCount = cubes.length;
  for (let i = 0; i < cubeCount; i++) {
    const cube = cubes[i];
    if (cube.x === x && cube.y === y && cube.z === z) {
      return i;
    }
  }
  return -1;
}

/**
 * 查找方块 index
 * @param cube 
 * @param cubes 
 * @returns {Cube} 
 */
export function findCube(cube: Cube, cubes: Cube[]) {
  const cubeIndex = findCubeIndex(cube, cubes);
  return cubes[cubeIndex];
}

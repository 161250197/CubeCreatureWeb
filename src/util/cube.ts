import { Cube } from "vue";

export function createCube(x: number, y: number, z: number, color: string) {
  const newCube: Cube = { x, y, z, color };
  return newCube;
}

/** 每行/列/高 上有几个方块 */
export const cubeRowCount = 7;

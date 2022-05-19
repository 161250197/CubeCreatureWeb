import { Cube } from "vue";

export function createCube(x: number, y: number, z: number, color: string) {
  const newCube: Cube = { x, y, z, color };
  return newCube;
}

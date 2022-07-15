import { Cube, Location3d } from "vue";
import { MoveDirection } from "./constant";

export function createCube(
  x: number,
  y: number,
  z: number,
  color = defaultCubeColor,
  isPromptDev = false,
  moveDirection = MoveDirection.no
) {
  const newCube: Cube = {
    x,
    y,
    z,
    color,
    isPromptDev,
    isSelectedDev: false,
    moveDirection,
    moveDistance: 0,
    moveDelay: 0,
    key() {
      return [x, y, z].join("-");
    },
  };
  return newCube;
}

/** 每行/列/高 上有几个方块 */
export const cubeRowCount = 7;

/** 方块颜色 */
export const cubeColors = [
  "#409EFF",
  "#67C23A",
  "#E6A23C",
  "#F56C6C",
  "#B13DA0",
];
export const defaultCubeColor = cubeColors[0];

export function getRandomCubeColor() {
  const randomCubeColorIndex = Math.floor(Math.random() * cubeColors.length);
  return cubeColors[randomCubeColorIndex];
}

/** 默认添加方块位置 */
export const defaultAddCube: Cube = createCube(0, 0, 0, defaultCubeColor, true);

/** 创建方块标识 */
export function createCubeKey({ x, y, z }: Cube) {
  return [x, y, z].join("-");
}

const cubeRowCountPlusOne = cubeRowCount + 1;

export class CubeMap {
  private cubeMatrixs: Array<Array<Array<undefined | Cube>>>;
  constructor() {
    this.cubeMatrixs = Array(cubeRowCountPlusOne)
      .fill(undefined)
      .map(() =>
        Array(cubeRowCountPlusOne)
          .fill(undefined)
          .map(() => Array(cubeRowCountPlusOne).fill(undefined))
      );
  }
  remove({ x, y, z }: Location3d) {
    this.cubeMatrixs[x][y][z] = undefined;
  }
  set(cube: Cube) {
    const { x, y, z } = cube;
    this.cubeMatrixs[x][y][z] = cube;
  }
  get({ x, y, z }: Location3d) {
    return this.cubeMatrixs[x][y][z];
  }
  isEmpty(location: Location3d) {
    return this.get(location) === undefined;
  }
}

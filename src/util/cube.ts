import { Cube, Position3d } from "vue";
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
  remove({ x, y, z }: Position3d) {
    this.cubeMatrixs[x][y][z] = undefined;
  }
  set(cube: Cube) {
    const { x, y, z } = cube;
    this.cubeMatrixs[x][y][z] = cube;
  }
  get({ x, y, z }: Position3d) {
    return this.cubeMatrixs[x][y][z];
  }
  isEmpty(position: Position3d) {
    return this.get(position) === undefined;
  }
}

/** 计算方块滑动 */
export function calCubeMovement(cube: Cube, cubeMap: CubeMap) {
  const { x, y, z, moveDirection } = cube;

  /** 方块目的地 */
  const destination = { x, y, z };
  let moveDistance = 0;

  /** 被推动的方块 */
  let pushedCube: undefined | Cube = undefined;

  const { nextEmpty, next2Empty, next } = (function () {
    if (moveDirection === MoveDirection.left) {
      return {
        nextEmpty: function () {
          return (
            destination.x > 0 &&
            cubeMap.isEmpty({ ...destination, x: destination.x - 1 })
          );
        },
        next2Empty: function () {
          return (
            destination.x > 1 &&
            cubeMap.isEmpty({ ...destination, x: destination.x - 2 })
          );
        },
        next: function () {
          destination.x--;
          moveDistance++;
        },
      };
    } else {
      return {
        nextEmpty: function () {
          return (
            destination.y > 0 &&
            cubeMap.isEmpty({ ...destination, y: destination.y - 1 })
          );
        },
        next2Empty: function () {
          return (
            destination.y > 1 &&
            cubeMap.isEmpty({ ...destination, y: destination.y - 2 })
          );
        },
        next: function () {
          destination.y--;
          moveDistance++;
        },
      };
    }
  })();

  while (true) {
    if (nextEmpty()) {
      next();
    } else {
      if (next2Empty()) {
        next();
        pushedCube = cubeMap.get(destination); // 方块被推动了
      }
      break;
    }
  }

  return { pushedCube, moveDistance };
}

/** 方块消除要求 */
const deleteCubeThreshold = 3;

/** 计算方块消除 */
export function calDeleteCubes(moveCubes: Cube[], cubeMap: CubeMap) {
  const deleteCubes: Cube[] = [];

  for (const cube of moveCubes) {
    if (!deleteCubes.includes(cube)) {
      const sameColorCubes = [cube];

      // #region BFS
      const unvisited = Array(cubeRowCount)
        .fill(undefined)
        .map(() =>
          Array(cubeRowCount)
            .fill(undefined)
            .map(() => Array(cubeRowCount).fill(true))
        );

      const checkAdjacentSameColorCube = function (
        color: string,
        position: Position3d
      ) {
        const { x, y, z } = position;
        if (
          x >= 0 &&
          x < cubeRowCount &&
          y >= 0 &&
          y < cubeRowCount &&
          z < cubeRowCount &&
          unvisited[x][y][z]
        ) {
          unvisited[x][y][z] = false;
          if (cubeMap.get(position)?.color === color) {
            sameColorCubes.push(cubeMap.get(position)!);
            newCheckPositions.push(position);
          }
        }
      }.bind(null, cube.color);

      let newCheckPositions: Position3d[] = [];
      let checkPositions: Position3d[] = [cube];
      unvisited[cube.x][cube.y][cube.z] = false;
      while (checkPositions.length) {
        newCheckPositions = [];
        for (const position of checkPositions) {
          const { x, y, z } = position;
          checkAdjacentSameColorCube({ ...position, x: x - 1 });
          checkAdjacentSameColorCube({ ...position, x: x + 1 });
          checkAdjacentSameColorCube({ ...position, y: y - 1 });
          checkAdjacentSameColorCube({ ...position, y: y + 1 });
          checkAdjacentSameColorCube({ ...position, z: z + 1 });
        }
        checkPositions = newCheckPositions;
      }
      // #endregion

      if (sameColorCubes.length >= deleteCubeThreshold) {
        deleteCubes.push(...sameColorCubes);
      }
    }
  }

  return deleteCubes;
}

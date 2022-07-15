// vuex.d.ts
import { Store } from "vuex";
import { DevToolTabs, MoveDirection, GameMode } from "./src/util/constant";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    gameMode: GameMode;
    cubes: Cube[];
    deleteCubes: Cube[];
    cubeMap: CubeMap;
    addCube: Cube;
    devToolTab: DevToolTabs;
    showCover: boolean;
    addCubeColors: string[];
  }

  type Cube = {
    x: number;
    y: number;
    z: number;
    color: string;
    moveDirection: MoveDirection;
    moveDistance: number;
    moveDelay: number;
    key: getter<string>;

    // 调试用属性
    isPromptDev: boolean;
    isSelectedDev: boolean;
  };

  type Location3d = { x: number; y: number; z: number };

  class CubeMap {
    private cubeMatrixs: Array<Array<Array<undefined | Cube>>>;
    constructor() {
      this.cubeMatrixs = Array(cubeRowCount)
        .fill(undefined)
        .map(() =>
          Array(cubeRowCount)
            .fill(undefined)
            .map(() => Array(cubeRowCount).fill(undefined))
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
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

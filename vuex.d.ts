// vuex.d.ts
import { Store } from "vuex";
import { DevToolTabs, MoveDirection, GameMode } from "./src/util/constant";
import { CubeMap } from "./src/util/cube";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    gameMode: GameMode;
    cubes: Cube[];
    deleteCubes: Cube[];
    toShowCubes: Cube[];
    cubeMap: CubeMap;
    addCube: Cube;
    devToolTab: DevToolTabs;
    showCover: boolean;
    addCubeColors: string[];
    score: number;
    scoreMultiple: number;
    level: number;
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

  type Position3d = { x: number; y: number; z: number };

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

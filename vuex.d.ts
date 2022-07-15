// vuex.d.ts
import { Store } from 'vuex';
import { DevToolTabs, MoveDirection, GameMode } from './src/util/constant';

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    gameMode: GameMode;
    cubes: Cube[];
    deleteCubes: Cube[];
    cubeMap: Map<string, Cube>;
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

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

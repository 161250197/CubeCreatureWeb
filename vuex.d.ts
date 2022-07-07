// vuex.d.ts
import { Store } from 'vuex';
import { DevToolTabs, MoveDirection } from './src/util/constant';

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    cubes: Cube[];
    deleteCubes: Cube[];
    cubeMap: Map<string, Cube>;
    addCube: Cube;
    devToolTab: DevToolTabs;
    showCover: boolean;
  }

  type Cube = {
    x: number;
    y: number;
    z: number;
    color: string;
    isPrompt: boolean;
    isSelected: boolean;
    moveDirection: MoveDirection;
    moveDistance: number;
    moveDelay: number;
    key: getter<string>;
  };

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

// vuex.d.ts
import { Store } from 'vuex';
import { CubeState, DevToolTabs } from './src/util/constant';

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    count: number;
    cubes: Cube[];
    addCube: Cube;
    devToolTab: DevToolTabs;
  }

  type Cube = {
    x: number;
    y: number;
    z: number;
    color: string;
    state: CubeState;
  };

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

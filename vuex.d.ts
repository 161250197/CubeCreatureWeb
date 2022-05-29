// vuex.d.ts
import { Store } from 'vuex';
import { DevToolTabs } from './src/util/constant';

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    count: number;
    cubes: Cube[];
    cubeMap: Map<string, Cube>,
    addCube: Cube;
    devToolTab: DevToolTabs;
  }

  type Cube = {
    x: number;
    y: number;
    z: number;
    color: string;
    isPrompt: boolean;
    isSelected: boolean;
  };

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

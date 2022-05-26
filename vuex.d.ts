// vuex.d.ts
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    count: number;
    cubes: Cube[];
    addCube: Cube;
  }

  type Cube = {
    x: number;
    y: number;
    z: number;
    color: string;
  };

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

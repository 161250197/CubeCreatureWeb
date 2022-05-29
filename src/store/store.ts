// store.ts
import { InjectionKey, State } from 'vue';
import { createStore, Store } from 'vuex';
import { CubeState, DevToolTabs } from '../util/constant';
import { defaultAddCube, findCubeIndex, findCube } from '../util/cube';
import { INCREMENT, ADD_CUDE, SET_ADD_CUBE, SET_CUBE_STATE_BASE, SET_CUBE_STATE_PROMPT, SET_DEV_TOOL_TAB } from './mutation-types';

// define injection key
export const STORE_KEY: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    count: 0,
    cubes: [],
    addCube: defaultAddCube,
    devToolTab: DevToolTabs.add,
  },
  getters: {
    invalidPosition({ cubes, addCube }) {
      return findCubeIndex(addCube, cubes) >= 0;
    },
    devToolTabIsAdd({ devToolTab }) {
      return devToolTab === DevToolTabs.add;
    }
  },
  mutations: {
    [INCREMENT](state) {
      state.count++;
    },
    [ADD_CUDE](state, cube) {
      state.cubes.push(cube);
    },
    [SET_ADD_CUBE](state, addCube) {
      state.addCube = { ...addCube };
    },
    [SET_CUBE_STATE_BASE](state, cube) {
      const c = findCube(cube, state.cubes);
      c.state = CubeState.base;
    },
    [SET_CUBE_STATE_PROMPT](state, cube) {
      const c = findCube(cube, state.cubes);
      c.state = CubeState.prompt;
    },
    [SET_DEV_TOOL_TAB](state, devToolTab) {
      state.devToolTab = devToolTab;
    }
  },
  strict: process.env.NODE_ENV !== 'production'
});

export function getStore() {
  return useStore(STORE_KEY);
}

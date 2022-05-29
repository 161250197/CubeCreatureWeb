// store.ts
import { InjectionKey, State } from 'vue';
import { createStore, Store } from 'vuex';
import { DevToolTabs } from '../util/constant';
import { defaultAddCube, createCubeKey } from '../util/cube';
import { INCREMENT, ADD_CUDE, SET_ADD_CUBE, SET_CUBE_IS_PROMPT, SET_CUBES_IS_SELECTED, SET_DEV_TOOL_TAB } from './mutation-types';

// define injection key
export const STORE_KEY: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    count: 0,
    cubes: [],
    cubeMap: new Map(),
    addCube: defaultAddCube,
    devToolTab: DevToolTabs.add,
  },
  getters: {
    invalidPosition({ cubeMap, addCube }) {
      const cubeKey = createCubeKey(addCube);
      return cubeMap.has(cubeKey);
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
      const cubeKey = createCubeKey(cube);
      state.cubeMap.set(cubeKey, cube);
    },
    [SET_ADD_CUBE](state, addCube) {
      state.addCube = { ...addCube };
    },
    [SET_CUBE_IS_PROMPT](state, { cube, isPrompt }) {
      const cubeKey = createCubeKey(cube);
      const stateCube = state.cubeMap.get(cubeKey);
      stateCube!.isPrompt = isPrompt;
    },
    [SET_CUBES_IS_SELECTED](state, cubes) {
      const stateCubes = state.cubes;
      for (const cube of stateCubes) {
        cube.isSelected = false;
      }
      for (const cube of cubes) {
        const cubeKey = createCubeKey(cube);
        const stateCube = state.cubeMap.get(cubeKey);
        stateCube!.isSelected = true;
      }
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

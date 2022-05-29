// store.ts
import { InjectionKey, State } from 'vue';
import { createStore, Store } from 'vuex';
import { DevToolTabs } from '../util/constant';
import { defaultAddCube, createCubeKey } from '../util/cube';
import { INCREMENT, ADD_CUDE, SET_ADD_CUBE, SET_CUBE_IS_PROMPT, SET_CUBES_IS_SELECTED, DELETE_CUBES, SET_DEV_TOOL_TAB, SET_SHOW_COVER, DELETE_CUDES } from './mutation-types';

// define injection key
export const STORE_KEY: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    count: 0,
    cubes: [],
    deleteCubes: [],
    cubeMap: new Map(),
    addCube: defaultAddCube,
    devToolTab: DevToolTabs.add,
    showCover: false,
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
    [DELETE_CUDES](state, cubesParam) {
      const { cubes, cubeMap } = state;
      const deleteCubes = [];
      for (const cube of cubesParam) {
        const cubeKey = createCubeKey(cube);
        const stateCube = cubeMap.get(cubeKey);
        stateCube!.isPrompt = false;
        stateCube!.isSelected = false;
        deleteCubes.push(stateCube!);
        cubeMap.delete(cubeKey);
        cubes.splice(cubes.indexOf(cube), 1);
      }
      state.deleteCubes = deleteCubes;
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
    [SET_SHOW_COVER](state, showCover) {
      state.showCover = showCover;
    },
    [SET_DEV_TOOL_TAB](state, devToolTab) {
      state.devToolTab = devToolTab;
    }
  },
  actions: {
    [DELETE_CUBES](store, cubesParam) {
      store.commit(SET_SHOW_COVER, true);

      store.commit(DELETE_CUDES, cubesParam);

      setTimeout(() => {
        store.commit(SET_SHOW_COVER, false);
      }, 600);
    }
  },
  strict: process.env.NODE_ENV !== 'production'
});

export function getStore() {
  return useStore(STORE_KEY);
}

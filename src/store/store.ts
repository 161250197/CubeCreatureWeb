// store.ts
import { InjectionKey, State } from 'vue';
import { createStore, Store } from 'vuex';
import { defaultAddCube } from '../util/cube';
import { INCREMENT, ADD_CUDE, SET_ADD_CUBE } from './mutation-types';

// define injection key
export const STORE_KEY: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    count: 0,
    cubes: [],
    addCube: defaultAddCube
  },
  getters: {
    invalidPosition({ cubes, addCube }) {
      const { x, y, z } = addCube;
      for (const cube of cubes) {
        if (cube.x === x && cube.y === y && cube.z === z) {
          return true;
        }
      }
      return false;
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
    }
  },
  strict: process.env.NODE_ENV !== 'production'
});

export function getStore() {
  return useStore(STORE_KEY);
}

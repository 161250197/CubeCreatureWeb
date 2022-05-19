// store.ts
import { InjectionKey, State } from 'vue';
import { createStore, Store } from 'vuex';
import { INCREMENT, ADD_CUDE } from './mutation-types';

// define injection key
export const STORE_KEY: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    count: 0,
    cubes: []
  },
  mutations: {
    [INCREMENT](state) {
      state.count++;
    },
    [ADD_CUDE](state, cube) {
      state.cubes.push(cube);
    }
  },
  strict: process.env.NODE_ENV !== 'production'
});

export function getStore() {
  return useStore(STORE_KEY);
}

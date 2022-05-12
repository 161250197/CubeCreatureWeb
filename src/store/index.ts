// store.ts
import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import { INCREMENT } from './mutation-types';

// define your typings for the store state
export interface State {
  count: number;
}

// define injection key
export const STORE_KEY: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    count: 0
  },
  mutations: {
    [INCREMENT](state) {
      state.count++;
    }
  },
  strict: process.env.NODE_ENV !== 'production'
});

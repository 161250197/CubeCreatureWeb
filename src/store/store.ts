// store.ts
import { CubeMap, InjectionKey, State } from "vue";
import { createStore, Store } from "vuex";
import {
  DevToolTabs,
  MOVE_FRAME_TIME,
  FADE_FRAME_TIME,
  MoveDirection,
  GameMode,
} from "../util/constant";
import { defaultAddCube, getRandomCubeColor } from "../util/cube";
import {
  ADD_CUDE,
  SET_ADD_CUBE,
  SET_CUBE_IS_PROMPT_DEV,
  SET_CUBES_IS_SELECTED_DEV,
  DELETE_CUBES,
  SET_DEV_TOOL_TAB,
  SET_CUBE_MOVE_DIRECTION,
  SET_CUBE_MOVE_DISTANCE,
  SET_CUBE_MOVE_DELAY,
  DELETE_CUBES_ACTION,
  MOVE_CUBE,
  MOVE_CUBES_ACTION,
  SET_GAME_MODE,
  ADD_TO_LEFT_CUBE,
  ADD_TO_RIGHT_CUBE,
} from "./constant";

// define injection key
export const STORE_KEY: InjectionKey<Store<State>> = Symbol();

// 非公开 constant
const SET_SHOW_COVER = "setShowCover";
const RESET_MOVE_CUBE = "resetMoveCube";
const RESET_DELETE_CUBES = "resetDeleteCubes";
const UPDATE_ADD_CUBE_COLORS = "updateAddCubeColors";

/** 新增方块颜色预览数量 */
const addCubeColorCount = 3;

export const store = createStore<State>({
  state: {
    gameMode: GameMode.helloWorld,
    cubes: [],
    deleteCubes: [],
    cubeMap: new CubeMap(),
    addCube: defaultAddCube,
    devToolTab: DevToolTabs.add,
    showCover: false,
    addCubeColors: Array(addCubeColorCount)
      .fill(undefined)
      .map(getRandomCubeColor),
  },
  getters: {
    invalidPosition({ cubeMap, addCube }) {
      return cubeMap.get(addCube) !== undefined;
    },
    devToolTabIsAdd({ devToolTab }) {
      return devToolTab === DevToolTabs.add;
    },
    isHelloWorldMode({ gameMode }) {
      return gameMode === GameMode.helloWorld;
    },
    isDevMode({ gameMode }) {
      return gameMode === GameMode.dev;
    },
    isGameMode({ gameMode }) {
      return gameMode === GameMode.game;
    },
  },
  mutations: {
    [SET_DEV_TOOL_TAB](state, devToolTab) {
      state.devToolTab = devToolTab;
    },

    [SET_SHOW_COVER](state, showCover) {
      state.showCover = showCover;
    },

    [ADD_CUDE](state, cube) {
      const { cubes, cubeMap } = state;
      cubes.push(cube);
      cubeMap.set(cube);
    },

    [DELETE_CUBES](state, deleteCubes) {
      const { cubes, cubeMap } = state;
      const stateDeleteCubes = [];
      for (const cube of deleteCubes) {
        const stateCube = cubeMap.get(cube);
        stateCube!.isPromptDev = false;
        stateCube!.isSelectedDev = false;
        stateDeleteCubes.push(stateCube!);
        cubeMap.remove(cube);
        cubes.splice(cubes.indexOf(cube), 1);
      }
      state.deleteCubes = stateDeleteCubes;
    },
    [RESET_DELETE_CUBES](state) {
      state.deleteCubes = [];
    },

    [SET_ADD_CUBE](state, addCube) {
      state.addCube = { ...addCube };
    },
    [SET_CUBE_IS_PROMPT_DEV]({ cubeMap }, { cube, isPromptDev }) {
      const stateCube = cubeMap.get(cube);
      stateCube!.isPromptDev = isPromptDev;
    },
    [SET_CUBES_IS_SELECTED_DEV](state, cubes) {
      const stateCubes = state.cubes;
      for (const cube of stateCubes) {
        cube.isSelectedDev = false;
      }
      for (const cube of cubes) {
        const stateCube = state.cubeMap.get(cube);
        stateCube!.isSelectedDev = true;
      }
    },

    [SET_CUBE_MOVE_DIRECTION](state, { cube, moveDirection }) {
      const stateCube = state.cubeMap.get(cube);
      stateCube!.moveDirection = moveDirection;
    },
    [SET_CUBE_MOVE_DISTANCE](state, { cube, moveDistance }) {
      const stateCube = state.cubeMap.get(cube);
      stateCube!.moveDistance = moveDistance;
    },
    [SET_CUBE_MOVE_DELAY](state, { cube, moveDelay }) {
      const stateCube = state.cubeMap.get(cube);
      stateCube!.moveDelay = moveDelay;
    },
    [MOVE_CUBE](state, cube) {
      const { cubeMap } = state;
      // 更新位置
      switch (cube.moveDirection) {
        case MoveDirection.down:
          cube.z = Math.max(cube.z - cube.moveDistance, 0);
          break;
        case MoveDirection.right:
          cube.y = Math.max(cube.y - cube.moveDistance, 0);
          break;
        case MoveDirection.left:
          cube.x = Math.max(cube.x - cube.moveDistance, 0);
          break;
      }
      // 更新 map
      if (cubeMap.get(cube) === cube) {
        cubeMap.remove(cube);
      }
      cubeMap.set(cube);
    },
    [RESET_MOVE_CUBE](_, cube) {
      // 重置方块状态
      cube.moveDirection = MoveDirection.no;
      cube.moveDelay = 0;
      cube.moveDistance = 0;
    },

    [SET_GAME_MODE](state, gameMode) {
      state.gameMode = gameMode;
    },

    [UPDATE_ADD_CUBE_COLORS](state) {
      // TODO 添加调用
      state.addCubeColors.shift();
      state.addCubeColors.push(getRandomCubeColor());
    },
  },
  actions: {
    [DELETE_CUBES_ACTION](store, deleteCubes) {
      store.commit(SET_SHOW_COVER, true);

      store.commit(DELETE_CUBES, deleteCubes);

      setTimeout(() => {
        store.commit(SET_SHOW_COVER, false);
        store.commit(RESET_DELETE_CUBES, false);
      }, FADE_FRAME_TIME);
    },
    [MOVE_CUBES_ACTION](store, moveCubes) {
      store.commit(SET_SHOW_COVER, true);

      const { cubeMap } = store.state;
      for (const cube of moveCubes) {
        const stateCube = cubeMap.get(cube);
        const delayTime = cube.moveDelay * MOVE_FRAME_TIME;
        setTimeout(() => {
          store.commit(MOVE_CUBE, stateCube);
        }, delayTime);
        const totalTime = cube.moveDistance * MOVE_FRAME_TIME + delayTime;
        setTimeout(() => {
          store.commit(RESET_MOVE_CUBE, stateCube);
        }, totalTime);
      }

      let maxMoveTime = 0;
      for (const { moveDistance, moveDelay } of moveCubes) {
        maxMoveTime = Math.max(maxMoveTime, moveDistance + moveDelay);
      }
      const cartoonTimeout = maxMoveTime * MOVE_FRAME_TIME;
      setTimeout(() => {
        store.commit(SET_SHOW_COVER, false);
      }, cartoonTimeout);
    },

    [ADD_TO_RIGHT_CUBE](store, x: number) {
      // TODO
    },
    [ADD_TO_LEFT_CUBE](store, y: number) {
      // TODO
    },
  },
  strict: process.env.NODE_ENV !== "production",
});

export function getStore() {
  return useStore(STORE_KEY);
}

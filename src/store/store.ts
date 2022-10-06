// store.ts
import { cloneDeep } from "lodash";
import { Cube, InjectionKey, State } from "vue";
import { createStore, Store } from "vuex";
import {
  DevToolTabs,
  MOVE_FRAME_TIME,
  FADE_FRAME_TIME,
  MoveDirection,
  GameMode,
} from "../util/constant";
import {
  calCubeMovement,
  CubeMap,
  defaultAddCube,
  getRandomCubeColor,
  calDeleteCubes,
  calFallCubes,
  createDefaultCubes,
  createCubeColors,
} from "../util/cube";
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
  ADD_CUDE_ACTION,
  ADD_DEFAULT_CUBES,
} from "./constant";

// define injection key
export const STORE_KEY: InjectionKey<Store<State>> = Symbol();

// 非公开 constant
const SET_SHOW_COVER = "setShowCover";
const RESET_MOVE_CUBE = "resetMoveCube";
const RESET_DELETE_CUBES = "resetDeleteCubes";
const INIT_ADD_CUBE_COLORS = "initAddCubeColors";
const UPDATE_ADD_CUBE_COLORS = "updateAddCubeColors";
const CHECK_ADD_CUBE_COLORS = "checkAddCubeColors";
const SET_CUBES = "setCubes";
const SET_CUBE_MAP = "setCubeMap";
const SET_TO_SHOW_CUBES = "setToShowCubes";

/** 新增方块颜色预览数量 */
const addCubeColorCount = 3;

export const store = createStore<State>({
  state: {
    gameMode: GameMode.game,
    cubes: [],
    deleteCubes: [],
    toShowCubes: [],
    cubeMap: new CubeMap(),
    addCube: defaultAddCube,
    devToolTab: DevToolTabs.add,
    showCover: false,
    addCubeColors: [],
  },
  getters: {
    cubeCount({ cubes }) {
      return cubes.length;
    },
    invalidPosition({ cubeMap, addCube }) {
      return !cubeMap.isEmpty(addCube);
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
    nextCubeColor({ addCubeColors }) {
      return addCubeColors[0];
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
      // 更新 map
      if (cubeMap.get(cube) === cube) {
        cubeMap.remove(cube);
      }
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

    [INIT_ADD_CUBE_COLORS](state, cubes: Cube[]) {
      const cubeColors = createCubeColors(cubes);
      state.addCubeColors = Array(addCubeColorCount)
        .fill(undefined)
        .map(() => getRandomCubeColor(cubeColors));
    },
    [UPDATE_ADD_CUBE_COLORS](state) {
      const { cubes, addCubeColors } = state;
      const cubeColors = createCubeColors(cubes);
      addCubeColors.shift();
      addCubeColors.push(getRandomCubeColor(cubeColors));
    },
    [CHECK_ADD_CUBE_COLORS](state) {
      const { cubes, addCubeColors } = state;
      const cubeColors = createCubeColors(cubes);
      for (let i = 0; i < addCubeColorCount; i++) {
        if (!cubeColors.includes(addCubeColors[i])) {
          addCubeColors[i] = getRandomCubeColor(cubeColors);
        }
      }
    },

    [SET_CUBES](state, cubes: Cube[]) {
      state.cubes = cubes;
    },

    [SET_CUBE_MAP](state, cubeMap: CubeMap) {
      state.cubeMap = cubeMap;
    },

    [SET_TO_SHOW_CUBES](state, toShowCubes: Cube[]) {
      state.toShowCubes = toShowCubes;
    },
  },
  actions: {
    [DELETE_CUBES_ACTION](store, deleteCubes) {
      store.commit(SET_SHOW_COVER, true);

      store.commit(DELETE_CUBES, deleteCubes);

      setTimeout(() => {
        store.commit(RESET_DELETE_CUBES, false);

        const setCubeMoveDirection = function (
          cube: Cube,
          moveDirection: MoveDirection
        ) {
          store.commit(SET_CUBE_MOVE_DIRECTION, { cube, moveDirection });
        };
        const setCubeMoveDistance = function (
          cube: Cube,
          moveDistance: number
        ) {
          store.commit(SET_CUBE_MOVE_DISTANCE, { cube, moveDistance });
        };

        const fallCubes = calFallCubes(
          deleteCubes,
          store.state.cubeMap,
          setCubeMoveDirection,
          setCubeMoveDistance
        );
        if (fallCubes.length) {
          store.dispatch(MOVE_CUBES_ACTION, { moveCubes: fallCubes });
        } else if (store.getters.cubeCount === 0) {
          store.dispatch(ADD_DEFAULT_CUBES);
        } else {
          store.commit(CHECK_ADD_CUBE_COLORS);
          store.commit(SET_SHOW_COVER, false);
        }
      }, FADE_FRAME_TIME);
    },
    [MOVE_CUBES_ACTION](store, { moveCubes, noCheckDelete = false }) {
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
        // 初始化时不进行删除检查
        const deleteCubes = noCheckDelete
          ? []
          : calDeleteCubes(moveCubes, cubeMap);

        if (deleteCubes.length) {
          store.dispatch(DELETE_CUBES_ACTION, deleteCubes);
        } else {
          store.commit(SET_SHOW_COVER, false);
        }
      }, cartoonTimeout);
    },

    [ADD_CUDE_ACTION](store, cube: Cube) {
      store.commit(SET_ADD_CUBE, cube);
      store.commit(ADD_CUDE, cube);

      const { moveDirection } = cube;

      const { pushedCube, moveDistance } = calCubeMovement(
        cube,
        store.state.cubeMap
      );

      const moveCubes = [cube];
      store.commit(SET_CUBE_MOVE_DISTANCE, {
        cube,
        moveDistance,
      });

      if (pushedCube !== undefined) {
        moveCubes.push(pushedCube);
        store.commit(SET_CUBE_MOVE_DIRECTION, {
          cube: pushedCube,
          moveDirection,
        });
        store.commit(SET_CUBE_MOVE_DELAY, {
          cube: pushedCube,
          moveDelay: moveDistance - 1,
        });
        store.commit(SET_CUBE_MOVE_DISTANCE, {
          cube: pushedCube,
          moveDistance: 1,
        });
      }

      store.dispatch(MOVE_CUBES_ACTION, { moveCubes });

      store.commit(UPDATE_ADD_CUBE_COLORS);
    },
    /** 添加默认方块
     * 当棋盘上没有方块时自动添加新方块
     */
    [ADD_DEFAULT_CUBES](store) {
      store.commit(SET_SHOW_COVER, true);

      const cubes = cloneDeep(createDefaultCubes());
      store.commit(SET_TO_SHOW_CUBES, cubes);
      store.commit(INIT_ADD_CUBE_COLORS, cubes);

      const cubeMap = new CubeMap();
      for (const cube of cubes) {
        cubeMap.set(cube);
      }

      store.commit(SET_CUBE_MAP, cubeMap);
      setTimeout(() => {
        store.commit(SET_TO_SHOW_CUBES, []);
        store.commit(SET_CUBES, cubes);
        store.commit(SET_SHOW_COVER, false);
      }, FADE_FRAME_TIME);
    },
  },
  strict: process.env.NODE_ENV !== "production",
});

export function getStore() {
  return useStore(STORE_KEY);
}

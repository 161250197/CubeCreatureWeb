<template>
  <div class="full-screen" @dblclick="changeGameModeDev">
    <h1>今天你也很可爱！</h1>
    <img
      v-for="i of logoCount"
      :key="i"
      :class="`meteor-${i}`"
      :alt="`Vue logo No.${i}`"
      src="../assets/logo.png"
      class="logo"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { SET_GAME_MODE } from "../store/mutation-types";
import { getStore } from "../store/store";
import { GameMode } from "../util/constant";
const store = getStore();

function changeGameModeDev() {
  store.commit(SET_GAME_MODE, GameMode.dev);
}

const logoCount = ref(10);
</script>

<style scoped lang="less">
.full-screen {
  width: 100%;
  height: 100%;
}

h1 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: -2em;
  z-index: 1;
  word-break: keep-all;
}

// #region 流星特效
@meteorCount: 10;

.logo {
  position: absolute;
  left: -100%;
}

#fromLeftMap() {
  @1: 100;
  @2: 40;
  @3: 160;
  @4: 30;
  @5: 70;
  @6: 120;
  @7: 20;
  @8: 150;
  @9: 90;
  @10: 130;
}

#widthMap() {
  @1: 50;
  @2: 60;
  @3: 50;
  @4: 30;
  @5: 60;
  @6: 40;
  @7: 30;
  @8: 30;
  @9: 50;
  @10: 40;
}

.keyframesFunction(@cartoonName, @index) {
  @fromLeft: #fromLeftMap[ @@index];
  @toLeft: @fromLeft - 100;
  @width: #widthMap[ @@index];

  @keyframes @cartoonName {
    from {
      left: e(%("%s%", @fromLeft));
      top: e(%("-%spx", @width));
    }

    to {
      left: e(%("%s%", @toLeft));
      top: 100%;
    }
  }
}

each(range(@meteorCount), {
    @cartoonName: e(%("meteor-%s", @value));
    @deley: e(%("%ss", ((@value - 1) / 2)));
    @width: #widthMap[@@value];

    .@{cartoonName} {
      animation: 3s linear @deley infinite running @cartoonName,
      3s linear infinite running rotate;
      width: e(%("%spx", @width));
    }

    .keyframesFunction(@cartoonName, @value);
  }

);

@keyframes rotate {
  from {
    transform: rotate(0);
  }

  50% {
    transform: rotate(-180deg);
  }

  to {
    transform: rotate(-360deg);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }

  50% {
    transform: rotate(-180deg);
  }

  to {
    transform: rotate(-360deg);
  }
}

// #endregion
</style>

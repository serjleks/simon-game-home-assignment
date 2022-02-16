<template>
  <div class="game-menu">
    <UIButton
      :active="$game.state.level === $game.state.levelsDifficulty.easy.name"
      @click="menuClickHandle($game.state.levelsDifficulty.easy.name)"
      >EASY</UIButton
    >
    <UIButton
      :active="$game.state.level === $game.state.levelsDifficulty.medium.name"
      @click="menuClickHandle($game.state.levelsDifficulty.medium.name)"
      >MEDIUM</UIButton
    >
    <UIButton
      :active="$game.state.level === $game.state.levelsDifficulty.hard.name"
      @click="menuClickHandle($game.state.levelsDifficulty.hard.name)"
      >HARD</UIButton
    >
  </div>
</template>

<script>
import UIButton from "./UIButton";

export default {
  name: "GameMenu",
  components: {
    UIButton,
  },
  methods: {
    menuClickHandle(level) {
      this.$emit("click", level);
    },
  },
};
</script>

<style scoped>
.game-menu {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

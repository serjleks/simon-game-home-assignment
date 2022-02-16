<template>
  <div class="game-over">
    <div class="game-over-dialog">
      <h1>Игра окончена</h1>
      <p>Раунд {{ $game.state.round }}</p>
      <UIButton @click="closeModalHandler">Повторить</UIButton>
    </div>
    <div class="game-over__overlay"></div>
  </div>
</template>

<script>
import UIButton from "@/components/UIButton";

export default {
  name: "GameOver",
  components: { UIButton },
  methods: {
    closeModalHandler(event) {
      this.$emit("try-again-click", event);
    },
  },
};
</script>

<style scoped>
.game-over {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 2;
}

.game-over-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-over-dialog > * {
  margin-bottom: 16px;
}

.game-over__overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  height: 100%;
  width: 100%;

  background: rgba(0, 0, 0, 0.7);

  z-index: -1;
}
</style>

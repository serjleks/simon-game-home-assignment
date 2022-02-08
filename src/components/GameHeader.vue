<template>
  <div class="game-header">
    <h1>Simon The Game</h1>
    <h3>Round {{ $game.state.round }}</h3>
    <h3>Record {{ $game.state.roundRecord }}</h3>
  </div>
</template>

<script>
export default {
  name: "GameHeader",
};
</script>

<style scoped>
.game-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-header > * {
  padding: 4px 0;
}

.game-header :first-child {
  margin-bottom: 16px;
}
</style>

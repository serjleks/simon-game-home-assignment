<template>
  <div
    class="simon-circle"
    :class="{ 'simon-circle-interactive': !preventInput }"
  >
    <div
      class="simon-sector-green"
      :class="{ 'simon-circle-emit': $game.state.emitSectors.green }"
      sector-id="green"
      @click="sectorClickHandle"
    />
    <div
      class="simon-sector-red"
      :class="{ 'simon-circle-emit': $game.state.emitSectors.red }"
      sector-id="red"
      @click="sectorClickHandle"
    />
    <div
      class="simon-sector-yellow"
      :class="{ 'simon-circle-emit': $game.state.emitSectors.yellow }"
      sector-id="yellow"
      @click="sectorClickHandle"
    />
    <div
      class="simon-sector-blue"
      :class="{ 'simon-circle-emit': $game.state.emitSectors.blue }"
      sector-id="blue"
      @click="sectorClickHandle"
    />
  </div>
</template>

<script>
import { throttle } from "@/helpers/throttle";

export default {
  name: "SimonCircle",
  props: {
    preventInput: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.sectorClickHandle = throttle((event) => {
      let sectorId = event.target.getAttribute("sector-id");
      if (!this.$props.preventInput) {
        this.$emit("click", sectorId);
      }
    }, 250);
  },
  value(...args) {
    this.sectorClickHandle(...args);
  },
};
</script>

<style scoped>
.simon-circle {
  display: flex;
  flex-wrap: wrap;

  width: 260px;
  height: 260px;
}

.simon-circle > * {
  transition: all 0.08s ease-out;
  filter: saturate(0.8) brightness(0.4);
}

.simon-circle-interactive > *:active {
  filter: saturate(1) brightness(1);
}

.simon-circle-emit {
  filter: saturate(1) brightness(1);
}

.simon-sector-red {
  flex: 50%;

  min-width: 130px;
  min-height: 130px;

  background-image: url("../assets/icons/sector-red.svg");
  background-size: 130px auto;
  background-position-x: left;
  background-repeat: no-repeat;
}

.simon-sector-blue {
  flex: 50%;

  min-width: 130px;
  min-height: 130px;

  background-image: url("../assets/icons/sector-blue.svg");
  background-size: 130px auto;
  background-position-x: left;
  background-repeat: no-repeat;
}

.simon-sector-yellow {
  flex: 50%;

  min-width: 130px;
  min-height: 130px;

  background-image: url("../assets/icons/sector-yellow.svg");
  background-size: 130px auto;
  background-position-x: right;
  background-repeat: no-repeat;
}

.simon-sector-green {
  flex: 50%;

  min-width: 130px;
  min-height: 130px;

  background-image: url("../assets/icons/sector-green.svg");
  background-size: 130px auto;
  background-position-x: right;
  background-repeat: no-repeat;
}
</style>

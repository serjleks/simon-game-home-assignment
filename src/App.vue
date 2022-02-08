<template>
  <div id="app-mount">
    <AppLayout>
      <template v-slot:header>
        <GameHeader></GameHeader>
      </template>

      <SimonCircle
        @click="simonClickHandler"
        :preventInput="!$game.state.isPlayerInput"
      ></SimonCircle>

      <GameOver
        v-if="$game.state.isGameOver"
        @try-again-click="tryAgain"
      ></GameOver>

      <template v-slot:footer>
        <GameMenu @click="startGame"></GameMenu>
      </template>
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import GameHeader from "@/components/GameHeader";
import GameMenu from "@/components/GameMenu";
import SimonCircle from "@/components/SimonCircle";
import GameOver from "@/components/GameOver";

import { getRandomNumber } from "@/helpers/utils";

const sequenceIds = new Map();
sequenceIds.set(1, "green");
sequenceIds.set(2, "red");
sequenceIds.set(3, "blue");
sequenceIds.set(4, "yellow");

let soundEffects = {
  green: new Audio(require("@/assets/sounds/simon-1.wav")),
  red: new Audio(require("@/assets/sounds/simon-2.wav")),
  blue: new Audio(require("@/assets/sounds/simon-3.wav")),
  yellow: new Audio(require("@/assets/sounds/simon-4.wav")),
};

export default {
  name: "App",
  components: {
    AppLayout,
    GameHeader,
    GameMenu,
    GameOver,
    SimonCircle,
  },
  methods: {
    startGame(level) {
      this.$game.state.level = level;
      this.$game.state.isGameStarted = true;

      if (!this.$game.state.isSequencePlay) {
        this.gameReset();
        this.nextRound();
      }
    },

    tryAgain() {
      this.$game.state.isGameOver = false;

      setTimeout(() => {
        this.startGame(this.$game.state.level);
      }, 1000);
    },

    playSequence(timeout = 1000) {
      this.$game.state.isSequencePlay = true;

      let sequence = Object.entries(this.$game.state.sequence);
      let sequenceIndex = 0;

      let done = false;

      const runSequence = () => {
        let fadeoutTime = timeout / 8;

        let currentIndex = sequence[sequenceIndex][1];
        let currentColor = sequenceIds.get(currentIndex);

        this.$game.state.emitSectors[currentColor] = true;

        this.playSound(currentColor);

        if (sequenceIndex >= sequence.length - 1) {
          done = true;
        }

        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, timeout - fadeoutTime);
        }).then(() => {
          this.$game.state.emitSectors[currentColor] = false;

          sequenceIndex++;

          if (!done) {
            setTimeout(() => {
              runSequence();
            }, timeout + fadeoutTime);
          } else {
            this.$game.state.isSequencePlay = false;
            this.$game.state.isPlayerInput = true;
          }
        });
      };

      if (!done && this.$game.state.sequence.length) {
        setTimeout(() => {
          runSequence();
        }, timeout);
      }
    },

    playSound(color) {
      soundEffects[color].currentTime = 0;
      soundEffects[color].play();
    },

    simonClickHandler(color) {
      this.playSound(color);
      this.checkInput(color);
    },

    checkInput(color) {
      let playerColorIndex = 0;
      let sequence = this.$game.state.sequence;
      let playerSequenceIndex = this.$game.state.playerSequenceIndex;

      sequenceIds.forEach((value, index) => {
        if (color === value) {
          playerColorIndex = index;
        }
      });

      if (playerColorIndex === sequence[playerSequenceIndex]) {
        this.$game.state.playerSequenceIndex++;

        if (
          this.$game.state.playerSequenceIndex ===
          this.$game.state.sequence.length
        ) {
          this.$game.state.isPlayerInput = false;
          this.nextRound();
        }
      } else {
        this.$game.state.isPlayerInput = false;
        this.gameOver();
      }
    },

    gameReset() {
      this.$game.state.round = 0;
      this.$game.state.isGameOver = false;
      this.$game.state.playerSequenceIndex = 0;
      this.$game.state.sequenceIndex = 0;
      this.$game.clearSequence();
      this.$game.clearEmitSectors();
    },

    gameOver() {
      this.$game.state.isGameOver = true;
    },

    increaseRound() {
      this.$game.state.round++;
    },

    nextRound() {
      let timeout = this.$game.getCurrentLevelDifficulty().timeout;

      this.$game.state.playerSequenceIndex = 0;

      this.increaseRound();
      this.pushToSequence();

      this.$game.state.roundRecord = Math.max(
        this.$game.state.round,
        this.$game.state.roundRecord
      );

      // Timeout between rounds
      setTimeout(() => {
        this.playSequence(timeout);
      }, 1000);
    },

    pushToSequence() {
      this.$game.state.sequenceIndex++;

      let random = getRandomNumber(sequenceIds.size);
      this.$game.state.sequence.push(random);
    },
  },
};
</script>

<style>
@import "css/style.css";
</style>

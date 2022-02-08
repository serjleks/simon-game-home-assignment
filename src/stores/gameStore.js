import Vue from "vue";

export class GameStore {
  constructor() {
    this.state = Vue.observable({
      round: 0,
      roundRecord: 0,
      level: "",
      levelsDifficulty: {
        easy: {
          name: "easy",
          timeout: 1500,
        },
        medium: {
          name: "medium",
          timeout: 1000,
        },
        hard: {
          name: "hard",
          timeout: 400,
        },
      },
      isGameStarted: false,
      isGameOver: false,
      isSequencePlay: false,
      isPlayerInput: false,
      sequenceIndex: 0,
      sequence: [],
      playerSequenceIndex: 0,
      emitSectors: {
        green: false,
        red: false,
        blue: false,
        yellow: false,
      },
    });
  }

  getCurrentLevelDifficulty() {
    return this.state.levelsDifficulty[this.state.level];
  }

  clearSequence() {
    this.state.sequence = [];
  }

  clearEmitSectors() {
    this.state.emitSectors = {
      green: false,
      red: false,
      blue: false,
      yellow: false,
    };
  }
}

import Vue from "vue";
import App from "./App.vue";

import { GameStore } from "@/stores/gameStore";

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.prototype.$game = new GameStore();

new Vue({
  render: (h) => h(App),
}).$mount("#app-mount");

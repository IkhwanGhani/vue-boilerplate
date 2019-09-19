import Vue from "vue";
import Vuex from "vuex";

import user from "./user";
import shared from "./shared";
import userlist from "./userlist";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: user,
    shared: shared,
    userlist: userlist
  }
});

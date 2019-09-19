import axios from "axios";

export default {
  state: {
    userlist: [
      { name: "Ikhwan", age: 36, position: "Programmer" },
      { name: "Rusydi", age: 45, position: "Manager" },
      { name: "Anas", age: 23, position: "Lead" },
      { name: "Nuzli", age: 12, position: "Programmer" },
      { name: "Ejat", age: 12, position: "Programmer" }
    ]
  },
  mutations: {
    deleteUser(state) {
      console.log("mutation delete user");
      state.userlist.pop();
    }
  },
  actions: {
    deleteUser({ commit }) {
      console.log("action Delete User");
      commit("deleteUser");
    }
  },
  getters: {
    getAllUsers(state) {
      return state.userlist;
    },
    getAllProgrammers(state) {
      return state.userlist.filter(item => item.position === "Programmer");
    }
  }
};

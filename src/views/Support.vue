<template>
  <v-container>
    <v-layout wrap>
      <v-flex md8 xs12 class="pa-2">
        <h1 class="display-1 font-weight-regular mb-3">Support</h1>
        <p class="subheading font-weight-regular">How can we help you?</p>
      </v-flex>
      <ul>
        <li v-for="user in programmers">
          <h3>{{ user.name }}</h3>
          <h4>{{ user.age }}</h4>
          <span>{{ user.position }}</span>
        </li>
      </ul>
    </v-layout>
    <v-btn @click="deleteUser">Delete User</v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    deleteUser() {
      this.$store.dispatch("deleteUser");
    }
  },
  computed: {
    programmers() {
      return this.$store.getters.getAllProgrammers;
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>

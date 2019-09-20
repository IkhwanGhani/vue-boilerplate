<template>
  <!-- <v-data-table :headers="headers" :items="users" sort-by="id" class="elevation-1"></v-data-table> -->
  <v-data-table :headers="headers" :items="posts" sort-by="id" class="elevation-1"></v-data-table>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // headers: [
      //   { text: "Name", value: "name" },
      //   { text: "Age", value: "age" },
      //   { text: "Position", value: "position" }
      // ]
      headers: [
        { text: "Name", value: "userId" },
        { text: "Age", value: "title" },
        { text: "Position", value: "body" }
      ],
      posts: []
    };
  },
  methods: {
    getListUser() {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/posts`)
        .then(res => {
          this.posts = res.data;
          console.log(
            `[title name] item: ${JSON.stringify(this.posts, null, "   ")}`
          );
        })
        .catch(err => console.error(err));
    }
  },
  computed: {
    users() {
      return this.$store.getters.getAllUsers;
    }
  },
  mounted() {
    this.getListUser();
  }
};
</script>

<style lang="scss" scoped>
</style>

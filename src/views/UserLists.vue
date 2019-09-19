<template>
  <section>
    <ul>
      <li v-for="post in posts" :key="post.userId">
        <h3>{{ post.userId }}</h3>
        <h4>{{ post.title }}</h4>
        <span>{{ post.body }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      posts: []
    };
  },
  methods: {},
  computed: {
    users() {
      return this.$store.getters.getAllUsers;
    }
  },
  mounted() {
    console.log(`${process.env.VUE_APP_BASE_URL}/posts`);
    axios
      .get(`${process.env.VUE_APP_BASE_URL}/posts`)
      .then(res => {
        console.log(res);
        this.posts = res.data;
        console.log(
          `[title name] item: ${JSON.stringify(this.posts, null, "   ")}`
        );
      })
      .catch(err => console.error(err));
  }
};
</script>

<style lang="scss" scoped>
</style>

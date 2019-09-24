<template>
  <v-data-table :headers="headers" :items="posts" sort-by="id" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <div class="flex-grow-1"></div>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-text-field v-model="editedItem.id" label="ID"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="editedItem.name" label="NAME"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.email" label="EMAIL"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.role" label="ROLE"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="getUserList">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "ID", value: "id" },
      { text: "NAME", value: "name" },
      { text: "EMAIL", value: "email" },
      { text: "ROLE", value: "role" },
      { text: "ACTIONS", value: "action", sortable: false }
    ],
    posts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      id: "",
      email: "",
      role: ""
    },
    defaultItem: {
      name: "",
      id: "",
      email: "",
      role: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      axios
        .get(`${process.env.VUE_APP_SMISP_URL}/user/list`)
        .then(res => {
          this.posts = [];
          this.jsonData = res.data;

          res.data.forEach(item => {
            this.id = item.common.id;
            this.name = item.common.name;
            this.email = item.common.email;
            this.role = item.app.grafana.role;

            this.posts.push({
              id: this.id,
              name: this.name,
              email: this.email,
              role: this.role
            });
          });
        })
        .catch(err => console.error(err));
    },
    editItem(item) {
      this.editedIndex = this.posts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.posts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        axios.post(
          `${process.env.VUE_APP_SMISP_URL}/user/delete`,
          this.jsonData[index]
        ) &&
        this.posts.splice(index, 1);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        //Edit Item
        Object.assign(this.posts[this.editedIndex], this.editedItem);

        this.jsonData[this.editedIndex].common.name = this.posts[
          this.editedIndex
        ].name;
        this.jsonData[this.editedIndex].common.email = this.posts[
          this.editedIndex
        ].email;
        this.jsonData[this.editedIndex].app.grafana.role = this.posts[
          this.editedIndex
        ].role;
        axios.post(
          `${process.env.VUE_APP_SMISP_URL}/user/modify`,
          this.jsonData[this.editedIndex]
        );
      } else {
        // New Item
        this.posts.push(this.editedItem);

        this.jsonData[0].common.id = this.editedItem.id;
        this.jsonData[0].common.name = this.editedItem.name;
        this.jsonData[0].common.email = this.editedItem.email;
        this.jsonData[0].app.grafana.role = this.editedItem.role;

        axios.post(
          `${process.env.VUE_APP_SMISP_URL}/user/create`,
          this.jsonData[0]
        );
      }
      this.close();
    }
  }
};
</script>
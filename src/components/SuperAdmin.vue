<template>
  <div>
    <h1>Admin Page</h1>

    <div v-if="users.length > 0" class="bg-info">
      <h2>User Information</h2>

      <div class="col-4">
        <table class="ml-3">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
          </tr>
        </table>
      </div>
    </div>
    <b-card class="mt-4 col-md-3 text-center ml-5">
      <div>
        <h2>Add New User</h2>
        <form @submit.prevent="addUser" class="d-flex flex-column">
          <b-form-input
            type="text"
            v-model="newUser.name"
            name="name"
            placeholder="Name"
            v-validate="{ required: true }"
            class="mt-3"
          >
          </b-form-input>
          <div v-if="submitted" class="error-message">
            {{ errors.first("name") }}
          </div>
          <b-form-input
            type="email"
            v-model="newUser.email"
            placeholder="Email"
            v-validate="{ required: true }"
            name="email"
            class="mt-3"
          ></b-form-input>
          <div v-if="submitted" class="error-message">
            {{ errors.first("email") }}
          </div>
          <b-form-input
            type="password"
            v-model="newUser.password"
            placeholder="Password"
            v-validate="{ required: true, min: 9 }"
            name="password"
            class="mt-3"
          >
          </b-form-input>
          <div v-if="submitted" class="error-message">
            {{ errors.first("password") }}
          </div>
          <b-form-group>
            <b-form-select
              type="text"
              v-model="newUser.role"
              :options="roles"
              name="role"
              v-validate="{ required: true }"
              aria-placeholder="Select a role"
              class="mt-3"
            >
            </b-form-select>
          </b-form-group>
          <div v-if="submitted" class="error-message">
            {{ errors.first("role") }}
          </div>
          <b-button type="submit" class="mt-3 btn-success"
            >Add New User</b-button
          >
        </form>
      </div>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import bcrypt from "bcryptjs";

export default {
  name: "AdminPage",
  data() {
    return {
      users: [],
      newUser: {
        name: "",
        email: "",
        password: "",
        role: null,
      },
      roles: [
        { value: null, text: "Select a role" },
        { value: "user", text: "user" },
      ],
      submitted: false,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:3000/users");
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async addUser() {
      try {
        const validity = await this.$validator.validate();
        if (!validity) {
          return false;
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(this.newUser.password, salt);
        const response = await axios.post("http://localhost:3000/users", {
          name: this.newUser.name,
          email: this.newUser.email,
          password: hash,
          role: this.newUser.role,
        });
        // this.submitted = true;
        console.log("User added successfully:", response.data);
        this.newUser = {
          name: "",
          email: "",
          password: "",
          role: null,
        };
        this.submitted = false;
        this.fetchUsers();
      } catch (error) {
        console.error("Error adding user:", error);
      }
    },
  },
  mounted() {
    const user = localStorage.getItem("user-info");
    if (user) {
      this.$bvToast.toast("You login as Admin", {
        title: "SUCCESS",
        variant: "success",
        solid: true,
        autoHideDelay: 1500,
        toster: "b-toaster-top-right",
      });
    } else {
      this.$bvToast.toast("Server not connected", {
        title: "ERROR",
        variant: "danger",
        solid: true,
        autoHideDelay: 1500,
        toster: "b-toaster-top-right",
      });
    }
    this.fetchUsers();
  },
};
</script>

<style>
.error-message {
  color: red;
}
</style>

<template>
  <div
    class="d-flex justify-content-center align-items-center bg-secondary custom-height"
  >
    <b-col md="4" class="m-6">
      <b-card-group deck class="shadow p-3 mb-5 bg-white rounded">
        <b-card class="text-center border-0">
          <img src="../assets/now.png" alt="" class="custom-img" />
          <b-form-input
            type="text"
            v-model="form.name"
            placeholder="Enter your Name"
            name="name"
            v-validate="{ required: true }"
            class="mb-2"
          ></b-form-input>
          <div v-if="submitted" class="error-message">
            {{ errors.first("name") }}
          </div>
          <b-form-input
            type="email"
            v-model="form.email"
            placeholder="Enter your email"
            name="email"
            v-validate="{ required: true }"
            class="mb-2"
          ></b-form-input>
          <div v-if="submitted" class="error-message">
            {{ errors.first("email") }}
          </div>
          <b-form-input
            type="password"
            v-model="form.password"
            placeholder="Enter your password"
            name="password"
            v-validate="{ required: true, min: 9 }"
            class="mb-2"
          ></b-form-input>
          <div v-if="submitted" class="error-message">
            {{ errors.first("password") }}
          </div>
          <b-form-group>
            <b-form-select
              v-model="form.role"
              name="role"
              type="text"
              v-validate="{ required: true }"
              :options="roles"
            >
            </b-form-select>
          </b-form-group>
          <div v-if="submitted" class="error-message">
            {{ errors.first("role") }}
          </div>
          <b-button block variant="info" @click="SignUp">Sign Up</b-button>
          <p class="mt-3">
            Already Have an account?? <span><a href="/login">Login</a></span>
          </p>
        </b-card>
      </b-card-group>
    </b-col>
  </div>
</template>

<script>
import axios from "axios";
import bcrypt from "bcryptjs";
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: null,
        role: null,
        status: 0,
      },
      users: [],
      roles: [
        { value: null, text: "Select a role" },
        { value: "user", text: "User" },
      ],
      submitted: false,
    };
  },
  methods: {
    async SignUp() {
      try {
        // status (pending, )
        let response = await this.$validator.validate();
        if (!response) {
          return;
        }
        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(this.form.password, salt);
        this.form.status = 0;
        let result = await axios.post("http://localhost:3000/users", {
          name: this.form.name,
          email: this.form.email,
          password: hashed,
          role: this.form.role,
          status: this.form.status,
          // status
        });
        this.submitted = true;
        console.log("result added", result.data);
        if (result.status == 201 && response) {
          console.log("status info", this.form.status);
          localStorage.setItem("user-info", JSON.stringify(result.data));
          this.$router.push({ name: "login" });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "login" });
    }
  },
};
</script>

<style>
.custom-img {
  max-width: 100px;
  height: auto;
}
.custom-height {
  height: 530px;
}
.error-message {
  color: red;
}
</style>

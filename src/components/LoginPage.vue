<template>
  <div
    class="d-flex justify-content-center align-items-center bg-secondary custom-height"
  >
    <b-col md="4" class="m-4">
      <b-card-group deck class="shadow p-3 mb-5 bg-white rounded">
        <b-card class="text-center border-0">
          <img src="../assets/logo login.png" alt="" class="logo-adjust" />
          <b-form-input
            type="email"
            v-model="form.email"
            placeholder="Enter your email"
            v-validate="{ required: true }"
            name="email"
            class="mb-3"
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
            class="mb-3"
          ></b-form-input>
          <div v-if="submitted" class="error-message">
            {{ errors.first("password") }}
          </div>
          <b-button block variant="info" @click="loginForm">Login</b-button>
          <p class="mt-3">
            Don't have an account?
            <router-link to="/SignUp">Sign Up</router-link>
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
  name: "loginPage",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      loginUser: [],
      submitted: false,
      // roles: [
      //   { value: null, text: "Select a role" },
      //   { value: "admin", text: "admin" },
      //   { value: "user", text: "user" },
      // ],
    };
  },
  methods: {
    async loginForm() {
      try {
        let response = await this.$validator.validate();
        // if (!response) {
        //   alert("please enter a valid credentials");
        //   return false;
        // }
        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(this.form.password, salt);
        let result = await axios.post("http://localhost:3000/loginUser", {
          email: this.form.email,
          password: hash,
        });
        console.log("Post Request Response: ", result.data);
        this.submitted = true;
        const userData = result && result.data;
        if (userData) {
          let signUpData = await axios.get(
            `http://localhost:3000/users?email=${this.form.email}`
          );
          console.log("SignUpData", signUpData.data);
          const storeData = signUpData.data[0];
          console.log("Role", signUpData.data[0].role);
          if (
            signUpData.data.length === 1
            // signUpData.data[0].role === "admin"
          ) {
            const isMatched = bcrypt.compareSync(
              this.form.password,
              storeData.password
            );
            console.log("isMatched result:", isMatched);
            console.log("validation response:", response);
            if (isMatched) {
              localStorage.setItem("user-info", JSON.stringify(storeData));
              const selectRoute = storeData.role == "admin" ? "admin" : "home";
              if (this.$route.name !== selectRoute) {
                this.$router.push({ name: selectRoute });
              }
            } else {
              alert("invalid credentials");
            }
          }
        }
      } catch (error) {
        console.log("Error", error);
        alert("Enter valid credentials");
      }
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user && this.$route.name !== "login") {
      this.$router.push({ name: "login" });
    }
  },
};
</script>

<style>
.logo-adjust {
  /* margin-top: 10px; */
  margin-bottom: 20px;
  max-width: 130px;
  height: auto;
}
</style>

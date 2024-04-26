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
        status: 0,
      },
      loginUser: [],
      submitted: false,
    };
  },
  methods: {
    async loginForm() {
      try {
        this.submitted = true;
        let response = await this.$validator.validate();
        if (!response) {
          return false;
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(this.form.password, salt);

        // Fetch user data based on email
        const signUpData = await axios.get(
          `http://localhost:3000/users?email=${this.form.email}`
        );

        if (signUpData.data.length === 1) {
          const storeData = signUpData.data[0];
          const isMatched = bcrypt.compareSync(
            this.form.password,
            storeData.password
          );

          if (isMatched) {
            // Check if loginUser entry already exists for this email
            const userExit = await axios.get(
              `http://localhost:3000/loginUser?email=${this.form.email}`
            );

            if (userExit.data.length === 1) {
              // Update existing loginUser entry
              const existingUser = userExit.data[0];
              await axios.put(
                `http://localhost:3000/loginUser/${existingUser.id}`,
                {
                  email: this.form.email,
                  password: hash,
                  role: storeData.role,
                  status: this.form.status,
                }
              );
            } else {
              // Create new loginUser entry
              await axios.post("http://localhost:3000/loginUser", {
                email: this.form.email,
                password: hash,
                role: storeData.role,
                status: this.form.status,
              });
            }
            if (storeData.status === 0) {
              return false;
            }
            // Set user info in localStorage
            localStorage.setItem("user-info", JSON.stringify(storeData));
            // Redirect based on user role
            const selectRoute = storeData.role === "admin" ? "admin" : "home";
            this.$router.push({ name: selectRoute });
          } else {
            alert("Invalid credentials");
          }
        } else {
          alert("User not found");
        }
      } catch (error) {
        console.log("Error", error);
        alert("Enter valid credentials");
      }
    },
    mounted() {
      let user = localStorage.getItem("user-info");
      if (!user && this.$route.name !== "login") {
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>

<style>
.logo-adjust {
  margin-bottom: 20px;
  max-width: 130px;
  height: auto;
}
</style>

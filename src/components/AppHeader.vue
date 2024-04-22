<template>
  <div>
    <div>
      <b-navbar type="dark" class="bg-custom">
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/" class="text-white"> Home </router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/addProduct" class="text-white">
              Add Product
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="logout" class="text-white">Logout</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("user-info");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.bg-custom {
  background-image: linear-gradient(
    to left,
    #0b0537,
    #00376e,
    #006aa0,
    #00a1ca,
    #12d9eb
  );
}
</style>

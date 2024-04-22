<template>
  <div>
    <HomePage />
    <!-- <div v-if="isLoggedIn">
      {/* <AddTask /> */}
    </div> -->
  </div>
</template>

<script>
import HomePage from "../components/HomePage.vue";
{
  /* // import AddTask from "../components/AddTask.vue"; */
}
export default {
  components: {
    HomePage,
    // AddTask,
  },
  // computed: {
  //   isLoggedIn() {
  //     return !!localStorage.getItem("user-info");
  //   },
  // },
};
</script>

<style></style>

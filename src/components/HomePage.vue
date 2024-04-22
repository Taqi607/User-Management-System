<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5">
        <em><h1>Welcome to my Task Management Website</h1></em>
        <p>
          This website is designed to help you manage your tasks efficiently.
          Whether you're a student, a professional, or a business owner, this
          tool will assist you in keeping track of your tasks, categorizing
          them, and completing them as you go. Here's a brief overview of the
          features:
        </p>
        <ul>
          <li>
            <strong>Task Creation:</strong> Simply enter a description and
            select a category for your task. The task will be added to your task
            list.
          </li>
          <li>
            <strong>Task Management:</strong> View your tasks in a list format.
            You can delete tasks or update their status or category as needed.
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <div class="customised">
          <img src="../assets/Checklist.jpg" alt="todolist picture" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push("/login");
    }
    if (user) {
      this.$bvToast.toast("Login Successfully", {
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
  },
};
</script>

<style>
.customised img {
  max-width: 100%;
  height: auto;
}
</style>

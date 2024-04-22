<template>
  <div v-if="isLoggedIn">
    <div class="col-md-5 mt-4 container shadow p-3 mb-5 bg-white rounded">
      <h2>Add New Task</h2>
      <b-form @submit.prevent="addTask">
        <b-form-group label="Add Description">
          <b-form-input
            v-validate="{ required: true }"
            placeholder="Enter your description"
            v-model="newTask.desc"
            name="description"
          >
          </b-form-input>
          <div v-if="submitted" class="emessage">
            {{ errors.first("description") }}
          </div>
        </b-form-group>
        <b-form-group label="Select Categories">
          <b-form-select
            v-validate="{ required: true }"
            name="category"
            v-model="newTask.category"
            :options="categories"
          >
          </b-form-select>
          <div v-if="submitted" class="emessage">
            {{ errors.first("category") }}
          </div>
        </b-form-group>
        <b-button type="submit" variant="info"> Add</b-button>
      </b-form>

      <div class="mt-5">
        <h2>Task List</h2>
        <div class="d-flex flex-column">
          <div>
            <ul>
              <li v-for="(task, index) in tasks" :key="index">
                <div class="d-flex align-items-center">
                  <div>
                    {{ task.desc }},
                    <Strong style="color: green">{{ task.category }}</Strong>
                  </div>
                  <div class="ml-auto">
                    <div class="d-flex">
                      <div>
                        <b-button
                          @click="deleteTask(task.id)"
                          class="btn btn-sm btn-danger mr-3 mb-2"
                          ><i class="fa-solid fa-trash"></i
                        ></b-button>
                      </div>
                      <div>
                        <updateTask
                          :task-id="task.id"
                          :categories="categories"
                          :newTask="newTask"
                          @updateTask="handleTaskUpdated"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import updateTask from "./updateTask.vue";
export default {
  data() {
    return {
      newTask: {
        desc: "",
        category: null,
      },
      tasks: [],
      categories: [
        { value: null, text: "Select a category" },
        { value: "Personal", text: "Personal" },
        { value: "Work", text: "Work" },
        { value: "Business", text: "Businesss" },
        { value: "Gym", text: "Gym" },
      ],
      submitted: false,
    };
  },
  components: {
    updateTask,
  },

  created() {
    this.addition();
    this.tasks = [];
    this.fetchTask();
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("user-info");
    },
  },
  methods: {
    async addTask() {
      this.submitted = true;
      let result = await this.$validator.validate();
      if (this.newTask.desc && this.newTask.category && result) {
        try {
          const userId = localStorage.getItem("user-info");
          await axios.post("http://localhost:3000/tasks", {
            ...this.newTask,
            description: this.newTask.desc,
            category: this.newTask.category,
            userId: userId,
          });
          this.tasks.push({ ...this.newTask });
          this.newTask.desc = "";
          this.newTask.category = null;
          this.submitted = false;
          this.fetchTask(userId);
          // const newdata = result.data;
          // this.tasks.push(newdata);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("validation error");
      }
    },
    async addition() {
      try {
        let response = await axios.get("http://localhost:3000/tasks");
        this.tasks = response.data;
        this.tasks = response.data.filter(
          (task) => task.userId === this.userId
        );
      } catch (error) {
        console.log(error);
      }
    },

    async deleteTask(id) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${id}`);
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (error) {
        console.log(error);
      }
    },
    handleTaskUpdated(updatedTask) {
      if (updatedTask && updatedTask.id) {
        //check for updateTask is defined and have an id property
        const index = this.tasks.findIndex(
          // find the index of the id and update the task
          (task) => task.id === updatedTask.id
        );
        if (index !== -1) {
          this.$set(this.tasks, index, updatedTask); //$set method used to update the task if found
          console.log("Task updated successfullly");
        } else {
          console.log("Task not found in the tasks array");
        }
      } else {
        console.log(
          "Updated task is undefined or does not have an id property"
        );
      }
    },
    async fetchTask() {
      try {
        const userId = localStorage.getItem("user-info");
        const response = await axios.get(
          `http://localhost:3000/tasks?userId=${userId}`
        );
        this.tasks = response.data;
      } catch (error) {
        console.log("Something went wrong", error);
      }
    },
  },
};
</script>

<style>
.emessage {
  color: red;
}
</style>

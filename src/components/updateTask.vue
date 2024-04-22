<template>
  <div>
    <b-button
      variant="success"
      class="btn btn-sm btn-success mr-3 mb-2"
      @click="modalShow = !modalShow"
    >
      <i class="fa-regular fa-pen-to-square"></i>
    </b-button>
    <b-modal
      v-model="modalShow"
      @show="showModal"
      @hidden="handleHidden"
      @ok="handleSubmit"
    >
      <h3>Update Task</h3>
      <b-form>
        <b-form-group label="Description">
          <b-form-input
            placeholder="Enter Description"
            v-validate="{ required: true }"
            name="description"
            id="description"
            v-model="UpdateTask.desc"
          >
          </b-form-input>
          <div v-if="submitted" class="emessage">
            {{ errors.first("description") }}
          </div>
        </b-form-group>
        <b-form-group label="Select Category">
          <b-form-select
            v-validate="{ required: true }"
            name="category"
            id="category"
            v-model="UpdateTask.category"
            :options="categories"
          >
          </b-form-select>
          <div v-if="submitted" class="emessage">
            {{ errors.first("category") }}
          </div>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["taskId", "newTask", "categories"],
  data() {
    return {
      modalShow: false,
      UpdateTask: {
        id: null,
        desc: "",
        category: null,
      },
      submitted: false,
    };
  },
  methods: {
    showModal() {
      console.log("opened");
      this.UpdateTask = { ...this.newTask };
      this.UpdateTask.id = this.taskId;
      this.modelShow = true;
    },
    handleHidden() {
      console.log("hidden handle");
    },
    async handleSubmit(e) {
      e.preventDefault();
      this.submitted = true;
      const result = await this.$validator.validate();
      console.log(result);
      if (result) {
        try {
          await axios.put(
            `http://localhost:3000/tasks/${this.UpdateTask.id}`,
            this.UpdateTask
          );
          console.log("Task updated successfully");
          const response = await axios.get(
            `http://localhost:3000/tasks/${this.UpdateTask.id}`
          );
          this.$emit("updateTask", response.data);
          this.modalShow = false;
        } catch (error) {
          console.log("Error while updating data", error);
        }
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

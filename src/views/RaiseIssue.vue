<template>
  <div class="issue-form">
    <div class="header-text-box">
      <h1 class="tagline">Raise Issue</h1>
    </div>
    <div class="form-page">
      <div class="userform-text-box">
        <h2 class="text-box-tagline sub-heading">Submit Your Issue</h2>
        <hr />
        <form class="form" action="#">
          <div>
            <label>Task Name </label>
            <!-- <p class="task-name">A/B Testing on Sales Ads Campaign</p> -->
            <select
              id="task"
              size="1"
              v-model="selectedTask"
              required
              @change="printer"
            >
              <!-- v-model="selectedTask" @change="printer"> -->
              <option value="Default">--Choose a task--</option>
              <option
                v-for="task in taskOptions"
                :key="task.id"
                :value="task.id"
              >
                {{ task.title }}
              </option>
            </select>
          </div>

          <div>
            <label for="issue">Issue Title</label>
            <input
              id="issue"
              type="text"
              placeholder="Enter Issue Title"
              required
              v-model="title"
            />
          </div>

          <div>
            <label for="description">Description </label>
            <textarea
              id="description"
              rows="4"
              cols="50"
              placeholder="Describe your issue"
              v-model="description"
            ></textarea>
          </div>
          <div class="error" v-show="error !== ''">{{ error }}</div>
          <div class="success" v-show="success !== ''">{{ success }}</div>
          <SlotButton class="center-btn" @click="validate"
            >Raise Issue</SlotButton
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SlotButton from "@/components/SlotButton.vue";
import useDocument from "../composables/useDocument.js";
import getCollection from "../composables/getCollection";
import useCollection from "../composables/useCollection";
import { useRoute, useRouter } from "vue-router";
import { ref, watchEffect } from "vue";
import { db } from "../firebase/firebase";
import { useUserStore } from "../store/user";
import moment from "moment";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { timestamp } from "@/firebase/firebase";

export default {
  name: "Issue",
  components: {
    SlotButton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useUserStore();
    const userID = store.id;
    const userRole = store.role;
    const projectId = route.params.id;

    const { err, addDoc } = useCollection("Issue");

    // error and success messages
    const error = ref("");
    const success = ref("");

    // Issue data
    const title = ref("");
    const description = ref("");
    const selectedTask = ref("Default");

    // getting tasks which are assgined to employee for this project, which are still open
    var { documents: taskOptions } = getCollection(
      "Task",
      ["projectID", "==", projectId],
      ["employeeID", "==", userID],
      "openedTimestamp",
      null,
      "asc",
      ["status", "==", "Open"]
    );

    function printer() {
      console.log("selected task:", selectedTask.value);
    }

    // checking if form fields are valid
    function validate() {
      if (selectedTask.value == "Default") {
        error.value = "Please choose a task";
        success.value = "";
      } else if (title.value == "") {
        error.value = "Title cannot be empty";
        success.value = "";
      } else if (description.value == "") {
        error.value = "Description cannot be empty";
        success.value = "";
      } else {
        // console.log('function raiseIssue called')
        createIssue();
      }
    }

    async function createIssue() {
      try {
        // get task name from 'Task'
        const taskRef = db.collection("Task").doc(selectedTask.value);
        const taskDoc = await taskRef.get();

        // add new document to 'Issue'
        const res = await addDoc({
          closedTimestamp: null,
          description: description.value,
          employeeID: store.id,
          employeeName: store.name,
          openedTimestamp: timestamp(),
          projectID: projectId,
          status: "Open",
          taskID: selectedTask.value,
          taskName: taskDoc.data().title,
          title: title.value,
        });

        //update task 'hasIssue'
        await taskRef.update({
          hasIssue: true,
        });

        console.log(`issue ${title.value} created`);
        success.value = `Successfully raised issue ${title.value}`;
        title.value = "";
        description.value = "";
        selectedTask.value = "Default";
        error.value = "";
      } catch (err) {
        console.error(`Error adding `, err);
      }
    }

    return {
      userRole,
      title,
      description,
      projectId,
      selectedTask,
      taskOptions,
      printer,
      validate,
      error,
      success,
      createIssue,
    };
  },
};
</script>

<style scoped>
.issue-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 64px;
}

.header-text-box {
  align-self: center;
  margin-left: 3vw;
}

.tagline {
  margin-bottom: 32px;
  font-size: 44px;
  line-height: 1.1;
  letter-spacing: -1px;
}

.header-text {
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 1.7;
}

.sub-heading {
  font-size: 32px;
  font-weight: 600;
}

hr {
  border-top: 5px solid var(--primary);
  width: 100px;
  margin: 12px auto 24px auto;
}

.userform {
  font-size: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  overflow: hidden;
}

.userform-text-box {
  padding: 24px 48px;
  color: #555;
}

.form label {
  display: block;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}

.form input,
.form select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  font-family: inherit;
  color: inherit;
  border: none;
  border-radius: 9px;
  border: 0.1rem solid gray;
  margin-bottom: 16px;
}

.form input::placeholder {
  color: rgb(136, 136, 136);
}

textarea {
  width: 100%;
  padding-left: 8px;
  padding-top: 8px;
  font-size: 16px;
  border-radius: 9px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

textarea input::placeholder {
  color: rgb(136, 136, 136);
}

.text-box-tagline {
  text-align: center;
}

.userform *:focus {
  outline: none;
  box-shadow: 0 0 0 0.8rem rgba(253, 216, 255, 0.5);
}

.center-btn {
  display: flex;
  margin: auto;
  align-items: center;
  margin-top: 3vh;
}

.error {
  font-weight: 500;
  color: var(--warning);
  font-size: 14px;
  margin-bottom: 15px;
  text-align: center;
}

.success {
  font-weight: 500;
  color: #7ab975;
  font-size: 14px;
  margin-bottom: 15px;
  text-align: center;
}
</style>

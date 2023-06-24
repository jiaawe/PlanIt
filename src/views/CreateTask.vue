<template>
  <main>
    <section>
      <div class="container">
        <div class="issue-form">
          <div class="header-text-box">
            <h1 class="tagline">Fill in Task Details</h1>
          </div>
          <div class="form-page">
            <div class="userform-text-box">
              <h2 class="text-box-tagline sub-heading">Create Task</h2>
              <hr />
              <form class="form" action="#" @submit.prevent="handleSubmit">
                <div>
                  <label for="taskname">Task Name</label>
                  <input
                    id="taskname"
                    type="text"
                    placeholder="Enter Task Name"
                    v-model="title"
                    required
                  />
                </div>

                <div>
                  <label for="description">Description</label>
                  <textarea
                    id="description"
                    rows="4"
                    cols="50"
                    v-model="description"
                    placeholder="Describe your task"
                  ></textarea>
                </div>

                <div>
                  <label for="deadline">Deadline</label>
                  <input id="deadline" type="date" v-model="deadline" />
                </div>

                <div>
                  <label for="priority">Priority</label>
                  <select id="priority" v-model="priority">
                    <option value="" disabled selected>Select priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label for="file">Attachments</label>
                  <input
                    id="file"
                    type="file"
                    multiple
                    @change="addAttachments"
                  />
                </div>

                <div>
                  <label for="workload">Estimated Num. of Hours</label>
                  <input
                    id="workload"
                    type="number"
                    placeholder="Enter Estimated Num. of Hours"
                    v-model="estimatedHours"
                    required
                  />
                </div>
                <div>
                  <label for="collaborator"
                    >Select the employee to assign the task to:</label
                  >
                  <select
                    id="collaborator"
                    size="1"
                    v-model="selectedEmployee"
                  >
                    <option value="Default">--Choose an employee--</option>
                  </select>
                </div>
              </form>
              <br />
              <div class="create-task">
                <SlotButton @click="handleSubmit">Create Task</SlotButton>
              </div>

              <span class="error">{{ errorMsg }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import SlotButton from "../components/SlotButton.vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import useCollection from "../composables/useCollection";
import { timestamp } from "@/firebase/firebase";
import { db } from "../firebase/firebase.js";
import { ref } from "vue";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { uploadAttachments } from "../firebase/storage.js";

export default {
  name: "CreateTask",
  components: { SlotButton },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { id } = route.params;
    const store = useUserStore();
    const userID = store.id;
    const { error, addDoc } = useCollection("Task");
    const employeeIDs = ref("");

    // Form Data
    const title = ref("");
    const description = ref("");
    const deadline = ref("");
    const priority = ref("");
    const estimatedHours = ref("");
    const selectedEmployee = ref("");
    const projectName = ref("");
    const task_attachments = ref([]);
    const errorMsg = ref("")

    // Fetch involved employees in the current project for select input
    var projectRef = db.collection("Project").doc(id);
    projectRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          projectName.value = doc.data().name;
          employeeIDs.value = doc.data().employeeID;
          // console.log(doc.data().employeeID);
          var usersRef = db
            .collection("Users")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "in",
              doc.data().employeeID
            );
          usersRef
            .get()
            .then((querySnapshot) => {
              let options = {};
              querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                if (doc.id !== userID) {
                  options[doc.id] = doc.data().name;
                }
              });
              if (Object.keys(options).length == 0) {
                alert("Please add a member to the current project before creating new task")
              }
              // Adding employee id and name to the select input value
              var select = document.getElementById("collaborator");
              let arr;
              for (const index in options) {
                arr = [index, options[index]];
                select.options[select.options.length] = new Option(
                  options[index],
                  arr
                );
              }
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    const addAttachments = () => {
      task_attachments.value = document.getElementById("file").files;
    };

    const handleSubmit = async () => {
      // input validators for task form
      if (title.value.trim() == "") {
        errorMsg.value = 'Please enter a title';
      } else if (!deadline.value){
        errorMsg.value = 'Please select a deadline';
      } else if (new Date(deadline.value) < new Date) {
        errorMsg.value = 'Please select future date';
      } else if (priority.value.trim() == "") {
        errorMsg.value = "Please select a priority";
      } else if (estimatedHours.value == "") {
        errorMsg.value = "Please enter the estimated hour";
      } else if (employeeIDs.value.length <= 1) {
        errorMsg.value = 'Please add a member to this project'
      } else if (selectedEmployee.value == "Default") {
        errorMsg.value = "Please select an employee "
      } else {
        const res = await addDoc({
          title: title.value,
          description: description.value,
          status: "Open",
          deadline: new Date(deadline.value),
          priority: priority.value,
          estimatedHours: estimatedHours.value,
          employeeID: selectedEmployee.value.split(",")[0],
          employeeName: selectedEmployee.value.split(",")[1],
          managerID: userID,
          projectID: id,
          projectName: projectName.value,
          openedTimestamp: timestamp(),
          hasIssue: false,
          task_attachments: null,
          closedTimestamp: null,
          submittedTimestamp: null,
        });
        var attachments_url = await uploadAttachments(
          res.id,
          task_attachments.value
        );
        if (!error.value) {
          console.log("create task success");
          router.push("/Project/" + id + "/tasks");
        }
      }
    };

    return {
      title,
      description,
      deadline,
      priority,
      estimatedHours,
      selectedEmployee,
      handleSubmit,
      addAttachments,
      errorMsg
    };
  },

  methods: {},
};
</script>

<style scoped>
.issue-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 30px;
  margin-bottom: 50px;
  /* height: 100vh; */
}

.header-text-box {
  padding: 5vw;
  align-self: center;
  /* text-align: center; */
}

.tagline {
  margin-bottom: 32px;
  font-size: 4rem;
  line-height: 1.1;
  letter-spacing: -1px;
}

.sub-heading {
  font-size: 32px;
  font-weight: 600;
}

.form-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

hr {
  border-top: 5px solid var(--primary);
  width: 100px;
  margin: 12px auto 24px auto;
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

.create-task {
  display: flex;
  width: 100%;
  justify-content: center;
}

.error {
  color: var(--warning);
  font-size: 14px;
  margin: 16px 0 0 0;
  text-align: center;
  display: block;
}
</style>

<template>
  <main>
    <section>
      <div class="container">
        <div class="issue-form">
          <div class="header-text-box">
            <h1 class="tagline">Task Details</h1>
          </div>
          <div class="form-page">
            <div class="userform-text-box">
              <h2 class="text-box-tagline sub-heading">Overview</h2>
              <hr />
              <form class="form" action="#">
                <div class="field">
                  <label for="taskname">Task Name</label>
                  <input
                    class="input"
                    v-if="editMode"
                    id="title"
                    type="text"
                    v-model="title"
                  />
                  <p v-else class="field-input">{{ title }}</p>
                </div>

                <div class="field">
                  <label for="description">Description</label>
                  <textarea
                    class="input"
                    v-if="editMode"
                    id="description"
                    rows="4"
                    cols="50"
                    v-model="description"
                  ></textarea>
                  <p v-else class="field-input">{{ description }}</p>
                </div>

                <div class="field">
                  <label for="deadline">Deadline</label>
                  <input
                    class="input"
                    v-if="editMode"
                    id="deadline"
                    type="date"
                    v-model="deadlineInput"
                  />
                  <p v-else class="field-input">
                    {{ deadline.toDate().toLocaleDateString() }}
                  </p>
                </div>

                <div class="field">
                  <label for="priority">Priority</label>
                  <select
                    class="input"
                    v-if="editMode"
                    id="priority"
                    v-model="priority"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <p v-else class="field-input">{{ priority }}</p>
                </div>

                <div class="field">
                  <label
                    for="status"
                    v-if="
                      !editMode || (editMode && status !== 'Pending Review')
                    "
                    >Status</label
                  >
                  <select
                    class="input"
                    v-if="editMode && status !== 'Pending Review'"
                    id="status"
                    v-model="status"
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <p v-if="!editMode" class="field-input">{{ status }}</p>
                </div>

                <!-- <div class="field">
                    <label for="file">Attachments</label>
                    <p class="field-input" v-if="!taskDetails.attachments.length"> None </p>
                    <p class="field-input" v-else v-for="file in taskDetails.attachments" :key = 'file.id'> {{ file }} </p>
                  </div> -->

                <div class="field" v-if="status !== 'Closed'">
                  <label for="workload">Estimated Num. of Hours</label>
                  <input
                    class="input"
                    v-if="editMode"
                    id="workload"
                    type="number"
                    v-model="estimatedHours"
                    required
                  />
                  <p v-else class="field-input">{{ estimatedHours }}</p>
                </div>

                <div class="field" v-if="status == 'Closed'">
                  <label for="closedTimestamp">Closed Date</label>
                  <p class="field-input">
                    {{ closedTimestamp.toDate().toLocaleDateString() }}
                  </p>
                </div>

                <div class="field">
                  <label for="collaborator">Assigned Employee</label>
                  <select
                    class="input"
                    id="collaborator"
                    v-show="editMode"
                    size="1"
                    v-model="selectedEmployee"
                    @change="printer"
                  ></select>
                  <p v-if="!editMode" class="field-input">{{ employeeName }}</p>
                </div>

                <div class="field additional-attachments" v-if="editMode">
                  <label for="file field-input">Additional Attachments</label>
                  <input
                    id="file"
                    type="file"
                    multiple
                    @change="addAttachments"
                  />
                </div>

                <div class="field">
                  <label for="attachments">Attached Files</label>
                  <p v-if="task_attachments.length == 0" class="field-input">
                    No Attachments Found
                  </p>
                  <ul
                    v-else-if="!editMode"
                    v-for="(file, index) in task_attachments"
                    :key="index"
                    class="field-input"
                  >
                    <a
                      :href="file.url"
                      :download="file.name"
                      style="text-decoration: none"
                      target="_blank"
                    >
                      {{ file.name }}
                    </a>
                  </ul>
                  <ul
                    v-else
                    v-for="(file, index) in task_attachments"
                    :key="file.name"
                    class="icon-container"
                  >
                    <span
                      v-if="!file.hide"
                      class="material-symbols-outlined submit"
                      @click="toggleHide(index)"
                      >delete</span
                    >
                    <span v-if="!file.hide">{{ file.name }}</span>
                  </ul>
                </div>
              </form>
              <br />
              <div class="edit-task">
                <SlotButton v-if="editMode" @click="handleEdit"
                  >Submit Change</SlotButton
                >
                <SlotButton
                  v-if="
                    !editMode && userRole == 'manager' && status !== 'Closed'
                  "
                  @click="toggleEdit"
                  >Edit Task</SlotButton
                >
                <SlotButton
                  v-if="
                    !editMode &&
                    userRole == 'manager' &&
                    status == 'Closed' &&
                    !isClosed
                  "
                  @click="handleReopen"
                  >Reopen Task</SlotButton
                >

                <SlotButton
                  v-if="
                    editMode && userRole == 'manager' 
                  "
                  @click="cancelEdit"
                  >Cancel</SlotButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import SlotButton from "../components/SlotButton.vue";
import useDocument from "../composables/useDocument.js";
import { useRoute, useRouter } from "vue-router";
import { ref, watchEffect, watch, onMounted } from "vue";
import { db } from "../firebase/firebase";
import { useUserStore } from "../store/user";
import moment from "moment";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import {
  getFilesFromPath,
  uploadAttachments,
  deleteAttachments,
} from "../firebase/storage";

export default {
  name: "TaskDetails",

  components: { SlotButton },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useUserStore();
    const userID = store.id;
    const userRole = store.role;
    var updateKey = 0;

    // Task data
    const error = ref(null);
    const title = ref("");
    const description = ref("");
    const deadline = ref(moment());
    const employeeName = ref("");
    const priority = ref("");
    const status = ref("");
    const deadlineInput = ref("");
    const estimatedHours = ref(0);
    const selectedEmployee = ref("");
    const closedTimestamp = ref(moment());
    const task_attachments = ref([]);
    const added_attachments = ref([]);
    const employeeIDs = ref("");

    const isClosed = ref(false);

    var taskRef = db.collection("Task").doc(route.params.taskid);
    const { deleteDoc, updateDoc } = useDocument("Task", route.params.taskid);

    // convert date string formatting
    function convertDate(date) {
      let dateStr = date.toDate().toLocaleDateString();
      return dateStr.split("/").reverse().join("-");
    }

    // Fetch task details
    const unsub = taskRef.onSnapshot(
      (doc) => {
        if (doc.data()) {
          title.value = doc.data().title;
          description.value = doc.data().description;
          deadline.value = doc.data().deadline;
          employeeName.value = doc.data().employeeName;
          priority.value = doc.data().priority;
          status.value = doc.data().status;
          estimatedHours.value = doc.data().estimatedHours;
          deadlineInput.value = convertDate(doc.data().deadline);
          selectedEmployee.value =
            doc.data().employeeID + "," + doc.data().employeeName;
          closedTimestamp.value = doc.data().closedTimestamp;
          error.value = null;
          getFilesFromPath("task/" + route.params.taskid).then((result) => {
            task_attachments.value = result;
          });
        } else {
          error.value = "that document does not exist";
        }
      },
      (err) => {
        console.log(err.message);
        error.value = "problem fetching the document";
      }
    );

    watchEffect((onInvalidate) => {
      onInvalidate(() => unsub());
    });

    // fetch involved employees for select input
    var projectRef = db.collection("Project").doc(route.params.id);
    projectRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          employeeIDs.value = doc.data().employeeID;
          isClosed.value = doc.data().closedTimestamp !== null;
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
              console.log("options", options);
              var select = document.getElementById("collaborator");
              let arr;
              for (let index in options) {
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

    const editMode = ref(false);

    // edit mode toggler
    const toggleEdit = () => {
      editMode.value = !editMode.value;
    };

    // hide attachments toggler
    const toggleHide = (index) => {
      task_attachments.value[index].hide = true;
    };

    // edit task handler
    const handleEdit = async () => {
      var deleted_task_attachments = task_attachments.value.filter(
        (val) => val.hide
      );
      if (deleted_task_attachments.length) {
        deleteAttachments(route.params.taskid, deleted_task_attachments);
      }
      var new_task_attachments = task_attachments.value.filter(
        (val) => !val.hide
      );
      if (added_attachments.value.length) {
        var uploaded_attachments = await uploadAttachments(
          route.params.taskid,
          added_attachments.value
        );
        uploaded_attachments.forEach((file) => {
          let strings = file.split("<firebasename:firebaseurl>");
          new_task_attachments.push({
            name: strings[0],
            url: strings[1],
          });
        });
      }
      added_attachments.value = [];
      task_attachments.value = new_task_attachments.sort(function (
        first,
        second
      ) {
        return second.name > first.name ? -1 : 1;
      });
      await updateDoc({
        title: title.value,
        description: description.value,
        deadline: new Date(deadlineInput.value),
        employeeName: selectedEmployee.value.split(",")[1],
        employeeID: selectedEmployee.value.split(",")[0],
        priority: priority.value,
        status: status.value,
        estimatedHours: estimatedHours.value,
      });
      editMode.value = false;
    };

    // Reopen task handler
    const handleReopen = async () => {
      await updateDoc({
        status: "Open",
      });
      editMode.value = true;
      alert("Please update the deadline of this task");
    };

    // add attachments
    const addAttachments = () => {
      added_attachments.value = document.getElementById("file").files;
    };

    // cancel edit, reload page
    const cancelEdit = async () => {
      router.go()
    }

    return {
      editMode,
      title,
      description,
      deadline,
      employeeName,
      priority,
      status,
      estimatedHours,
      toggleEdit,
      handleEdit,
      deadlineInput,
      selectedEmployee,
      userRole,
      handleReopen,
      closedTimestamp,
      task_attachments,
      toggleHide,
      addAttachments,
      added_attachments,
      isClosed,
      cancelEdit
    };
  },
};
</script>

<style scoped>
.issue-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 50px;
  margin-bottom: 50px;
}
.header-text-box {
  padding: 5vw;
  align-self: center;
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
/* .userform {
  font-size: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  overflow: hidden;
} */
.userform-text-box {
  padding: 24px 48px;
  color: #555;
}
.text-box-tagline {
  text-align: center;
}
.userform *:focus {
  outline: none;
  box-shadow: 0 0 0 0.8rem rgba(253, 216, 255, 0.5);
}
.field {
  margin-bottom: 2rem;
}
.field-input {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 0.7rem;
}
#collaborator {
  margin-bottom: 16px;
}
.edit-task {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.input {
  margin-bottom: -1rem;
}

.submit {
  margin: 0;
  float: left;
}

.additional-attachments {
  margin-bottom: 0;
}

.icon-container {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
}
</style>

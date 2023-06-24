<template>
  <main>
    <section>
      <div class="container">
        <div class="issue-form">
          <div class="header-text-box">
            <h1 class="tagline">Issue Details</h1>
          </div>
          <div class="form-page">
            <div class="userform-text-box">
              <h2 class="text-box-tagline sub-heading">Overview</h2>
              <hr />
              <form class="form" action="#">
                <div class="field">
                  <label for="taskname">Issue Title</label>
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
                  <label for="taskname">Task Name</label>
                  <input
                    class="input"
                    v-if="editMode"
                    id="title"
                    type="text"
                    v-model="taskName"
                  />
                  <p v-else class="field-input">{{ taskName }}</p>
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
                  <label for="deadline">Date Created</label>
                  <input
                    class="input"
                    v-if="editMode"
                    id="deadline"
                    type="date"
                  />
                  <p v-else class="field-input">
                    {{ openedTimestamp.toDate().toLocaleDateString() }}
                  </p>
                </div>

                <div class="field">
                  <label for="deadline">Date Closed</label>
                  <input
                    class="input"
                    v-if="editMode"
                    id="deadline"
                    type="date"
                  />
                  <p v-else-if="closedTimestamp == null" class="field-input">
                    -
                  </p>
                  <p v-else class="field-input">
                    {{ closedTimestamp.toDate().toLocaleDateString() }}
                  </p>
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

                <div class="field">
                  <label for="description">Raised by:</label>
                  <textarea
                    class="input"
                    v-if="editMode"
                    id="description"
                    rows="4"
                    cols="50"
                  ></textarea>
                  <p v-else class="field-input">{{ employeeName }}</p>
                </div>
              </form>
              <br />
              <div class="success" v-show="success !== ''">{{ success }}</div>
              <div class="resolve-issue">
                <SlotButton
                  v-if="userRole == 'manager' && status == 'Open' && !isClosed"
                  @click="closeIssue"
                  >Mark as resolved</SlotButton
                >
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
import getCollection from "../composables/getCollection";
import { useRoute, useRouter } from "vue-router";
import { ref, watchEffect } from "vue";
import { db } from "../firebase/firebase";
import { useUserStore } from "../store/user";
import moment from "moment";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { timestamp } from "@/firebase/firebase";

export default {
  name: "IssueDetails",

  components: { SlotButton },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useUserStore();
    const userID = store.id;
    const userRole = store.role;
    const projectId = route.params.id;
    const issueId = route.params.issuesid;
    const editMode = ref(false);
    const success = ref("");

    // Issue data
    const error = ref(null);
    const title = ref("");
    const description = ref("");
    const openedTimestamp = ref(moment());
    const closedTimestamp = ref(moment());
    const employeeId = ref("");
    const status = ref("");
    const taskId = ref("");
    const taskName = ref("");
    const employeeName = ref("");

    const isClosed = ref(false);

    // getting issue details
    var issueRef = db.collection("Issue").doc(issueId);
    issueRef.onSnapshot((doc) => {
      try {
        if (doc.exists) {
          title.value = doc.data().title;
          description.value = doc.data().description;
          openedTimestamp.value = doc.data().openedTimestamp;
          closedTimestamp.value = doc.data().closedTimestamp;
          employeeId.value = doc.data().employeeID;
          status.value = doc.data().status;
          taskId.value = doc.data().taskID;
          taskName.value = doc.data().taskName;
          employeeName.value = doc.data().employeeName;
          error.value = null;
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    });

    const projectRef = db.collection("Project").doc(projectId);
    projectRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          isClosed.value = doc.data().closedTimestamp !== null;
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    // Close issue
    async function closeIssue() {
      try {
        // get issue
        const issueRef = db.collection("Issue").doc(issueId);
        const issueDoc = await issueRef.get();

        //update issue
        await issueRef.update({
          closedTimestamp: timestamp(),
          status: "Closed",
        });

        // update 'hasIssue' (if task still has any other open issues)
        const openIssues = ref([]);
        const snapshot = await db
          .collection("Issue")
          .where("taskID", "==", taskId.value)
          .where("status", "==", "Open")
          .get();
        openIssues.value = snapshot.docs.map((doc) => doc.data());
        console.log(`task has ${openIssues.value.length} open issues`);

        const taskRef = db.collection("Task").doc(taskId.value);
        const taskDoc = await taskRef.get();
        await taskRef.update({
          hasIssue: openIssues.value.length != 0,
        });

        success.value = `Successfully resolved issue: ${title.value}`;
        console.log(`closed issue ${issueId}`);
      } catch (err) {
        console.error(err);
      }
    }

    return {
      userRole,
      editMode,
      title,
      description,
      openedTimestamp,
      closedTimestamp,
      employeeId,
      status,
      taskId,
      taskName,
      error,
      employeeName,
      success,
      closeIssue,
      isClosed,
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
.resolve-issue {
  display: flex;
  width: 100%;
  justify-content: center;
}

.input {
  margin-bottom: -1rem;
}

.success {
  font-weight: 500;
  color: #7ab975;
  font-size: 14px;
  margin-bottom: 15px;
  text-align: center;
}
</style>

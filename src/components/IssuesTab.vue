<template>
  <div class="issue-container">
    <div class="issue-header">
      <h1 class="issue-title-h1">Issues</h1>
    </div>
    <div class="search-bar">
      <input
        type="text"
        class="search-input"
        placeholder="Search Issue"
        v-model="filter"
      />
      <!-- raise issue button appear only for employees -->
      <SlotButton
        v-if="user.role === 'employee' && !isClosed"
        @click="this.$router.push(`/Project/${projectId}/raise-issue`)"
        >Raise Issue</SlotButton
      >
    </div>
    <div class="issue-table">
      <div class="table-header">
        <button class="flex" @click="changeView(true)">
          <span class="material-symbols-outlined"> bug_report </span>
          <span class="open" v-if="openIssues">
            {{ openIssues.length }} Open</span
          >
        </button>
        <button class="flex" @click="changeView(false)">
          <span class="material-symbols-outlined"> done </span>
          <span class="close" v-if="closedIssues">
            {{ closedIssues.length }} Closed</span
          >
        </button>
      </div>
      <div class="issue-list">
        <div
          class="issue-card"
          v-show="showOpened"
          v-for="issue in filteredOpen"
          :key="issue.id"
          @click="this.$router.push(`/Project/${projectId}/issues/${issue.id}`)"
        >
          <div class="issue-card-header">
            <span>{{ issue.title }} </span>
            <div class="delete-btn">
              <span
                class="material-symbols-outlined"
                v-if="issue.employeeID == user.id"
                @click.stop="deleteIssue(issue.id, issue.taskID)"
              >
                delete
              </span>
            </div>
          </div>
          <div class="issue-card-content">
            <span class="task-desc">Task: {{ issue.taskName }} </span>
            <span class="date-created">
              Created: {{ issue.openedTimestamp.toDate().toLocaleDateString() }}
            </span>
          </div>
        </div>
        <div v-if="filteredOpen.length == 0 && showOpened" class="empty">
          No Open Issues
        </div>
        <div
          class="issue-card"
          v-show="!showOpened"
          v-for="issue in filteredClosed"
          :key="issue.id"
          @click="this.$router.push(`/Project/${projectId}/issues/${issue.id}`)"
        >
          <div class="issue-card-header">
            <span>{{ issue.title }} </span>
          </div>
          <div class="issue-card-content">
            <span class="task-desc">Task: {{ issue.taskName }} </span>
            <span class="date-created">
              Created: {{ issue.openedTimestamp.toDate().toLocaleDateString() }}
            </span>
          </div>
        </div>
        <div v-if="filteredClosed.length == 0 && !showOpened" class="empty">
          No Closed Issues
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SlotButton from "./SlotButton.vue";
import RaiseIssue from "@/views/RaiseIssue.vue";
import { useRoute, RouterView, RouterLink, useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import { ref, watchEffect, computed } from "vue";
import { db } from "../firebase/firebase.js";
import getCollection from "../composables/getCollection";
import { timestamp } from "@/firebase/firebase";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";

export default {
  name: "Issues Tab",
  components: {
    SlotButton,
    RaiseIssue,
  },
  setup() {
    const route = useRoute();
    const user = useUserStore();

    const { id: projectId } = route.params;
    const showOpened = ref(true);
    const filter = ref("");
    const documents = ref([]);
    const isClosed = ref(false);

    // Fetching all issues and store in 'documents'
    const getDocuments = async () => {
      const q = query(collection(db, "Issue"), orderBy("openedTimestamp"));
      const querySnapshot = await getDocs(q);
      documents.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    };
    getDocuments();

    // Filter issues based on open status
    const filteredOpen = computed(() => {
      const open = documents.value.filter((document) => {
        return document.status == "Open" && document.projectID == projectId;
      });
      if (!filter.value) {
        return open;
      } else {
        const filtered = documents.value.filter((document) => {
          const title = document.title.toLowerCase();
          const search = filter.value.toLowerCase();
          return (
            document.status == "Open" &&
            document.projectID == projectId &&
            title.includes(search)
          );
        });
        return filtered;
      }
    });

    // Filter issues based on close status
    const filteredClosed = computed(() => {
      const closed = documents.value.filter((document) => {
        return document.status == "Closed" && document.projectID == projectId;
      });
      if (!filter.value) {
        return closed;
      } else {
        const filtered = documents.value.filter((document) => {
          const title = document.title.toLowerCase();
          const search = filter.value.toLowerCase();
          return (
            document.status == "Closed" &&
            document.projectID == projectId &&
            title.includes(search)
          );
        });
        return filtered;
      }
    });

    // Get list open and closed issues
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

    var { documents: openIssues } = getCollection(
      "Issue",
      ["projectID", "==", projectId],
      ["status", "==", "Open"],
      "openedTimestamp"
    );
    var { documents: closedIssues } = getCollection(
      "Issue",
      ["projectID", "==", projectId],
      ["status", "==", "Closed"],
      "openedTimestamp"
    );

    // whether to show open or closed issues
    function changeView(view) {
      showOpened.value = view;
    }

    // Delete issue
    async function deleteIssue(issueId, taskId) {
      try {
        //delete issue
        const issueRef = db.collection("Issue").doc(issueId);
        await issueRef.delete();

        //update 'hasIssue' for associated task
        const openIssues = ref([]);
        const snapshot = await db
          .collection("Issue")
          .where("taskID", "==", taskId)
          .where("status", "==", "Open")
          .get();
        openIssues.value = snapshot.docs.map((doc) => doc.data());
        console.log(`task has ${openIssues.value.length} open issues`);

        const taskRef = db.collection("Task").doc(taskId);
        const taskDoc = await taskRef.get();
        await taskRef.update({
          hasIssue: openIssues.value.length != 0,
        });

        getDocuments();
        console.log(`Issue ${issueId} deleted`);
      } catch (error) {
        console.error("Error deleting issue:", error);
      }
    }

    return {
      user,
      projectId,
      showOpened,
      openIssues,
      closedIssues,
      changeView,
      deleteIssue,
      filter,
      filteredOpen,
      filteredClosed,
      isClosed,
    };
  },
};
</script>

<style scoped>
.issue-container {
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin-bottom: 10vh;
}

.issue-header {
  margin-left: 4rem;
}

.issue-title-h1 {
  margin: 4rem 0 1rem 0;
  font-size: 3rem;
}

.search-bar {
  justify-content: space-between;
  display: flex;
  margin: 2rem 4rem 0 0;
}

.search-input[type="text"] {
  box-sizing: content-box;
  border-radius: 5px;
  /* width: 10%; */
  width: 20%;
  height: 3.5rem;
  min-width: 100px;
  margin: 0.5rem 2rem 0 4rem;
  padding-left: 1rem;
  background-color: rgb(228, 228, 228);
  /* margin-left: 4rem; */
  background-image: url("../assets/search-icon.webp");
  background-size: 1.75rem;
  background-position: 95%;
  background-repeat: no-repeat;
  font-size: 1.5rem;
  /* padding: 14px 20px 12px 45px; */
  border: 1px solid rgb(187, 187, 187);
  /* margin-right: 2rem; */
}

.issue-table {
  display: block;
  margin: 2rem 4rem 0 4rem;
  background-color: #e4e4e4;
  border-radius: 5px;
}

.table-header {
  padding: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  border-bottom: 2px solid white;
}

.flex {
  display: flex;
  align-items: center;
  margin-right: 2rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: transparent;
  border: 1.5px solid #e4e4e4;
}

.flex:hover {
  cursor: pointer;
  background-color: rgb(240, 240, 240);
}

.flex:focus {
  cursor: pointer;
  border: 1.5px solid white;
  font-weight: bold;
}

.issue-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
}

.issue-card {
  padding: 1.5rem;
  margin-bottom: 1rem;
  width: 97.5%;
  background-color: rgb(253, 246, 246);
  min-height: 70px;
}

.issue-card:hover {
  box-shadow: 2px 2px 2px rgb(177, 177, 177);
  cursor: pointer;
  background-color: rgb(250, 233, 233);
}

.issue-card-header {
  font-size: 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.issue-card-content {
  display: flex;
  justify-content: space-between;
  margin-top: 2px;
}

.task-desc,
.date-created {
  margin-top: 0.5rem;
  font-size: 1.4rem;
  color: rgb(142, 142, 142);
}

.delete-btn:hover {
  background-color: #848484;
}

.empty {
  margin: 1.5rem;
  font-size: 1.6rem;
  border-radius: 5px;
  font-weight: 500;
}
</style>

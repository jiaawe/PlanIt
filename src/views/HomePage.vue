<template>
  <main>
    <NavBar />
    <div class="project-header">
      <h2 class="header-title">Projects</h2>
      <!-- <button class="create-btn">Create Project</button> -->
      <SlotButton
        class="create-btn"
        v-if="user && userRole === 'manager'"
        @click="this.$router.push('/CreateProject')"
        >Create Project</SlotButton
      >
    </div>
    <div class="project-subheader">
      <div>
        <input type="text" class="search-bar" placeholder="Search Project" v-model="filter" />
      </div>
    </div>
    <div class="main-container">
      <div class="table-container">
        <table class="table" id="table">
          <tr class="table-head">
            <th class="namecol">Name</th>
            <th class="owncol">Owner</th>
            <th class="createcol">Deadline</th>
            <th class="createcol">Status</th>
          </tr>
          <tr
            v-for="project in filteredProject"
            :key="project.id"
            @click="this.$router.push(`/Project/${project.id}/tasks`)"
            class="row-data"
            :class="{ closed: project.closedTimestamp }"
          >
            <td>{{ project.name }}</td>
            <td>{{ project.managerName }}</td>
            <td
              :class="{
                overdue:
                  !project.closedTimestamp &&
                  new Date() > project.deadline.toDate(),
              }"
            >
              {{ project.deadline.toDate().toLocaleDateString() }}
            </td>
            <td>{{ project.status }}</td>
          </tr>
        </table>
      </div>
      <div class="timeline">
        <h3 class="tl-head">Upcoming Task</h3>
        <br />
        <hr />
        <ul class="scroll-view">
          <div
            v-for="task in tasks"
            :key="task.id"
            class="card"
            @click="navToTask(task.id, task.projectID)"
            v-show="task.status != 'Closed'"
          >
            <h3 class="task-title">{{ task.title }}</h3>
            <span class="project-title"
              ><u>{{ task.projectName }}</u></span
            >
            <span
              class="due"
              :class="{ overdue: new Date() > task.deadline.toDate() }"
              >{{ task.deadline.toDate().toLocaleDateString() }}</span
            >
          </div>
        </ul>
        <br />
        <hr />
      </div>
    </div>
  </main>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SlotButton from "../components/SlotButton.vue";
import getUser from "../composables/getUser";
import getCollection from "../composables/getCollection";
import { useUserStore } from "../store/user";
import { ref, computed, watchEffect, onMounted, watch } from "vue";
import { auth, db } from "../firebase/firebase.js";
import { useRouter } from "vue-router";

export default {
  name: "HomePage",
  components: { SlotButton, NavBar },
  setup() {
    const { user } = getUser();
    const store = useUserStore();
    const router = useRouter();
    const filter = ref("");
    const projects = ref([]);
    const tasks = ref([]);
    const userRole = computed(() => store.role);

    // Fetch user's task based on user role
    const fetchData = async () => {
      user.value = auth.currentUser;
      let query;
      if (store.role === "manager") {
        query = db
          .collection("Task")
          .where("managerID", "==", user.value.uid)
          .orderBy("deadline");
      } else {
        query = db
          .collection("Task")
          .where("employeeID", "==", user.value.uid)
          .orderBy("deadline");
      }
      const querySnapshot = await query.get();
      const result = [];
      querySnapshot.forEach((doc) => {
        result.push({ ...doc.data(), id: doc.id });
      });
      tasks.value = result;
    };
    watch(
      [user, userRole],
      async (values, prevValues, onInvalidate) => {
        if (values[0] && values[1]) {
          await fetchData();
        }
      },
      { immediate: true }
    );

    // Fetch user's project
    const projectsRef = db
      .collection("Project")
      .where("employeeID", "array-contains", user.value.uid)
      .orderBy("deadline");

    const unsub = projectsRef.onSnapshot(
      (snap) => {
        let projectList = [];
        let status;
        snap.docs.forEach((doc) => {
          if (doc.data().closedTimestamp) {
            status = "Closed";
          } else {
            status = "Open";
          }
          projectList.push({ ...doc.data(), id: doc.id, status });
        });
        projects.value = projectList;
      },
      (err) => {
        console.log(err.message);
      }
    );

    watchEffect((onInvalidate) => {
      onInvalidate(() => unsub());
    });

    // Project Comparator to sort open project before closed projects
    function projectComparator(project1, project2) {
      if (!project1.closedTimestamp && project2.closedTimestamp) {
        return -1;
      } else if (project1.closedTimestamp && !project2.closedTimestamp) {
        return 1;
      }
    }

    // filter predicate for search
    function predicate(project) {
      if (filter.value.length > 0) {
        return (
          project.name.toLowerCase().indexOf(filter.value.toLowerCase()) > -1 ||
          project.managerName
            .toLowerCase()
            .indexOf(filter.value.toLowerCase()) > -1
        );
      }
      return true;
    }

    // computed filtered projects filter and sort
    const filteredProject = computed(() =>
      projects.value
        .filter((project) => predicate(project))
        .sort(projectComparator)
    );

    // navigate function to task details page from homepage
    const navToTask = (taskId, projectId) => {
      router.push("/Project/" + projectId + "/task/" + taskId);
    };
    return { user, userRole, filter, tasks, navToTask, filteredProject };
  },
};
</script>

<style scoped>
input,
textarea {
  background-color: #e6e7f0;
  height: 1.5rem;
  border: 0;
  border-radius: 8px;
  padding: 10px;
  outline: none;
  display: block;
  width: 15vw;
  margin: 20px auto;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7rem;
  margin-top: 3rem;
}

.header-title {
  margin-left: 4rem;
  font-size: 3rem;
}

.create-btn {
  margin-right: 4rem;
}

.project-subheader {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
}

.search-bar {
  box-sizing: content-box;
  border-radius: 5px;
  /* width: 10%; */
  width: 15vw;
  min-width: 150px;
  margin: 0 2rem 0 4rem;
  background-color: rgb(255, 255, 255);
  /* margin-left: 4rem; */
  background-image: url("../assets/search-icon.webp");
  background-size: 2rem;
  background-position: 95%;
  background-repeat: no-repeat;
  font-size: 1.3rem;
  /* padding: 14px 20px 12px 45px; */
  border: 2px solid rgb(178, 176, 176);
  /* margin-right: 2rem; */
}

.dropbtn {
  box-sizing: content-box;
  border-radius: 0;
  width: 150px;
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
}

.main-container {
  /* background-color: rgb(96, 124, 148); */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.timeline {
  max-width: 30vw;
  flex-grow: 3;
  /* background-color: burlywood; */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table-container {
  flex-grow: 7;
  margin-left: 4rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.table {
  width: 95%;
  border-bottom: 2px solid rgba(186, 212, 186, 0.82);
}

th {
  border-top: 0;
  border-bottom: 2px solid rgba(186, 212, 186, 0.82);
  height: 30px;
  font-size: 1.75rem;
  text-align: start;
}

td {
  font-size: 1.4rem;
  padding: 0.5rem;
}

.overdue {
  color: red;
}

table {
  border-collapse: separate;
  border-spacing: 0.5rem;
}

.closed {
  background-color: rgb(225, 225, 239);
}

.closed:hover {
  background-color: rgb(231, 231, 231);
}

.namecol {
  border-left: 0;
  width: 35%;
}

.owncol {
  width: 30%;
}

.row-data:hover {
  background-color: rgb(231, 231, 231);
  cursor: pointer;
}

.tl-head {
  /* border-bottom: 2px solid #555; */
  font-size: 1.75rem;
  align-self: center;
}

hr {
  width: 95%;
  height: 2px;
  background-color: rgba(186, 212, 186, 0.82);
  border: none;
}

.scroll-view {
  width: 100%;
  max-height: 50vh;
  overflow-y: scroll;
}

.card {
  width: 90%;
  margin-top: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  padding: 2rem 1.5rem;
  margin-left: auto;
  margin-right: auto;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.task-title {
  font-size: 1.5rem;
  word-wrap: normal;
  margin-bottom: 0.5rem;
}

.project-title {
  font-size: 1.5rem;
  display: block;
  margin-bottom: 0.5rem;
}

.due {
  font-size: 1.25rem;
}
</style>

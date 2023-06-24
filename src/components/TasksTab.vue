<template>
  <div class="project-container">
    <div class="project-header">
      <div class="project-header-top">
        <div>
          <h1 class="project-title-h1">{{ projectTitle }}</h1>
          <div class="users-menu">
            <div
              class="user"
              @mouseover="showManagerTooltip = true"
              @mouseout="showManagerTooltip = false"
            >
              {{ shortHandm }}
              <div
                class="tooltip"
                :id="'tooltip-' + managerID"
                :class="{ 'tooltip-visible': showManagerTooltip }"
              >
                {{ managerName }}
              </div>
            </div>
            <div
              class="user employee"
              v-for="user in users"
              :key="user.id"
              :title="user.name"
              @mouseover="showTooltip(user.id)"
              @mouseout="hideTooltip(user.id)"
            >
              {{ user.shortName }}
              <div
                class="tooltip"
                :id="'tooltip-' + user.id"
                v-if="user.showTooltip"
              >
                {{ user.name }}
              </div>
            </div>
            <div
              v-if="!isClosed"
              class="user add"
              @click="this.$router.push(`/Project/${id}/add-member`)"
            >
              <span class="material-symbols-outlined"> person_add </span>
            </div>
          </div>
        </div>
        <SlotButton
          v-if="userRole === 'manager' && !isClosed"
          @click="createTask"
          >Create Task</SlotButton
        >
      </div>
      <div class="search-bar">
        <input
          type="text"
          class="search-input"
          placeholder="Search task"
          v-model="filter"
        />
      </div>
    </div>
    <div class="task-container">
      <div class="col">
        <div class="section-title">
          <span>Open</span>
          <span
            v-if="filterUserOpen"
            class="material-symbols-outlined sort"
            @click="toggleUserTask('open')"
          >
            person
          </span>
          <span
            v-else
            class="material-symbols-outlined sort"
            @click="toggleUserTask('open')"
          >
            group
          </span>
        </div>
        <div v-if="openTasksFiltered.length == 0" class="empty">
          No Open Task
        </div>
        <div class="card-container">
          <TaskCard
            v-for="task in openTasksFiltered"
            :key="task.id"
            :userRole="store.role"
            v-bind="task"
            class="card"
          />
        </div>
      </div>

      <div class="col">
        <div class="section-title">
          <span>Pending Review </span>
          <span
            v-if="filterUserPendingReview"
            class="material-symbols-outlined sort"
            @click="toggleUserTask('pending review')"
          >
            person
          </span>
          <span
            v-else
            class="material-symbols-outlined sort"
            @click="toggleUserTask('pending review')"
          >
            group
          </span>
        </div>
        <div v-if="pendingReviewTasksFiltered.length == 0" class="empty">
          No Pending Review Task
        </div>
        <div class="card-container">
          <TaskCard
            v-for="task in pendingReviewTasksFiltered"
            :key="task.id"
            :userRole="store.role"
            v-bind="task"
            class="card"
          />
        </div>
      </div>

      <div class="col">
        <div class="section-title">
          <span>Closed</span>
          <span
            v-if="filterUserClosed"
            class="material-symbols-outlined sort"
            @click="toggleUserTask('closed')"
          >
            person
          </span>
          <span
            v-else
            class="material-symbols-outlined sort"
            @click="toggleUserTask('closed')"
          >
            group
          </span>
        </div>
        <div v-if="closedTasksFiltered.length == 0" class="empty">
          No Closed Task
        </div>
        <div class="card-container">
          <TaskCard
            v-for="task in closedTasksFiltered"
            :key="task.id"
            :userRole="store.role"
            v-bind="task"
            class="card"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SlotButton from "./SlotButton.vue";
import TaskCard from "./TaskCard.vue";
import { useRoute, RouterView, RouterLink, useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import { computed, ref, watchEffect } from "vue";
import { db } from "../firebase/firebase.js";

export default {
  name: "TasksTab",
  components: {
    SlotButton,
    TaskCard,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useUserStore();
    const userRole = ref(store.role);
    // const userID = store.id;
    const { id } = route.params;

    // Current Project Data
    const projectTitle = ref("");
    const employeeID = ref([]);
    const managerID = ref("");
    const managerName = ref("");
    const shortHandm = ref("");
    const shortHande = shortName(store.name);
    const deadline = ref(null);
    const error = ref(null);
    const isClosed = ref(false);

    // Tasks
    const openTasks = ref([]);
    const pendingReviewTasks = ref([]);
    const closedTasks = ref([]);

    // filtered data
    const filterUserOpen = ref(false);
    const filterUserPendingReview = ref(false);
    const filterUserClosed = ref(false);
    const filter = ref("");

    const users = ref([]);
    const showManagerTooltip = ref(false);

    // navigate to create task (manager only)
    const createTask = () => {
      router.push("/Project/" + id + "/createTask");
    };

    // generate user Initials for profile bubble
    function shortName(name) {
      let splitArr = String(name).split(" ");
      splitArr = splitArr.map((x) => x.substring(0, 1).toUpperCase());
      return splitArr.join("");
    }

    // fetch project detail
    const projectRef = db.collection("Project").doc(id);
    projectRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          projectTitle.value = doc.data().name;
          employeeID.value = doc.data().employeeID;
          managerID.value = doc.data().managerID;
          managerName.value = doc.data().managerName;
          shortHandm.value = shortName(doc.data().managerName);
          deadline.value = doc.data().deadline;
          isClosed.value = doc.data().closedTimestamp !== null;
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    var TasksRef = db
      .collection("Task")
      .where("projectID", "==", id)
      .orderBy("deadline");

    // Fetch all project's tasks 
    const unsub = TasksRef.onSnapshot(
      (snap) => {
        let open = [];
        let pendingReview = [];
        let closed = [];
        snap.docs.forEach((doc) => {
          // must wait for the server to create the timestamp & send it back
          if (doc.data().status == "Open") {
            doc.data().openedTimestamp &&
              open.push({ ...doc.data(), id: doc.id });
          } else if (doc.data().status == "Closed") {
            doc.data().openedTimestamp &&
              closed.push({ ...doc.data(), id: doc.id });
          } else {
            doc.data().openedTimestamp &&
              pendingReview.push({ ...doc.data(), id: doc.id });
          }
        });

        // update values
        openTasks.value = open;
        pendingReviewTasks.value = pendingReview;
        closedTasks.value = closed;
        error.value = null;
      },
      (err) => {
        console.log(err.message);
        error.value = "could not fetch the data";
      }
    );

    // Fetch project members
    async function fetchUsers(employeeIDs) {
      const fetchedUsers = [];
      for (const id of employeeIDs) {
        try {
          const userDoc = await db.collection("Users").doc(id).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            if (userData.role == "employee") {
              fetchedUsers.push({
                id: userDoc.id,
                name: userData.name,
                shortName: shortName(userData.name),
              });
            }
          }
        } catch (error) {
          console.log("Error getting user document:", error);
        }
      }
      return fetchedUsers;
    }

    // Task view toggler (current user's tasks or all tasks)
    const toggleUserTask = (task) => {
      if (task == "open") {
        filterUserOpen.value = !filterUserOpen.value;
      } else if (task == "pending review") {
        filterUserPendingReview.value = !filterUserPendingReview.value;
      } else {
        filterUserClosed.value = !filterUserClosed.value;
      }
    };

    // filter predicate for task search
    function predicate(task, filterUser) {
      if (filter.value.length > 0 && filterUser) {
        return (
          task.title.toLowerCase().indexOf(filter.value.toLowerCase()) > -1 &&
          task.employeeID == store.id
        );
      } else if (filter.value.length > 0) {
        return (
          task.title.toLowerCase().indexOf(filter.value.toLowerCase()) > -1
        );
      } else if (filterUser) {
        return task.employeeID == store.id;
      }
      return true;
    }

    const openTasksFiltered = computed(() =>
      openTasks.value.filter((task) => predicate(task, filterUserOpen.value))
    );
    const pendingReviewTasksFiltered = computed(() =>
      pendingReviewTasks.value.filter((task) =>
        predicate(task, filterUserPendingReview.value)
      )
    );
    const closedTasksFiltered = computed(() =>
      closedTasks.value.filter((task) =>
        predicate(task, filterUserClosed.value)
      )
    );

    // tooltip of user profile bubble
    const showTooltip = (userId) => {
      users.value.forEach((user) => {
        if (user.id === userId) {
          user.showTooltip = true;
        }
      });
    };

    const hideTooltip = (userId) => {
      users.value.forEach((user) => {
        if (user.id === userId) {
          user.showTooltip = false;
        }
      });
    };

    watchEffect((onInvalidate) => {
      onInvalidate(() => unsub());
    });
    watchEffect(() => {
      if (employeeID.value.length > 0) {
        fetchUsers(employeeID.value).then((fetchedUsers) => {
          users.value = fetchedUsers;
        });
      }
    });

    return {
      store,
      userRole,
      projectTitle,
      shortHandm,
      shortHande,
      createTask,
      toggleUserTask,
      filterUserOpen,
      filterUserPendingReview,
      filterUserClosed,
      filter,
      openTasksFiltered,
      pendingReviewTasksFiltered,
      closedTasksFiltered,
      id,
      isClosed,
      users,
      showTooltip,
      hideTooltip,
      managerID,
      showManagerTooltip,
      managerName,
    };
  },
};
</script>

<style scoped>
.tooltip {
  display: none;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px;
  border-radius: 5px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 1000;
}

.user:hover .tooltip {
  display: block;
}

.project-container {
  height: fit-content;
  padding-bottom: 3rem;
}

.project-header {
  margin-left: 4rem;
}

.create-btn {
  margin-right: 4rem;
  padding: 1.2rem;
  font-size: 1.5rem;
  border-radius: 0px;
  width: 130px;
}

.project-header-top {
  padding: 4rem 6vw 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-title-h1 {
  margin: 0 0 1rem 0;
  font-size: 3rem;
}

.users-menu {
  display: flex;
}

.user {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  background-color: #eebbd9;
  border-radius: 17.5px;
  height: 35px;
  width: 35px;
  margin-right: 0.5rem;
}

.employee {
  background-color: var(--secondary);
}

.user:hover {
  cursor: pointer;
  opacity: 0.75;
}

.add {
  background-color: #c4c4c4;
}

.search-input[type="text"] {
  box-sizing: content-box;
  border-radius: 5px;
  /* width: 10%; */
  width: 20%;
  height: 3.5rem;
  min-width: 100px;
  margin: 2rem 2rem 0 0;
  background-color: rgb(228, 228, 228);
  /* margin-left: 4rem; */
  background-image: url("../assets/search-icon.webp");
  background-size: 1.75rem;
  background-position: 95%;
  background-repeat: no-repeat;
  font-size: 1.5rem;
  padding-left: 1rem;
  border: 1px solid rgb(187, 187, 187);
  /* margin-right: 2rem; */
}

.task-container {
  margin: 2rem 1rem 0 4rem;
  display: grid;
  grid-template-columns: 3fr 3fr 3fr 1fr;
  margin-bottom: 5rem;
}

.col {
  background-color: #f1f1f1;
  min-height: 125px;
  border-radius: 5px;
  width: 97.5%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
}

.section-title {
  width: 90%;
  color: #797979;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sort {
  padding: 0.5rem;
  border-radius: 50%;
}

.sort:hover {
  background-color: #bdbdbd;
  cursor: pointer;
}

.card-container {
  width: 100%;
  align-self: center;
  max-height: 80vh;
  overflow-y: auto;
}

.card {
  margin: auto;
  margin-bottom: 1rem;
}

.empty {
  /* background-color: white; */
  padding: 1rem;
  font-size: 1.4rem;
  border-radius: 5px;
}

.tooltip-visible {
  display: block;
}
</style>

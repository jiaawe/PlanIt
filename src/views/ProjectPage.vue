<template>
  <main>
    <NavBar />
    <div class="main-container">
      <div class="sidebar">
        <div>
          <h2 class="project-title">{{ name }}</h2>
          <span class="project-desc">{{ description }}</span>
          <h3 class="viewing">Views</h3>
          <RouterLink
            :to="`/Project/${id}/tasks`"
            active-class="active"
            class="router-link"
          >
            <div class="menu-obj">
              <span class="material-symbols-outlined"> width_normal </span>
              <span class="name">Tasks</span>
            </div>
          </RouterLink>
          <RouterLink
            :to="`/Project/${id}/issues`"
            active-class="active"
            class="router-link"
          >
            <div class="menu-obj">
              <span class="material-symbols-outlined"> bug_report </span>
              <span class="name">Issues</span>
            </div>
          </RouterLink>
          <RouterLink
            :to="`/Project/${id}/ProjectRoadmap`"
            active-class="active"
            class="router-link"
            :key="id"
          >
            <div class="menu-obj">
              <span class="material-symbols-outlined"> view_timeline </span>
              <span class="name">Roadmap</span>
            </div>
          </RouterLink>
          <br />
          <hr />
        </div>
        <div
          v-if="userRole === 'manager' && !isClosed"
          class="menu-obj close-project"
          @click="closeProject"
        >
          <span class="material-symbols-outlined"> close </span>
          <span class="closed-project-tag">Close Project</span>
        </div>
      </div>
      <RouterView />
    </div>
  </main>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import useDocument from "../composables/useDocument.js";

import { useUserStore } from "../store/user";
import { db, timestamp } from "../firebase/firebase.js";

export default {
  name: "ProjectPage",
  components: { NavBar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useUserStore();
    const { id } = route.params;
    const { updateDoc } = useDocument("Project", id);

    const name = ref("");
    const description = ref("");
    const userRole = ref(store.role);
    const isClosed = ref(false);

    // Fetch project details
    const projectRef = db.collection("Project").doc(id);
    projectRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          name.value = doc.data().name;
          console.log(name.value);
          description.value = doc.data().description;
          isClosed.value = doc.data().closedTimestamp !== null;
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    // Close project confirmation prompt
    const closeProject = async () => {
      let isConfirmed = confirm('Do you want to close this project? this action is irreversible')
      if (isConfirmed) {
        await updateDoc({
          closedTimestamp: timestamp(),
        });

        // Close all open and pending review tasks
        var tasksRef = db.collection("Task").where("projectID", "==", id);
        let docRef;
        tasksRef.get().then((QuerySnapshot) => {
          QuerySnapshot.forEach(async (doc) => {
            docRef = db.collection("Task").doc(doc.id);
            await docRef.update({
              closedTimestamp: timestamp(),
              status: "Closed",
              hasIssue: false
            });
          });
        });

        // Close all unresolved issues
        var issuesRef = db.collection("Issue").where("projectID", "==", id);
        issuesRef.get().then((QuerySnapshot) => {
          QuerySnapshot.forEach(async (doc) => {
            docRef = db.collection("Issue").doc(doc.id);
            await docRef.update({
              closedTimestamp: timestamp(),
              status: "Closed",
            });
          });
        });
        router.push("/Home");
      }  
    };

    return { name, description, id, userRole, closeProject, isClosed };
  },
};
</script>

<style scoped>
.main-container {
  display: grid;
  grid-template-columns: 1fr 4fr;
  min-height: 90vh;
}

.sidebar {
  height: 100%;
  border-right: 2px solid #eee;
}

.project-title {
  padding-left: 2rem;
  padding-top: 3rem;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

hr {
  background-color: #eee;
  border: none;
  height: 2px;
}

.project-desc {
  padding-left: 2rem;
  font-size: 1.5rem;
  color: rgb(158, 158, 158);
  margin-bottom: 3rem;
  display: block;
}

.viewing {
  /* display: block; */
  padding-left: 2rem;
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.menu-obj {
  margin-left: 1.5rem;
  padding-left: 1rem;
  margin-bottom: 0.3rem;
  height: 4rem;
  width: 85%;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  border-radius: 6px;
}

.menu-obj:hover {
  background-color: #eceeff;
  cursor: pointer;
}

.close-project {
  margin-top: 1rem;
}
.close-project:hover {
  background-color: #f9ddd1;
  cursor: pointer;
}

.name {
  margin-left: 0.75rem;
}

.settings {
  margin-top: 1rem;
}

.active {
  color: red;
  background-color: #eceeff;
}

.router-link {
  text-decoration: none;
  color: #555;
}
</style>

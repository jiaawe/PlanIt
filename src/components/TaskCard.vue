<template>
  <div class="task-card" @click="getTaskDetail">
    <div class="task-header">
      <div>
        <span class="title">{{ title }} </span> <br />
        <span class="name">{{ employeeName }}</span>
      </div>
      <div class="review-btn-container">
        <span
          v-if="status == 'Open' && userRole == 'manager'"
          class="material-symbols-outlined submit"
          @click.stop="handleDelete"
        >
          delete
        </span>
        <span
          v-if="status == 'Pending Review' && userRole == 'manager'"
          class="material-symbols-outlined review-btn"
          @click.stop="closeTask"
        >
          check_circle
        </span>
        <span
          v-if="status == 'Open' && userRole == 'employee' && isMyTask"
          class="material-symbols-outlined review-btn"
          @click.stop="submitTask"
        >
          check_circle
        </span>
        <span
          v-if="status == 'Pending Review' && userRole == 'manager'"
          class="material-symbols-outlined review-btn"
          @click.stop="openTask"
        >
          cancel
        </span>
      </div>
    </div>
    <div>
      <hr />
      <div v-if="status == 'Closed'" class="task-content-complete">
        <span class="check">&#x2713;</span>
      </div>
      <div v-else class="task-content">
        <span v-bind:class="{ overdue: isOverdue }"
          >Due: {{ deadline.toDate().toLocaleDateString() }}</span
        >
        <div class="status">
          <span class="material-symbols-outlined" v-if="hasIssue">
            bug_report
          </span>
          <span v-if="priority == 'High'" class="highp">HIGH</span>
          <span v-if="priority == 'Medium'" class="medp">MED</span>
          <span v-if="priority == 'Low'" class="lowp">LOW</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useDocument from "../composables/useDocument.js";
import { useUserStore } from "../store/user.js";
import { useRoute, useRouter } from "vue-router";
import { timestamp } from "@/firebase/firebase";
import { db } from "../firebase/firebase";
export default {
  name: "TaskCard",
  props: {
    title: String,
    userRole: String,
    status: String,
    deadline: Object,
    id: String,
    priority: String,
    employeeID: String,
    employeeName: String,
    hasIssue: Boolean,
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const { id: proId } = route.params;
    const store = useUserStore();
    const isMyTask = props.employeeID == store.id;
    const { deleteDoc, updateDoc } = useDocument("Task", props.id);
    const isOverdue = new Date() > props.deadline.toDate();

    // navigate to task details page of the selected task
    const getTaskDetail = () => {
      router.push("/Project/" + proId + "/task/" + props.id);
    };

    // delete task handler
    const handleDelete = async () => {
      // delete all deleted task's issues
      if (props.hasIssue) {
        let issuesRef = db.collection("Issue").where("taskID", "==", props.id);
        issuesRef.get().then((QuerySnapshot) => {
          QuerySnapshot.forEach(async (doc) => {
            let docRef = db.collection("Issue").doc(doc.id);
            await docRef.delete();
          });
        })
      }
      await deleteDoc();
    };

    // close task handler, convert task status to 'Closed'
    const closeTask = async () => {
      await updateDoc({
        status: "Closed",
        closedTimestamp: timestamp(),
      });
    };

    // open task handler, convert task status to 'Open'
    const openTask = async () => {
      await updateDoc({ status: "Open" });
    };

    // Task submission handler
    const submitTask = async () => {
      if (props.hasIssue) {
        let issuesRef = db.collection("Issue").where("taskID", "==", props.id);
        issuesRef.get().then((QuerySnapshot) => {
          QuerySnapshot.forEach(async (doc) => {
            let docRef = db.collection("Issue").doc(doc.id);
            await docRef.update({
              status: 'Closed',
              hasIssue: false,
              closedTimestamp: timestamp()
            });
          });
        })
      }
      await updateDoc({
        status: "Pending Review",
        submittedTimestamp: timestamp(),
      });
    };

    return {
      handleDelete,
      closeTask,
      openTask,
      submitTask,
      isMyTask,
      getTaskDetail,
      isOverdue,
    };
  },
};
</script>

<style scoped>
.task-card {
  background-color: rgb(255, 255, 255);
  width: 95%;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
  min-height: 120px;
  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.task-card:hover {
  background-color: rgb(249, 249, 249);
  cursor: pointer;
}

.task-header {
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  line-height: 1.75rem;
}

.submit {
  border-radius: 50%;
  margin-left: 2.5rem;
}

.title {
  display: inline-block;
  border-bottom: 1px solid black;
  padding-bottom: 2px;
}

.name {
  font-size: 1.3rem;
}

.review-btn {
  border-radius: 50%;
}

.review-btn:hover {
  background-color: #848484;
}

.submit:hover {
  background-color: #848484;
}

.review-btn-container {
  display: flex;
  margin-left: 1.5rem;
}
.task-content {
  padding: 0.5rem 1.5rem 0 1.5rem;
  font-size: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status {
  display: flex;
  align-items: center;
}

.task-content-complete {
  padding: 0.5rem 1.5rem 0 1.5rem;
  font-size: 1.25rem;
  text-align: right;
}

.highp {
  color: #ffffff;
  background-color: var(--warning);
  padding: 0.4rem;
}

.medp {
  color: #ffffff;
  background-color: #fca336;
  padding: 0.4rem;
}

.lowp {
  color: #ffffff;
  background-color: #249a00;
  padding: 0.4rem;
}

.check {
  color: white;
  display: inline-block;
  border-radius: 50%;
  padding: 0.4rem;
  background-color: #249a00;
}

.overdue {
  color: red;
}
</style>

<template>
  <section>
    <div class="container">
      <div class="grid">
        <div class="header-text-box">
          <h1 class="tagline" v-if="true">
            Members working on {{ projectName }}:
          </h1>
          <div class="member-list">
            <div class="member">
              <p class="header-text">{{ manager.name }} (Owner)</p>
            </div>
            <div class="member" v-for="member in employees" :key="member.id">
              <p class="header-text">{{ member.name }}</p>
              <SlotButton
                class="remove-btn"
                v-if="user.role == 'manager' && !isClosed"
                @click="remove(member.id)"
                >Remove</SlotButton
              >
            </div>
            <div class="remove-msg" v-show="removeMsg !== ''">
              {{ removeMsg }}
            </div>
          </div>
        </div>
        <div v-if="user.role == 'manager' && !isClosed" class="form-page">
          <div class="userform-text-box">
            <h2 class="text-box-tagline sub-heading">Add Employee</h2>
            <hr />
            <form class="form" action="#">
              <div>
                <label for="name">Employee Email </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter employee email"
                  v-model="newEmployeeEmail"
                  required
                  @input="resetMsg"
                />
              </div>
              <div class="error" v-show="error !== ''">{{ error }}</div>
              <div class="success" v-show="success !== ''">{{ success }}</div>
              <SlotButton class="center-btn" @click="validate"
                >Add Employee</SlotButton
              >
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script async>
import { ref, watch } from "vue";
import useDocument from "../composables/useDocument.js";
import { useUserStore } from "../store/user.js";
import { useRoute, useRouter } from "vue-router";
import { db } from "../firebase/firebase.js";
import getCollection from "../composables/getCollection";
import SlotButton from "../components/SlotButton.vue";

import getUser from "../composables/getUser";

export default {
  name: "AddEmployee",
  components: { SlotButton },
  setup() {
    const route = useRoute();
    const user = useUserStore();

    const { id: projectId } = route.params;
    const projectName = ref("");
    const managerId = ref("");
    const manager = ref({});
    const employees = ref([]);

    const newEmployeeEmail = ref("");
    // const newEmployeeID = ref('')
    const error = ref("");
    const success = ref("");
    const removeMsg = ref("");

    const isClosed = ref(false);

    // setting projectName and managerID
    const projectRef = db.collection("Project").doc(projectId);
    projectRef.onSnapshot((doc) => {
      try {
        if (doc.exists) {
          projectName.value = doc.data().name;
          isClosed.value = doc.data().closedTimestamp !== null;

          //employeeIDs without the manager
          const excludeManager = doc
            .data()
            .employeeID.filter((id) => id != doc.data().managerID);
          const result = excludeManager.map((id) => {
            return getUser(id);
          });
          Promise.all(result)
            .then((employeesMapped) => {
              employees.value = employeesMapped;
              // console.log('employees:' + employeesMapped);
            })
            .catch((error) => {
              console.log("Error getting employees:", error);
            });

          //manager only
          const onlyManager = doc
            .data()
            .employeeID.filter((id) => id == doc.data().managerID);
          const result2 = onlyManager.map((id) => {
            return getUser(id);
          });
          Promise.all(result2)
            .then((managerMapped) => {
              manager.value = managerMapped[0];
              console.log(managerMapped);
            })
            .catch((error) => {
              console.log("Error getting employees:", error);
            });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    });

    // getting current employees
    async function getUser(id) {
      const projectRef = db.collection("Users").doc(id);
      const member = ref(null);
      try {
        const doc = await projectRef.get();
        if (doc.exists) {
          member.value = {
            id: id,
            name: doc.data().name,
            email: doc.data().email,
          };
          return member.value;
        } else {
          console.log("No such document!");
          return null;
        }
      } catch (error) {
        console.log("Error getting document:", error);
        return null;
      }
    }

    const newEmployee = ref([]);
    //function to search for user to be added
    async function searchUser() {
      try {
        // Query the 'Users' collection for documents where 'email' matches the given email address
        const querySnapshot = await db
          .collection("Users")
          .where("email", "==", newEmployeeEmail.value)
          .get();
        // Map the query results to an array of user objects
        const users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Update the search results variable
        newEmployee.value = users;
      } catch (error) {
        console.error(error);
      }
    }

    async function validate() {
      resetMsg();
      //email in invalid format
      if (
        newEmployeeEmail.value.trim() == "" ||
        !newEmployeeEmail.value.includes("@planit.com")
      ) {
        error.value = "Please enter a valid email in the form xxx@planit.com";
      } else {
        await searchUser();
        const employeeIds = ref([]);
        employeeIds.value = employees.value.map((member) => member.email);
        // console.log(employeeIds.value)
        // employee does not exist
        if (newEmployee.value.length == 0) {
          error.value = "Employee does not exist. Please enter a valid email";
        }
        // cannot add another manager
        else if (newEmployee.value[0].role == "manager") {
          error.value =
            "Each project can only have one manager. Please enter an employee's email";
        }
        // employee already in project
        else if (employeeIds.value.includes(newEmployee.value[0].email)) {
          error.value = `${newEmployee.value[0].name} is already in the project`;
        }
        // attempt to add employee to the project
        else {
          addMember(newEmployee.value[0].id);
        }
      }
    }

    async function addMember(id) {
      try {
        const projectRef = db.collection("Project").doc(projectId);
        const projectDoc = await projectRef.get();
        const employeeID = projectDoc.data().employeeID;

        // Add the new employee if already not present
        if (!employeeID.includes(id)) {
          employeeID.push(id);
        }

        // update database
        await projectRef.update({
          employeeID,
        });
        newEmployeeEmail.value = "";
        success.value = `Successfully added ${newEmployee.value[0].name} to ${projectName.value}.`;
        console.log(
          `Added ${newEmployee.value[0].name} to ${projectName.value}.`
        );
      } catch (error) {
        console.error(
          `Error adding ${id} to project ${projectName.value}:`,
          error
        );
      }
    }

    async function deleteTasks(id) {
      var tasksRef = db
        .collection("Task")
        .where("employeeID", "==", id)
        .where("projectID", "==", projectId);
      tasksRef.get().then((QuerySnapshot) => {
        QuerySnapshot.forEach(async (doc) => {
          console.log("im here task");
          let docRef = db.collection("Task").doc(doc.id);
          await docRef.delete();
        });
      });
    }

    async function deleteIssues(id) {
      var issuesRef = db
        .collection("Issue")
        .where("employeeID", "==", id)
        .where("projectID", "==", projectId);
      issuesRef.get().then((QuerySnapshot) => {
        QuerySnapshot.forEach(async (doc) => {
          console.log("im here issue");
          let docRef = db.collection("Issue").doc(doc.id);
          await docRef.delete();
        });
      });
    }

    async function remove(id) {
      resetMsg();
      try {
        const projectRef = db.collection("Project").doc(projectId);
        const projectDoc = await projectRef.get();

        if (projectDoc.exists) {
          const employeeID = projectDoc.data().employeeID;
          const index = employeeID.indexOf(id);

          const removed = employees.value.filter(
            (member) => id == member.id
          )[0];

          if (index !== -1) {
            employeeID.splice(index, 1);
            await projectRef.update({ employeeID });
          }

          await deleteTasks(id);
          await deleteIssues(id);
          console.log(`Removed ${removed.name} from ${projectName.value}.`);
          removeMsg.value = `Removed ${removed.name} from ${projectName.value}.`;
        }
      } catch (err) {
        console.log(err.message);
        error.value = "Failed to remove member";
      }
    }

    function resetMsg() {
      success.value = "";
      error.value = "";
      removeMsg.value = "";
    }

    return {
      user,
      projectId,
      projectName,
      newEmployeeEmail,
      employees,
      remove,
      validate,
      error,
      success,
      newEmployee,
      resetMsg,
      removeMsg,
      manager,
      isClosed,
    };
  },
};
</script>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 80vh;
}

.header-text-box {
  margin: 3vw;
  align-self: center;
  /* text-align: center; */
}

.tagline {
  margin-bottom: 30px;
  font-size: 4rem;
  line-height: 1.1;
  letter-spacing: -1px;
}

.header-text {
  /* margin-bottom: 50px; */
  font-size: 1.75rem;
  line-height: 1.7;
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

.member-list {
  margin-right: 3vw;
}

.member {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  /* border-bottom: 2px solid #eee; */
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
  display: block;
  margin: auto;
}

.error {
  font-weight: 500;
  color: var(--warning);
  font-size: 14px;
  margin-bottom: 15px;
  text-align: center;
}

.remove-msg {
  font-weight: 500;
  color: var(--warning);
  font-size: 14px;
  margin-top: 30px;
  text-align: center;
}

.success {
  font-weight: 500;
  color: #7ab975;
  font-size: 14px;
  margin-bottom: 15px;
  text-align: center;
}

.remove-btn {
  color: #333;
  font-weight: 300;
  font-size: 1.2rem;
  transition: all 0.3s;
  padding: 0.5rem 1rem;
  border-radius: 9px;
  color: #fff;
  background-color: #c23b22;
  border-width: 0;
}
.remove-btn:hover {
  background-color: #ffa194;
}
</style>

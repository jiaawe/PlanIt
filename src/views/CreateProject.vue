<template>
  <main>
    <NavBar />
    <section>
      <div class="container">
        <div class="issue-form">
          <div class="header-text-box">
            <h1 class="tagline">Fill in your Project Details.</h1>
            <p class="header-text">
              Fill in the necessary details for your project
            </p>
          </div>
          <div class="form-page">
            <div class="userform-text-box">
              <h2 class="text-box-tagline sub-heading">Create Your Project</h2>
              <hr />
              <form class="form" action="#">
                <div>
                  <label for="taskname">Name of The Project</label>
                  <input
                    id="taskname"
                    type="text"
                    placeholder="Enter Project Name"
                    v-model="name"
                    required
                  />
                </div>

                <div>
                  <label for="description">Description</label>
                  <textarea
                    id="description"
                    rows="4"
                    cols="50"
                    placeholder="Describe your Project"
                    v-model="description"
                  ></textarea>
                </div>

                <div>
                  <label for="deadline">Deadline</label>
                  <input id="deadline" type="date" v-model="deadline"/>
                </div>

                <SlotButton class="center-btn" @click="handleSubmit">Submit Project</SlotButton>
                <span class="error">{{ errorMsg }}</span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { ref } from "vue";
import SlotButton from "../components/SlotButton.vue";
import getUser from "../composables/getUser";
import useCollection from "../composables/useCollection";
import { timestamp } from "@/firebase/firebase";
import { useRouter } from "vue-router";
import { db } from "../firebase/firebase.js";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "CreateProject",
  components: { SlotButton, NavBar },
  setup() {
    const { error, addDoc } = useCollection("Project");
    const { user } = getUser();
    const userName = ref("");

    // Fetch manager name
    var userRef = db.collection("Users").doc(user.value.uid);

    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          userName.value = doc.data().name;
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    // input variable ref
    const name = ref("");
    const description = ref("");
    const deadline = ref(null);
    const router = useRouter();
    const employeeID = ref([user.value.uid]);
    const errorMsg = ref('');

    const handleSubmit = async () => {
      // validators for input
      if (name.value.trim() == "") {
        errorMsg.value = 'Please enter name';
      } else if (!deadline.value){
        errorMsg.value = 'Please select a deadline';
      } else if (new Date(deadline.value) < new Date) {
        errorMsg.value = 'Please select future date'
      } else {
        const res = await addDoc({
          name: name.value,
          managerID: user.value.uid,
          managerName: userName.value,
          employeeID: employeeID.value,
          description: description.value,
          deadline: new Date(deadline.value),
          openedTimestamp: timestamp(),
          closedTimestamp: null,
        });
        if (!error.value) {
          console.log("create project success");
          router.push("/Home");
        }
      }
    };

    return { name, description, deadline, handleSubmit, errorMsg };
  },
};
</script>

<style scoped>
.issue-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 80vh;
}

.header-text-box {
  align-self: center;
  text-align: center;
}

.tagline {
  margin-bottom: 32px;
  font-size: 4rem;
  line-height: 1.1;
  letter-spacing: -1px;
}

.header-text {
  margin-bottom: 24px;
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

.btn,
.btn:link,
.btn:visited {
  font-size: 1.8rem;
  padding: 1.2rem 2.4rem;
  border-radius: 9px;
  color: #fff;
  background-color: var(--primary);
}

.btn:hover,
.btn:active {
  color: #fff;
  background-color: var(--secondary);
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

#collaborator {
  margin-bottom: 16px;
}

.error {
  color: var(--warning);
  font-size: 14px;
  margin: 16px 0 0 0;
  text-align: center;
  display: block;
}
</style>

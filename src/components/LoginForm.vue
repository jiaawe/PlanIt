<template>
  <div class="left">
    <router-link :to="{ name: 'Landing' }"
      ><div class="logo-container">
        <img class="logo" alt="PlanIt" src="@/assets/plan-it.png" /></div
    ></router-link>

    <h1 class="tagline">Login to Your Account</h1>
    <div class="form">
      <input
        type="text"
        placeholder="Email"
        v-model="email"
        v-on:keyup.enter="login"
      />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        v-on:keyup.enter="login"
      />
      <SlotButton class="login-btn" v-on:click="login">Log in</SlotButton>
      <!-- <button class="login-btn" v-on:click="login">Login</button> -->
    </div>
    <div class="error" v-show="this.error !== ''">{{ this.error }}</div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useUserStore } from "@/store/user";
import SlotButton from "@/components/SlotButton.vue";
export default {
  name: "Login",
  components: { SlotButton },
  // Establish data structure
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password); // Check if this email and password matches with the ones stored in Firebase
        console.log("success");
        this.error = "";
        // Call getUserData() here
        const userStore = useUserStore();
        userStore.getUserData(this.email);
        this.$router.push("/Home"); // Show home page once the login is successful
        console.log("test");
      } catch (e) {
        console.log(e);
        this.error = "Invalid email or password"; // Send this error message to the user if their login details do not match any stored data in Firebase
      }
    },
  },
};
</script>

<style scoped>
.left {
  background-color: #ffffff;
  width: 55vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding: 2% 4%;
}
.logo-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 25vh;
}
.logo {
  height: 3.5rem;
  margin: 1.5rem;
}
.forget {
  color: rgb(105, 104, 104);
}
.login-btn {
  width: 35%;
  align-self: center;
  margin-top: 1rem;
  background-color: var(--primary);
  height: 5rem;
  border-radius: 25px;
  margin-bottom: 0.5rem;
}
.tagline {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}
.error {
  color: var(--warning);
  font-size: 14px;
  margin: 16px 0;
}
</style>

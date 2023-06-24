<template>
  <div class="left">
    <router-link :to="{ name: 'Landing' }"
      ><div class="logo-container">
        <img class="logo" alt="PlanIt" src="@/assets/plan-it.png" /></div
    ></router-link>
    <div class="form">
      <h1 class="tagline">Create Your Account</h1>
      <div class="login-form">
        <input
          type="text"
          placeholder="Name"
          v-model="name"
          v-on:keyup.enter="register"
        />
        <input
          type="text"
          placeholder="Email"
          v-model="email"
          v-on:keyup.enter="register"
          required
        />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          v-on:keyup.enter="register"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          v-model="confirmPassword"
          v-on:keyup.enter="register"
        />
        <input
          type="text"
          placeholder="Contact Number"
          v-model="contactNumber"
          v-on:keyup.enter="register"
        />
        <input
          type="text"
          placeholder="Company"
          v-model="company"
          v-on:keyup.enter="register"
        />
        <input
          type="text"
          placeholder="Department"
          v-model="department"
          v-on:keyup.enter="register"
        />
        <select name="role" id="role" placeholder="Role" v-model="role">
          <option value="" disabled selected>Select your role</option>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
        <input
          type="text"
          placeholder="Manager Credential"
          v-show="this.role === 'manager'"
          v-model="credential"
          v-on:keyup.enter="register"
        />
        <!-- <button class="attach-pic-btn">Attach Profile Picture</button> -->
        <label for="file" style="text-align: left"
          >Attach Profile Picture</label
        >
        <input id="file" type="file" @change="uploadPicture" accept="image/*" />
      </div>
      <div class="error" v-show="this.error !== ''">{{ this.error }}</div>
      <div class="success" v-show="this.success !== ''">
        {{ this.success }}
      </div>
      <SlotButton class="signup-btn" v-on:click="register">Sign Up</SlotButton>
      <!-- <button class="signup-btn" v-on:click="register">Sign Up</button> -->
    </div>
  </div>
</template>

<script>
import { db, auth } from "../firebase/firebase.js";
import SlotButton from "@/components/SlotButton.vue";
import { useUserStore } from "@/store/user";
import {
  uploadProfilePicture,
  downloadProfilePicture,
} from "../firebase/storage.js";
export default {
  name: "Sign Up",
  components: { SlotButton },
  // Establish data structure
  data() {
    return {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      contactNumber: "",
      company: "",
      department: "",
      credential: "",
      role: "",
      error: "",
      success: "",
      profilePicture: null,
    };
  },
  methods: {
    // Handling the user's uploaded profile picture
    uploadPicture(event) {
      this.profilePicture = event.target.files[0];
    },
    // Handling and verifying valid Integers
    validInteger(number) {
      try {
        if (isNaN(number) || parseInt(number) < 0) {
          return false;
        }
        return true;
      } catch {
        return false;
      }
    },
    // Verifying if string has integer
    hasInteger(str) {
      return /\d/.test(str);
    },
    // Verifying if string is integer
    isInteger(str) {
      return /^\d+$/.test(str);
    },
    async register() {
      // Check if the name is valid
      if (this.name.trim() == "" || this.hasInteger(this.name)) {
        this.error = "Please enter name";
        this.success = "";
      } else if (
        // Check if email is valid
        this.email.trim() == "" ||
        !this.email.includes("@planit.com")
      ) {
        this.error = "Please enter a valid email in the form xxx@planit.com";
        this.success = "";
      } else if (this.password.length < 6) {
        // Check if password is valid
        this.error = "Please enter a valid password of at least length 6";
        this.success = "";
      } else if (this.confirmPassword !== this.password) {
        // Check if password matches
        this.error = "Passwords do not match";
        this.success = "";
      } else if (
        // Check if contact number is valid
        !this.validInteger(this.contactNumber) ||
        this.contactNumber.length < 8
      ) {
        this.error = "Enter a valid contact number";
        this.success = "";
      } else if (this.company.trim() == "") {
        // Check if company is valid
        this.error = "Enter a valid company";
        this.success = "";
      } else if (
        // Check if department is valid
        this.department.trim() == "" ||
        this.hasInteger(this.department)
      ) {
        this.error = "Enter a valid department";
        this.success = "";
      } else if (this.role !== "manager" && this.role !== "employee") {
        // Check if role has been checked
        this.error = "Please select a role";
        this.success = "";
      } else if (this.role === "manager" && this.credential !== "planit") {
        // Check if manager and credential matches
        this.error = "Invalid manager credential";
        this.success = "";
      } else {
        this.error = "";
        try {
          console.log(this.name);
          console.log(this.department);
          console.log(this.company);
          const createUser = await auth.createUserWithEmailAndPassword(
            // If all is checked, create user with email and password
            this.email,
            this.password
          );
          const result = await createUser;
          var url;
          if (this.profilePicture) {
            // Upload profile picture to firebase
            await uploadProfilePicture(this.email, this.profilePicture);
            url = await downloadProfilePicture(this.email);
          } else {
            // If there is no profile picture uploaded, use a default picture
            url =
              "https://firebasestorage.googleapis.com/v0/b/planit-5dfc0.appspot.com/o/profile%2Fprofile-pic.png?alt=media&token=f4938d20-a76d-4714-8bf3-a667d447a16c";
          }
          console.log(url);
          // Store the data according to the data structure in Firebase
          await db.collection("Users").doc(result.user.uid).set({
            name: this.name,
            email: this.email,
            contactNumber: this.contactNumber,
            company: this.company,
            department: this.department,
            role: this.role,
            imageURL: url,
          });
          this.error = "";
          this.success = "Account successfully created!"; // Once successful, send a successful message to the user
          console.log("success!");
          const userStore = useUserStore();
          userStore.getUserData(this.email);
          this.$router.push("/Home");
        } catch (e) {
          this.success = "";
          this.error = "Email may have already been used!"; // If registration is not successful due to duplicated email, send the error message to the user
          console.log(e);
          console.log("unssuccessful!");
          return;
        }
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
  height: 100%;
  padding: 2% 8%;
}
.logo-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 7vh;
}
.logo {
  height: 3.5rem;
  margin: 1rem;
}
.tagline {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}
.signup-btn {
  width: 35%;
  align-self: center;
  margin-top: 1rem;
  background-color: var(--primary);
  height: 5rem;
  border-radius: 25px;
  margin-bottom: 4rem;
}
.error {
  color: var(--warning);
  font-size: 14px;
  margin: 16px 0;
}
.success {
  color: #7ab975;
  font-size: 14px;
  margin: 16px 0;
}
</style>

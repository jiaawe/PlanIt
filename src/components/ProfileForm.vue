<template>
  <div id="right-container">
    <div class="profile-pic-container">
      <div class="profile-pic">
        <!-- User's profile pic -->
        <a href="#" v-if="isEditable" @click="updateProfilePicture">
          <img
            :src="store.imageURL"
            class="profile-image"
            alt="Profile picture"
          />
        </a>
        <img
          v-else
          :src="store.imageURL"
          class="profile-image"
          alt="Profile picture"
        />
        <input
          id="profileUpload"
          type="file"
          hidden
          accept="image/*"
          @change="editProfilePicture"
        />
      </div>
    </div>
    <!-- User's personal information -->
    <form class="form">
      <label for="name">Name:</label>
      <input
        id="name"
        type="text"
        v-model="store.name"
        :readonly="!isEditable"
      />

      <label for="email">Email Address:</label>
      <input
        id="email"
        type="text"
        v-model="store.email"
        readonly="true"
        :class="{ uneditable: isEditable }"
        :disabled="isEditable"
      />

      <label for="contactno">Contact Number:</label>
      <input
        id="contactno"
        type="number"
        v-model="store.contactNumber"
        :readonly="!isEditable"
      />

      <label for="department">Department:</label>
      <input
        id="department"
        v-model="store.department"
        :readonly="!isEditable"
      />

      <label for="role">Role:</label>
      <input
        id="role"
        type="text"
        v-model="store.role"
        readonly="true"
        :class="{ uneditable: isEditable }"
        :disabled="isEditable"
      />

      <div
        class="edit-profile"
        style="flex-direction: column"
        v-if="!isEditable"
      >
        <div class="button-container">
          <SlotButton @click="editProfile">Edit Profile</SlotButton>
        </div>
        <div class="success-container">
          <div v-if="success && !isEditable" class="success">
            The change is successful
          </div>
        </div>
      </div>
      <div class="edit-profile" style="flex-direction: column" v-else>
        <div class="button-container">
          <SlotButton @click="submitChanges">Submit Changes</SlotButton>
          <SlotButton @click="cancelEdit">Cancel</SlotButton>
        </div>
        <div class="error-container">
          <div v-if="error" class="error">{{ error }}</div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import SlotButton from "@/components/SlotButton.vue";
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "@/store/user.js";
import {
  uploadProfilePicture,
  downloadProfilePicture,
  deleteFile,
} from "../firebase/storage.js";
import { db } from "@/firebase/firebase.js";
export default {
  components: { SlotButton },
  setup() {
    const store = useUserStore();
    let isEditable = ref(false);
    let error = ref(null);
    let success = ref(false);
    const tempData = ref(null);
    const editProfile = () => {
      isEditable.value = true;
      tempData.value = {
        name: store.name,
        contactNumber: store.contactNumber,
        department: store.department,
        imageURL: store.imageURL,
      };
      success.value = false;
    };
    // Do validation
    const isNameValid = computed(() => {
      const regex = /^[a-zA-Z\s]*$/;
      return store.name.trim().length > 0 && regex.test(store.name);
    });
    const isContactNumberValid = computed(
      () =>
        store.contactNumber.toString().length >= 8 &&
        /^\d+$/.test(store.contactNumber)
    );
    const isDepartmentValid = computed(() => {
      const regex = /^[a-zA-Z\s]*$/;
      return store.department.trim().length > 0 && regex.test(store.department);
    });

    // User changes information or profile picture
    const submitChanges = async () => {
      const profilePicture = document.getElementById("profileUpload").files[0];
      if (profilePicture) {
        await uploadProfilePicture(store.email, profilePicture);
        store.imageURL = await downloadProfilePicture(store.email);
        await deleteFile("profile/temp" + store.email);
        document.getElementById("profileUpload").value = "";
      }
      const updatedData = {
        name: store.name,
        email: store.email,
        role: store.role,
        contactNumber: store.contactNumber,
        department: store.department,
        imageURL: store.imageURL,
      };
      if (
        !isNameValid.value ||
        !isContactNumberValid.value ||
        !isDepartmentValid.value
      ) {
        error.value = "Invalid input.";
        return;
      }
      if (store.name !== tempData.value.name) {
        await db
          .collection("Project")
          .where("managerName", "==", tempData.value.name)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
              await db.collection("Project").doc(doc.id).update({
                managerName: store.name,
              });
            });
          })
          .catch((error) => console.log(error));
      }
      localStorage.setItem("user", JSON.stringify(updatedData));
      await store.updateUserData(updatedData);
      isEditable.value = false;
      success.value = true;
      setTimeout(() => {
        success.value = false;
      }, 2000);
    };

    // User cancels edit
    const cancelEdit = async () => {
      isEditable.value = false;
      if (tempData.value !== null) {
        store.name = tempData.value.name;
        store.contactNumber = tempData.value.contactNumber;
        store.department = tempData.value.department;
        store.imageURL = tempData.value.imageURL;
        tempData.value = null;
      }
      const profilePicture = document.getElementById("profileUpload").files[0];
      if (profilePicture) {
        await deleteFile("profile/temp" + store.email);
        document.getElementById("profileUpload").value = "";
      }
      success.value = false;
    };
    const updateProfilePicture = () => {
      document.getElementById("profileUpload").click();
      return;
    };
    const editProfilePicture = async (event) => {
      var profilePicture = event.target.files[0];
      const temp_path = "temp" + String(store.email);
      if (profilePicture) {
        await uploadProfilePicture(temp_path, profilePicture);
        var url = await downloadProfilePicture(temp_path);
        store.imageURL = url;
      }
      //onst url = await downloadProfilePicture(temp);
      //console.log(url);
    };
    onMounted(() => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedData = JSON.parse(userData);
        store.name = parsedData.name;
        store.email = parsedData.email;
        store.role = parsedData.role;
        store.contactNumber = parsedData.contactNumber;
        store.department = parsedData.department;
        store.imageURL = parsedData.imageURL;
      } else {
        store.getUserData();
      }
    });
    return {
      store,
      isEditable,
      isNameValid,
      isContactNumberValid,
      isDepartmentValid,
      editProfile,
      submitChanges,
      cancelEdit,
      error,
      success,
      editProfilePicture,
      updateProfilePicture,
    };
  },
};
</script>

<style scoped>
#right-container {
  padding: 4%;
  width: 60vw;
  height: 100%;
  background-color: white;
  align-items: center;
}
.profile-pic-container {
  display: flex;
  width: 100%;
  /* background-color: red; */
  justify-content: center;
  padding-bottom: 3%;
}
.profile-pic {
  border-style: solid;
  border-radius: 50%;
  border-width: 7px;
  border-color: var(--primary);
  height: 20vh;
  width: 20vh;
  overflow: hidden;
}
.profile-pic img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.edit-profile {
  display: flex;
  width: 100%;
  justify-content: center;
}

.uneditable:hover {
  cursor: not-allowed;
}

.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.error {
  color: var(--warning);
  font-size: 14px;
  margin: 16px 0;
}

.success-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.success {
  color: #4caf50;
  font-size: 14px;
  margin: 16px 0;
}
</style>

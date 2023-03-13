<template>
  <div id="right-container">
    <div class="profile-pic-container">
      <div class="profile-pic">
        <a href="#">
          <img
            class="profile-image"
            alt="Profile picture"
            src="@/assets/profile-pic.png"
          />
        </a>
      </div>
    </div>
    <form id="userForm">
      <label for="name">Name:</label>
      <input
        id="name"
        type="text"
        placeholder="Enter Name"
        value="Manager Tan"
        readonly="true"
      />

      <label for="email">Email Address:</label>
      <input
        id="email"
        type="text"
        placeholder="Enter a valid email"
        value="managertan@planit.com"
        readonly="true"
      />

      <label for="contactno">Contact Number:</label>
      <input
        id="contactno"
        type="number"
        placeholder="Enter a valid contact number"
        value="98765432"
        readonly="true"
      />

      <label for="department">Department:</label>
      <input id="role" value="Human Resources" readonly="true" />

      <label for="role">Role:</label>
      <input id="role" type="text" value="Employee" readonly="true" />

      <div class="edit-profile">
        <SlotButton>Edit Profile</SlotButton>
      </div>
    </form>
  </div>
</template>

<script>
import SlotButton from "@/components/SlotButton.vue";
export default {
  components: { SlotButton },
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
  border-color: #a2a9ed;
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

/* forms */
form {
  width: 100%;
  /* max-width: 100%;
  margin: 0 auto; */
  padding: 30px;
  border-radius: 8px;
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  border: 1px solid var(--secondary);
  background: white;
}
input,
textarea {
  border: 0;
  border-bottom: 1px solid var(--secondary);
  padding: 10px;
  outline: none;
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin: 20px auto;
}

/* error text */
.error {
  color: var(--warning);
  font-size: 14px;
  margin: 16px 0;
}
</style>

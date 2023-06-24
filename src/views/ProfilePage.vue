<template>
  <div>
    <NavBar />
    <div class="container">
      <div id="left-container">
        <div class="headings">
          <h1 class="profile-heading">Profile</h1>
          <h2 class="profile-subheading">Edit your personal details</h2>
        </div>
      </div>
      <ProfileForm />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SlotButton from "@/components/SlotButton.vue";
import ProfileForm from "@/components/ProfileForm.vue";
export default {
  components: { SlotButton, ProfileForm, NavBar },
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  background-color: var(--primary);
}

#left-container {
  width: 40vw;
  height: 100%;
  padding-left: 4%;
  padding-top: 4%;
}

.profile-heading,
.profile-subheading {
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.5px;
}

.profile-heading {
  font-size: 7rem;
  line-height: 1.05;
  margin-bottom: 1rem;
}

.profile-subheading {
  font-size: 3rem;
  line-height: 1.05;
  margin-bottom: 3.2rem;
}

.headings {
  position: -webkit-sticky;
  position: fixed;
  top: 45vh;
}
</style>

<template>
  <main>
    <ManagerNavBar />
    <HomePage />
  </main>
</template>

<script>
import ManagerNavBar from "@/components/ManagerNavBar.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import HomePage from "@/views/HomePage.vue";
import CreateProject from "./views/CreateProject.vue";
import EmployeeNavBarVue from './components/EmployeeNavBar.vue';

export default {
  components: { ProfilePage, HomePage, CreateProject, ManagerNavBar, EmployeeNavBarVue},
};
</script>

<template>
  <main>
    <ManagerNavBar />
    <HomePage />
    <!-- <ProfilePage /> -->
    <!-- <CreateProject /> -->
    <!-- <TaskDetailsPage /> -->
  </main>
</template>

<script>
import ManagerNavBar from "@/components/ManagerNavBar.vue";
import EmployeeNavBarVue from '@/components/EmployeeNavBar.vue';
import ProfilePage from "@/views/ProfilePage.vue";
import HomePage from "@/views/HomePage.vue";
import CreateProject from "@/views/CreateProject.vue";
import TaskDetailsPage from "@/views/TaskDetailsPage.vue";


export default {
  components: { ProfilePage, HomePage, CreateProject, ManagerNavBar, EmployeeNavBarVue, TaskDetailsPage},
};
</script>

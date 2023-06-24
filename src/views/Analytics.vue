<template>
  <!-- Components for Analytics Page -->
  <NavBar />
  <SearchEmployee />
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SearchEmployee from "../components/SearchEmployee.vue";
export default {
  components: {
    NavBar,
    SearchEmployee,
  },
};
</script>

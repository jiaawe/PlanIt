import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "../src/router/index.js";
import "./assets/main.css";
import { auth } from "@/firebase/firebase";
import VueApexCharts from "vue3-apexcharts";
import { useUserStore } from "@/store/user"; // Import the user store
import HighchartsVue from "highcharts-vue";

const pinia = createPinia();

let app;
auth.onAuthStateChanged((user) => {
  if (!app) {
    app = createApp(App)
      .use(pinia)
      .use(router)
      .use(VueApexCharts)
      .use(HighchartsVue)
      .mount("#app");
  }

  const userStore = useUserStore(); // Access the user store

  if (user) {
    userStore.setUser(user);

    // Redirect to home page if haven't logged out
    if (window.location.pathname == "/") {
      router.replace("/Home");
    }
  } else {
    userStore.clearUser();
  }
});

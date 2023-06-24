<script>
import { useUserStore } from "./store/user.js";
import { auth } from "./firebase/firebase";

export default {
  setup() {
    const store = useUserStore();
    auth.onAuthStateChanged((user) => {
      if (user) {
        store.setUserData();
      }
    });
  },
};
</script>

<template>
  <main>
    <router-view />
  </main>
</template>

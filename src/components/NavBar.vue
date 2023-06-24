<template>
  <!-- Show navbar upon authenticated user -->
  <div v-show="userData != null">
    <header class="header">
      <a @click="this.$router.push('/Home')">
        <img class="logo" alt="Plan It. Logo" src="@/assets/plan-it.png" />
      </a>
      <!-- Navigation bar options -->
      <nav class="main-nav">
        <ul class="main-nav-list">
          <li>
            <router-link :to="{ name: 'Home' }" class="main-nav-link"
              >Home</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'Profile' }" class="main-nav-link"
              >Profile</router-link
            >
          </li>
          <!-- Enable analytics page access for managers -->
          <li v-if="isManager">
            <router-link :to="{ name: 'Analytics' }" class="main-nav-link"
              >Analytics</router-link
            >
          </li>
          <li><SlotButton @click="handleClick">Log Out</SlotButton></li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
import SlotButton from "@/components/SlotButton.vue";
import getUser from "../composables/getUser";
import useLogout from "../composables/useLogout";
import { db } from "../firebase/firebase";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
export default {
  components: { SlotButton },
  setup() {
    const { user } = getUser();
    const { logout } = useLogout();
    const router = useRouter();
    const userData = ref(null);
    // Get data of user
    let collectionRef = db.collection("Users");
    collectionRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().email == user.value.email) {
            userData.value = doc.data();
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });

    // Check if current user is manager
    const isManager = computed(() => {
      return userData.value !== null && userData.value.role === "manager";
    });
    // Logout
    const handleClick = async () => {
      await logout();
      console.log("logged out");
      router.push({ name: "Login" });
    };
    return { userData, isManager, handleClick, user };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 9.6rem;
  padding: 0 4.8rem;
  border-bottom: 2px solid #eee;
}
.logo {
  height: 7.5rem;
}

.logo:hover {
  cursor: pointer;
}
.main-nav-list {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 3.2rem;
}
.main-nav-link:link,
.main-nav-link:visited {
  display: inline-block;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 1.8rem;
  transition: all 0.3s;
}
.main-nav-link:hover,
.main-nav-link:active {
  color: var(--primary);
}
.main-nav-link.nav-cta:link,
.main-nav-link.nav-cta:visited {
  padding: 1.2rem 2.4rem;
  border-radius: 9px;
  color: #fff;
  background-color: var(--primary);
}
.main-nav-link.nav-cta:hover,
.main-nav-link.nav-cta:active {
  background-color: var(--secondary);
}
</style>

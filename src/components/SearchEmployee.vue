<template>
  <div class="search-container">
    <div class="row">
      <div class="search">
        <label>Search for employee</label>
        <input
          type="search"
          v-model="searchTerm"
          @input="filter"
          placeholder="Search by name or email..."
        />
      </div>
      <div class="list" id="list">
        <router-link
          v-for="user in filteredUsers"
          :to="`/Analytics/${user.id}`"
          :key="user.id"
          class="list-item"
        >
          <div class="list-item__avatar">
            <!-- Bind the src attribute to the profile picture URL -->
            <img :src="user.imageURL" />
          </div>
          <div class="list-item__content">
            <strong class="list-item__name">{{ user.name }}</strong>
            <span class="list-item__info">{{ user.email }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { db } from "@/firebase/firebase";

export default {
  setup() {
    const searchTerm = ref("");
    const users = ref([]);

    // Get the employee's list
    const getUsers = async () => {
      const usersSnapshot = await db
        .collection("Users")
        .where("role", "==", "employee")
        .get();
      usersSnapshot.forEach((doc) => {
        users.value.push({ id: doc.id, ...doc.data() });
      });
    };

    getUsers();

    // Filter user based on input from search bar
    const filteredUsers = computed(() => {
      return users.value.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    });

    const filter = () => {};

    return { searchTerm, users, filteredUsers, filter };
  },
};
</script>

<style scoped>
.search-container {
  box-sizing: border-box;
  font-size: 62.5%;
  font-size: 2rem;
  max-width: 1040px;
  margin: 6rem auto 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
}
.row {
  margin-left: -1rem;
  margin-right: -1rem;
}
.list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.list-item {
  width: 100%;
  max-width: 500px;
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #e1e4ea;
  display: flex;
  align-items: center;
  position: relative;
  color: #002b5d;
  text-decoration: none;
}
.list-item:hover {
  border: 1px solid #cacfd9;
  color: var(--primary);
  background: #f6f7f9;
}
.list-item:hover .list-item__button {
  opacity: 1;
  transition: all 100ms ease;
}
.list-item__avatar {
  margin-right: 1rem;
}
.list-item__avatar img {
  border: 1px solid #cacfd9;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: #e1e4ea;
}
.list-item__name {
  display: block;
}
.list-item__info {
  font-size: 0.85em;
  color: #91a1bb;
}
.list-item__button {
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  font-family: inherit;
  position: absolute;
  top: 7px;
  right: 7px;
  width: 18px;
  height: 18px;
  font-weight: 700;
  background: var(--primary);
  color: #ffffff;
  line-height: 18px;
  text-transform: uppercase;
  border-radius: 999px;
  cursor: pointer;
  opacity: 0.6;
  outline: none;
  opacity: 0.2;
}
.list-item__button svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.search {
  margin-bottom: 4rem;
  font-size: 2.4rem;
  position: relative;
}
.search label,
.search input {
  display: block;
}
.search label {
  font-weight: 700;
  margin-bottom: 1rem;
}
.search input {
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid #cacfd9;
  font-family: inherit;
  outline: none;
}
.search input:focus {
  box-shadow: 0px 0px 0px 3px var(--secondary);
  border-color: var(--primary);
}
.search__clear {
  position: absolute;
  top: 5.3rem;
  right: 1rem;
  cursor: pointer;
  background: #e1e4ea;
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  color: #91a1bb;
  border: 0;
  padding: 0;
  border-radius: 50%;
  font-size: 1.4rem;
}
.search__clear:focus,
.search__clear:active {
  outline: 0;
}
.search__clear:hover {
  background: #cacfd9;
  color: #597191;
}
.recent-search {
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
}
.search-item {
  font-size: 1.4rem;
  display: inline-block;
  padding: 0.5rem;
  line-height: 1;
  color: #3384f3;
  border-radius: 5px;
  background: rgba(51, 132, 243, 0.15);
  cursor: pointer;
  margin: 0 0.5rem 0.5rem 0;
}
.search-item:hover,
.search-item:focus {
  color: #0e69e6;
  background: rgba(51, 132, 243, 0.2);
}
.search-item__close {
  opacity: 0.5;
  display: inline-block;
  cursor: pointer;
  margin-left: 0.5rem;
}
.search-item__close:hover {
  color: #d63031;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>

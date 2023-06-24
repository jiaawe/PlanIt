<template>
  <div class="main-container">
    <LoginForm />
    <div class="right">
      <h1>New Here?</h1>
      <div class="text">
        Sign up now and manage your million dollar projects!
      </div>
      <SlotButton class="signup-btn" @click="$router.push('/Register')">Sign up</SlotButton>
      <!-- <button class="signup-btn" @click="$router.push('/Register')">
          Sign Up
        </button> -->
    </div>
  </div>
</template>

<!-- Import the Login Form and Slot Button from components -->
<script setup>
import LoginForm from "@/components/LoginForm.vue";
import SlotButton from "@/components/SlotButton.vue";
</script>

<!-- The style details of the login page -->
<style scoped>
.main-container {
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.right {
  background-color: var(--primary);
  width: 45vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.signup-btn {
  width: 35%;
  color: var(--primary);
  background-color: #ffffff;
  height: 5rem;
  border-radius: 25px;
}

.text {
  width: 80%;
  font-size: 1.5rem;
  line-height: 1.9rem;
  margin-bottom: 1.75rem;
}
</style>

<template>
  <div class="main-container">
    <SignupForm />
    <div class="right">
      <h1 class="subtitle">Already have an account?</h1>
      <div class="text">Login and start your project now!</div>
      <SlotButton class="login-btn" @click="$router.push('/Login')">Log in</SlotButton>
    </div>
  </div>
</template>

<!-- Import Signup Form and Slot Button from components -->
<script setup>
import SignupForm from "@/components/SignupForm.vue";
import SlotButton from "@/components/SlotButton.vue";
</script>

<style scoped>
.main-container {
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 11fr 9fr;
  width: 100%;
  height: 100vh;
  text-align: center;
}
.right {
  background-color: var(--primary);
  height: 100%;
  width: 45vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.text {
  width: 80%;
  font-size: 1.5rem;
  line-height: 1.9rem;
  margin-bottom: 1.75rem;
}
.subtitle {
  margin-bottom: 0.5rem;
}

.login-btn {
  width: 35%;
  color: var(--primary);
  background-color: #ffffff;
  height: 5rem;
  border-radius: 25px;
}
</style>

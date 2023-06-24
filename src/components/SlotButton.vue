<template>
  <button class="slot" type="button">
    <!-- slot outlet -->
    <slot></slot>
  </button>
</template>

<style scoped>
.slot {
  font-family: "Montserrat", sans-serif;
  display: inline-block;
  text-decoration: none;
  color: #333;
  font-weight: 600;
  font-size: 1.8rem;
  transition: all 0.3s;
  padding: 1.2rem 2.4rem;
  border-radius: 9px;
  color: #fff;
  background-color: var(--primary);
  border-width: 0;
}
.slot:hover {
  background-color: var(--secondary);
}
</style>

<template>
  <header class="header">
    <a href="#">
      <img class="logo" alt="Plan It. Logo" src="@/assets/plan-it.png" />
    </a>
    <nav class="main-nav">
      <ul class="main-nav-list">
        <!-- change a to router link -->
        <li><a class="main-nav-link" href="#">Home</a></li>
        <li><a class="main-nav-link" href="#">Profile</a></li>
        <li><a class="main-nav-link nav-cta" href="#">Log out</a></li>
      </ul>
    </nav>
  </header>
</template>

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
  color: #a2a9ed;
}

.main-nav-link.nav-cta:link,
.main-nav-link.nav-cta:visited {
  padding: 1.2rem 2.4rem;
  border-radius: 9px;
  color: #fff;
  background-color: #a2a9ed;
}

.main-nav-link.nav-cta:hover,
.main-nav-link.nav-cta:active {
  background-color: #d4d7fa;
}
</style>

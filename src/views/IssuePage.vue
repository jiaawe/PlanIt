<!-- Import Form from components -->
<script>
import Form from "@/components/Form.vue";

export default {
  name: "Issue",
  components: {
    Form,
  },
};
</script>

<template>
  <div class="issue-form">
    <div class="header-text-box">
      <h1 class="tagline">Have an issue on your project?</h1>
      <p class="header-text">
        Don't hesitate to raise your issue here. Our team of experts will help
        in resolving your issues.
      </p>
    </div>
    <Form />
  </div>
</template>

<!-- The style details of the issue page -->
<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Montserrat", sans-serif;
  line-height: 1;
  font-weight: 400;
  color: #555;
}

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

.issue-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 80px;
  margin-top: 64px;
}

.header-text-box {
  align-self: center;
}

.tagline {
  margin-bottom: 32px;
  font-size: 44px;
  line-height: 1.1;
  letter-spacing: -1px;
}

.header-text {
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 1.7;
}

.sub-heading {
  font-size: 32px;
  font-weight: 600;
}

hr {
  border-top: 5px solid var(--primary);
  width: 100px;
  margin: 12px auto 24px auto;
}

.userform {
  font-size: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  overflow: hidden;
}

.userform-text-box {
  padding: 24px 48px;
  color: #555;
}

.task-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
}

.form label {
  display: block;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}

.form input,
.form select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  font-family: inherit;
  color: inherit;
  border: none;
  border-radius: 9px;
  border: 0.1rem solid gray;
  margin-bottom: 16px;
}

.form input::placeholder {
  color: rgb(136, 136, 136);
}

textarea {
  width: 100%;
  padding-left: 8px;
  padding-top: 8px;
  font-size: 16px;
  border-radius: 9px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

textarea input::placeholder {
  color: rgb(136, 136, 136);
}

.btn,
.btn:link,
.btn:visited {
  font-size: 1.8rem;
  padding: 1.2rem 2.4rem;
  border-radius: 9px;
  color: #fff;
  background-color: var(--primary);
}

.btn:hover,
.btn:active {
  color: #fff;
  background-color: var(--secondary);
}

.text-box-tagline {
  text-align: center;
}

.userform *:focus {
  outline: none;
  box-shadow: 0 0 0 0.8rem rgba(253, 216, 255, 0.5);
}

.center-btn {
  display: block;
  margin: auto;
}
</style>

<template>
  <NavBar />
  <!-- 404 Page upon page that doesnt exist -->
  <div id="error-page">
    <div class="content">
      <div class="header">
        <img src="@/assets/404Error.gif" alt="" />
      </div>
      <h4 data-text="Opps! Page not found">Opps! Page not found</h4>
      <p>Sorry, the page you are looking for does not exist.</p>

      <div class="btns">
        <router-link :to="{ name: 'Home' }">
          <SlotButton>Back to Home</SlotButton></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SlotButton from "@/components/SlotButton.vue";
export default {
  components: { NavBar, SlotButton },
};
</script>

<style scoped>
#error-page {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
#error-page .content {
  max-width: 650px;
  text-align: center;
}
#error-page .header img {
  width: 380px;
}
#error-page h4 {
  position: relative;
  color: #000;
  font-size: 2em;
  text-transform: uppercase;
  margin-bottom: 20px;
}
#error-page h4::before {
  position: absolute;
  content: attr(data-text);
  top: 0;
  left: 0;
  right: 0;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.4);
}
#error-page p {
  font-size: 1.2em;
  color: #0d0d0d;
}
#error-page .btns {
  margin: 25px 0px;
  display: inline-flex;
}
#error-page .btns SlotButton {
  display: inline-block;
  text-decoration: none;
  padding: 10px 25px;
  border: 2px solid var(--primary);
  color: var(--primary);
  border-radius: 25px;
  font-weight: 500;
  margin: 0px 10px;
  text-transform: uppercase;
  transition: all 0.3s ease;
}
#error-page .btns SlotButton:hover {
  background: var(--primary);
  color: #fff;
}

router-link {
  text-decoration: none;
}
</style>

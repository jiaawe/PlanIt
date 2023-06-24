<template>
  <body>
    <!-- Navigation bar with Plan It logo and Features and Login buttons -->
    <header class="header">
      <a href="#">
        <img class="logo" alt="Plan It. Logo" src="@/assets/plan-it.png" />
      </a>
      <nav class="main-nav">
        <ul class="main-nav-list">
          <li><a class="main-nav-link" href="#features">Features</a></li>
          <router-link
            :to="{ name: 'Login' }"
            class="btn btn--full margin-right-sm"
            >Log in
          </router-link>
        </ul>
      </nav>
    </header>
    <main>
      <!-- Main section that shows Plan It's value proposition and hooks the users -->
      <section class="section-hero">
        <div class="hero">
          <div class="hero-text-box">
            <h1 class="heading-primary">
              Start your company journey with "Plan It" today!
            </h1>
            <p class="hero-description">
              Your #1 task tracker tool, ensure fast and reliable team
              organization!
            </p>
            <router-link
              :to="{ name: 'Sign Up' }"
              class="btn btn--full margin-right-sm"
              >Sign Up Now!</router-link
            >
            <a href="#features" class="btn btn--outline">Learn more &darr;</a>
          </div>
          <div class="hero-img-box">
            <img src="@/assets/hero-img.jpeg" class="hero-img" alt="hero img" />
          </div>
        </div>
      </section>

      <section class="section-featured">
        <!-- Section that shows the news outlets that have featured Plan It -->
        <div class="container">
          <h2 class="heading-featured-in">As featured in</h2>
          <div class="logos">
            <img src="@/assets/Google_2015_logo.png" alt="Google logo" />
            <img
              src="@/assets/Hewlett-Packard-Logo-PNG-Image.png"
              alt="Hewlett Packard logo"
            />
            <img src="@/assets/IBM_logo.png" alt="IBM logo" />
            <img
              src="@/assets/Microsoft_logo_(2012).png"
              alt="Microsoft Logo"
            />
            <img src="@/assets/Tesla_Motors_Logo.png" alt="Tesla Logo" />
          </div>
        </div>
      </section>
      <section class="section-features" id="features">
        <!-- Plan It detailed features to showcase how we could improve prospective clients -->
        <div class="container center-text">
          <span class="subheading">Features</span>
          <h2 class="heading-secondary">
            What can Plan It bring to your company?
          </h2>
          <div class="main">
            <div class="box box1">
              <div class="box-text">
                <h5>Supervisor</h5>
                <p class="box-description">
                  Monitors activity to identify project issues, request, etc.
                </p>
              </div>
              <img src="@/assets/icon-supervisor.svg" alt="icon" />
            </div>
            <div class="box box2">
              <div class="box-text">
                <h5>Team Builder</h5>
                <p class="box-description">
                  Easily assign employees to the current tasks
                </p>
              </div>
              <img src="@/assets/icon-team-builder.svg" alt="icon" />
            </div>
            <div class="box box3">
              <div class="box-text">
                <h5>Karma</h5>
                <p class="box-description">
                  Regularly evaluates our talent to ensure quality
                </p>
              </div>
              <img src="@/assets/icon-karma.svg" alt="icon" />
            </div>
            <div class="box box4">
              <div class="box-text">
                <h5>Tracker</h5>
                <p class="box-description">
                  One-stop dashboard to track employees' tasks
                </p>
              </div>
              <img src="@/assets/icon-dashboard.svg" alt="icon" />
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer class="footer">
      <!-- Footer that links to our social media -->
      <div class="container grid grid--footer">
        <div class="logo-col">
          <a class="footer-logo">
            <img class="logo" alt="Plan It logo" src="@/assets/plan-it.png" />
          </a>

          <ul class="social-links">
            <li>
              <a class="footer-link" href="#"
                ><ion-icon class="social-icon" name="logo-instagram"></ion-icon
              ></a>
            </li>
            <li>
              <a class="footer-link" href="#"
                ><ion-icon class="social-icon" name="logo-facebook"></ion-icon
              ></a>
            </li>
            <li>
              <a class="footer-link" href="#"
                ><ion-icon class="social-icon" name="logo-twitter"></ion-icon
              ></a>
            </li>
          </ul>

          <p class="copyright">
            <!-- Copyright details -->
            Copyright &copy; 2023 by Plan It, Inc. All rights reserved.
          </p>
        </div>
        <div class="address-col">
          <p class="footer-heading">Contact us</p>
          <address class="contacts">
            <p class="address">21 Lower Kent Ridge Rd, Singapore 119077</p>
            <p>
              <a class="footer-link" href="tel:8615-3021">+65 8615 3021</a
              ><br />
              <a class="footer-link" href="mailto:hello@planit.com"
                >hello@planit.com</a
              >
            </p>
          </address>
        </div>
        <nav class="nav-col">
          <!-- Part in the footer that shows the team members -->
          <p class="footer-heading">The Team</p>
          <ul class="footer-nav">
            <li class="author-name">Brandon Angga</li>
            <li class="author-name">Calvin Septyanto</li>
            <li class="author-name">Chen Jia Wei</li>
            <li class="author-name">Chong Wai Sheen</li>
            <li class="author-name">Hans Sebastian Mulyawan</li>
          </ul>
        </nav>
      </div>
    </footer>
  </body>
</template>

<!-- Import and setup onMounted to listen to all the links in the page and make necessary response -->
<script>
import { onMounted } from "vue";
export default {
  setup() {
    onMounted(() => {
      const allLinks = document.querySelectorAll("a:link");

      const smoothScroll = (e) => {
        e.preventDefault();
        const href = e.target.getAttribute("href");

        if (href === "#") {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }

        if (href !== "#" && href.startsWith("#")) {
          const sectionEl = document.querySelector(href);
          sectionEl.scrollIntoView({ behavior: "smooth" });
        }
      };

      allLinks.forEach((link) => {
        link.addEventListener("click", smoothScroll);
      });

      return () => {
        allLinks.forEach((link) => {
          link.removeEventListener("click", smoothScroll);
        });
      };
    });
  },
};
</script>

<!-- The style details of the landing page -->
<style scoped>
.container {
  /* 1140px */
  max-width: 120rem;
  padding: 0 3.2rem;
  margin: 0 auto;
}

.grid {
  display: grid;
  column-gap: 6.4rem;
  row-gap: 9.6rem;
}

.heading-primary,
.heading-secondary,
.heading-tertiary {
  font-weight: 700;
  color: #333;
  letter-spacing: -0.5px;
}

.heading-primary {
  font-size: 5.2rem;
  line-height: 1.05;
  margin-bottom: 3.2rem;
}

.heading-secondary {
  font-size: 4.4rem;
  line-height: 1.2;
  margin-bottom: 4.8rem;
}

.heading-tertiary {
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 3.2rem;
}

.subheading {
  display: block;
  font-size: 2rem;
  font-weight: 500;
  color: var(--primary);
  text-transform: uppercase;
  margin-bottom: 1.6rem;
  letter-spacing: 0.75px;
}

.btn,
.btn:link,
.btn:visited {
  display: inline-block;

  text-decoration: none;
  font-size: 2rem;
  font-weight: 600;
  padding: 1.6rem 3.2rem;
  border-radius: 9px;

  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s;
}

.btn--full:link,
.btn--full:visited {
  background-color: var(--primary);
  color: #fff;
}

.btn--full:hover,
.btn--full:active {
  background-color: var(--secondary);
}

.btn--outline:link,
.btn--outline:visited {
  background-color: #fff;
  color: #555;
}

.btn--outline:hover,
.btn--outline:active {
  background-color: var(--secondary);
  box-shadow: inset 0 0 0 3px #fff;
  color: white;
}

.list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.list-item {
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 1.6rem;
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

.section-hero {
  padding: 4.8rem 0 0rem 0;
}

.hero {
  max-width: 130rem;
  margin: 0 auto;
  padding: 0 3.2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9.6rem;
  align-items: center;
}

.hero-description {
  font-size: 2rem;
  line-height: 1.6;
  margin-bottom: 4.8rem;
}

.hero-img {
  width: 100%;
}

.section-featured {
  padding: 3.2rem 0 3.2rem 0;
}

.heading-featured-in {
  font-size: 1.4rem;
  text-transform: uppercase;
  letter-spacing: 0.75px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 2.4rem;
  color: #888;
}

.logos {
  display: flex;
  justify-content: space-around;
}

.logos img {
  height: 3.2rem;
  filter: brightness(0);
  opacity: 50%;
}

.section-features {
  padding: 9.6rem 0;
}

.main {
  display: grid;
  grid-template-columns: 500px 500px;
  column-gap: 100px;
  row-gap: 50px;
  align-items: center;
  justify-content: center;
}

.box {
  background-color: #fff;
  border-radius: 7px;
  padding: 12px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  transition: all ease 0.2s;
}

.box:hover {
  transform: scale(1.1);
  transition: all ease 0.2s;
}

.box-text {
  text-align: center;
  padding-bottom: 50px;
}

.box1 {
  border-top: 4px solid hsl(180, 62%, 55%);
}

.box2 {
  border-top: 4px solid hsl(0, 78%, 62%);
}

.box3 {
  border-top: 4px solid hsl(34, 97%, 64%);
}

.box4 {
  border-top: 4px solid hsl(212, 86%, 64%);
}

.box-text h5 {
  font-size: 30px;
  color: hsl(234, 12%, 34%);
  margin-bottom: 10px;
}

.box-description {
  font-size: 16px;
}

.section-pricing {
  margin-bottom: 10rem;
}

.switch input {
  opacity: 0;
}

.switch {
  display: inline-block;
  width: 60px;
  height: 32px;
  position: relative;
  cursor: pointer;
}

.slider {
  position: absolute;
  background: linear-gradient(180deg, hsl(236, 72%, 79%), hsl(237, 63%, 64%));
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 35px;
}

.slider:hover {
  background: hsl(236, 72%, 79%);
}

.slider::before {
  position: absolute;
  content: "";
  background-color: #fff;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  left: 4px;
  bottom: 4px;
  transition: 0.4s;
}

input:checked + .slider::before {
  transform: translateX(26px);
}

.pricing {
  color: hsl(234, 14%, 74%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
  padding-top: 12px;
}

.toggle-date {
  font-size: 20px;
}

.pricing label {
  margin: 0 20px;
}

.pricing-main {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.pricing-box {
  background: linear-gradient(180deg, hsl(236, 100%, 94%), hsl(237, 100%, 88%));
  padding: 50px 40px;
  padding-bottom: 20px;
  border-radius: 12px;
  align-self: center;
}

.box-title {
  color: #555;
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 600;
}

.price-annually,
.price-monthly {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #555;
}

.price-monthly {
  display: none;
}

.price {
  font-size: 65px;
  padding-left: 7px;
}

.info-box {
  list-style: none;
  padding: 35px 0px;
}

.info {
  color: hsl(233, 13%, 49%);
  /* grayish blue */
  border-bottom: 1px solid hsl(234, 14%, 74%);
  padding: 18px 0;
  font-size: 20px;
  text-align: center;
}

.info-box .info:first-child {
  border-top: 1px solid hsl(234, 14%, 74%);
}

.pricing-box.featured {
  background: linear-gradient(180deg, hsl(236, 72%, 79%), hsl(237, 63%, 64%));
  transform: scaleX(1.05);
  padding: 80px 40px;
  padding-bottom: 20px;
}

.pricing-box.featured p {
  color: #fff;
}

.pricing-box.featured ul .info {
  color: #fff;
}

.waitlist {
  margin-bottom: 2.4rem;
}

.container__subtitle {
  font-size: 2.4rem;
  text-align: center;
  font-weight: 300;
}

.container__email {
  margin: 4rem auto;
  width: 400px;
  justify-content: center;
  align-items: center;
  display: block;
  padding: 1rem;
  border: 0.1rem solid gray;
  opacity: 0.4;
  border-radius: 2rem;
}

.container__email::placeholder {
  width: 24rem;
  padding-left: 0.5rem;
}

.center-btn {
  display: block;
  margin: auto;
}

.section-waitlist {
  margin-bottom: 9.6rem;
}

.footer {
  padding: 4.8rem 0;
  border-top: 2px solid #eee;
}

.grid--footer {
  grid-template-columns: 1.5fr 1.5fr 1fr 1fr 1fr;
}

.logo-col {
  display: flex;
  flex-direction: column;
}

.footer-logo {
  display: block;
  margin-bottom: 3.2rem;
}

.social-links {
  list-style: none;
  display: flex;
  gap: 2.4rem;
}

.social-icon {
  height: 2.4rem;
  width: 2.4rem;
}

.copyright {
  font-size: 1.4rem;
  line-height: 1.6;
  color: #767676;
  margin-top: auto;
}

.footer-heading {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #8590f6;
}

.contacts {
  font-style: normal;
  font-size: 1.6rem;
  line-height: 1.6;
}

.address {
  margin-bottom: 2.4rem;
}

.footer-nav {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.footer-link:link,
.footer-link:visited {
  text-decoration: none;
  font-size: 1.6rem;
  color: #767676;
  transition: all 0.3s;
}

.footer-link:hover,
.footer-link:active {
  color: #555;
}

.author-name {
  font-size: 1.6rem;
  color: #767676;
}

.center-text {
  text-align: center;
}

strong {
  font-weight: 500;
}

.heading-packages {
  margin-bottom: 2.4rem;
}
</style>

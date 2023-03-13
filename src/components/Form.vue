<script>
import firebaseApp from '../firebase.js'
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  // methods: {
  //   async savetofs(){
  //     console.log("IN AC")

  //     let subject = document.getElementById("issue").value
  //     let description = document.getElementById("description").value

  //     alert(" Saving your issues : " + subject)

  //     try{
  //       const docRef = await setDoc(doc(db, "Issues", subject), {
  //         Subject:subject, 
  //         Desc:description
  //         })
  //       console.log(docRef)
  //       document.getElementsByClassName("form").reset();
  //       this.$emit("added")
  //     }
  //     catch(error){
  //       console.error("Error adding issue: ", error);
  //     }
  //   }
  // }
}
</script>

<template>
  <div class="form-page">
    <div class="userform-text-box">
      <h2 class="text-box-tagline sub-heading">Submit Your Issue</h2>
      <hr />
      <form class="form" action="#">
        <div>
          <label>Task Name</label>
          <p class="task-name">A/B Testing on Sales Ads Campaign</p>
        </div>

        <div>
          <label for="issue">Issue Subject</label>
          <input
            id="issue"
            type="text"
            placeholder="Enter Issue Subject"
            required
          />
        </div>
        
        <div>
          <label for="description">Description</label>
          <textarea
            id="description"
            rows="4"
            cols="50"
            placeholder="Describe your issue"
          ></textarea>
        </div>
        <button class="btn center-btn" v-on:click = "savetofs">Submit Issue</button>
      </form>
    </div>
  </div>
</template>

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
  border-top: 5px solid #464f9e;
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
  background-color: #a2a9ed;
}

.btn:hover,
.btn:active {
  color: #fff;
  background-color: #d4d7fa;
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

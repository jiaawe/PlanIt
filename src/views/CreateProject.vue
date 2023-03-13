<template>
    <main>
      <section>
        <div class="container">
          <div class="issue-form">
            <div class="header-text-box">
              <h1 class="tagline">Fill in your Project Details.</h1>
              <p class="header-text">
                Fill in the necessary details for your project
              </p>
            </div>
            <div class="form-page">
              <div class="userform-text-box">
                <h2 class="text-box-tagline sub-heading">
                  Create Your Project
                </h2>
                <hr />
                <form class="form" action="#">
                  <div>
                    <label for="taskname">Name of The Project</label>
                    <input
                      id="taskname"
                      type="text"
                      placeholder="Enter Project Name"
                      required
                    />
                  </div>

                  <div>
                    <label for="description">Description</label>
                    <textarea
                      id="description"
                      rows="4"
                      cols="50"
                      placeholder="Describe your Project"
                    ></textarea>
                  </div>

                  <div>
                    <label for="deadline">Deadline</label>
                    <input id="deadline" type="date" />
                  </div>

                  <SlotButton class="center-btn">Submit Project</SlotButton>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
</template>

<script>
import SlotButton from '../components/SlotButton.vue';
export default {
    name: 'CreateProject',
    components: { SlotButton }


}
</script>

<style scoped>


.issue-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 80vh;
}

.header-text-box {
  align-self: center;
  text-align: center;
}

.tagline {
  margin-bottom: 32px;
  font-size: 4rem;
  line-height: 1.1;
  letter-spacing: -1px;
}

.header-text {
  margin-bottom: 24px;
  font-size: 1.75rem;
  line-height: 1.7;
}

.sub-heading {
  font-size: 32px;
  font-weight: 600;
}

.form-page {
    display:flex;
    flex-direction: column;
    justify-content: center;
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

#collaborator {
  margin-bottom: 16px;
}


</style>
<template>
    <main>
      <section>
        <div class="container">
          <div class="issue-form">
            <div class="header-text-box">
              <h1 class="tagline">Task Details</h1>
              <!-- <p class="header-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p> -->
            </div>
            <div class="form-page">
              <div class="userform-text-box">
                <h2 class="text-box-tagline sub-heading">Overview</h2>
                <hr />
                <form class="form" action="#">
                  <div class="field">
                    <label for="taskname">Task Name</label>
                    <p class="field-input"> {{ taskDetails.taskName }} </p>
                  </div>

                  <div class="field">
                    <label for="deadline">Deadline</label>
                    <p class="field-input"> {{ taskDetails.deadline }} </p>
                  </div>

                  <div class="field">
                    <label for="priority">Priority</label>
                    <p class="field-input"> {{ taskDetails.priority }} </p>
                  </div>

                  <div class="field">
                    <label for="file">Attachments</label>
                    <p class="field-input" v-if="!taskDetails.attachments.length"> None </p>
                    <p class="field-input" v-else v-for="file in taskDetails.attachments"> {{ file }} </p>
                  </div>

                  <div class="field">
                    <label for="workload">Estimated Num. of Hours</label>
                    <p class="field-input"> {{ taskDetails.estimatedNumOfHrs }} </p>
                  </div>

                  <div class="field">
                    <label for="collaborator">Assigned Employee</label>
                    <p class="field-input" > {{ taskDetails.assignedEmployee }} </p>
                  </div>
                </form>
                <br>
                <div class="edit-task">
                  <SlotButton>Edit Task</SlotButton>
                </div>
              </div>
            </div>
          </div>          
        </div>
      </section>
    </main>
</template>

<script>
import SlotButton from '@/components/SlotButton.vue'

export default {
    name: "TaskDetailsPage",
    
    components: { SlotButton },
    
    data() {
        return {
            taskDetails: {
                taskId: 123,
                taskName: "Data Pipelines Migration",
                deadline: "22/09/2023",
                priority: "Low",
                attachments: ["pipelines-migration-details.pdf", "tests.txt", "references.docx"],
                estimatedNumOfHrs: 40,
                assignedEmployee: "Chen Jia Wei"
            }
            
        }
    }
}
</script>

<style scoped>
.issue-form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* column-gap: 80px; */
    margin-top: 50px;
    margin-bottom: 50px;
}

.header-text-box {
    padding: 5vw;
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

.text-box-tagline {
  text-align: center;
}

.userform *:focus {
  outline: none;
  box-shadow: 0 0 0 0.8rem rgba(253, 216, 255, 0.5);
}

.field {
    margin-bottom: 2rem;
}

.field-input {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 0.7rem;
}

#collaborator {
  margin-bottom: 16px;
}

.edit-task {
  display: flex;
  width: 100%;
  justify-content: center;
}

</style>
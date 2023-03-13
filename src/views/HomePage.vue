<template>
    <main>
        <div class="project-header">
            <h2 class="header-title">Projects</h2>
            <button class="create-btn">Create Project</button>
        </div>
        <div class="project-subheader">
            <div>
            <input type="text" class="search-bar">
            </div>
            <div class="dropdown">
            <button class="dropbtn">
                <span>All Projects</span>
                <ion-icon id="down" name="chevron-down-outline"></ion-icon>
            </button>
            </div>
        </div>
        <div class="main-container">
            <div class="table-container">
            <table class="table" id="table">
                <tr class="table-head">
                    <th class="namecol">Name</th>
                    <th class="owncol">Owner</th>
                    <th class="createcol">Deadline</th>
                </tr>
                <tr v-for="project in projects" :key="project.id" class="row-data">
                    <td>{{ project.name }}</td>
                    <td>{{ project.owner }}</td>
                    <td>{{ project.deadline}}</td>
                </tr>
            </table>
            </div>
            <div class="timeline">
                <h3 class="tl-head">Upcoming Task</h3>
                <br>
                <hr>
                <div v-for= "task in tasks" :key="task.id" class="card">
                    <h3 class="task-title">{{ task.name }}</h3>
                    <span class="project-title"><u>{{ task.project }}</u></span>
                    <span class="due">{{ task.due }}</span>
                </div>
            </div>
        </div>
    </main>

</template>

<script>
    export default {
        name: 'HomePage',

        data(){
            return{
                projects: [
                    {id: 1,name: 'Project1', owner: 'Owner1', deadline:'MAR 2023'},
                    {id: 2,name: 'Project2', owner: 'Owner2', deadline:'MAY 2023'},
                    {id: 3,name: 'Project3', owner: 'Owner3', deadline:'SEP 2023'},
                    {id: 4,name: 'Project4', owner: 'Owner4', deadline:'DEC 2023'},
                    {id: 5,name: 'Project5', owner: 'Owner5', deadline:'JAN 2024'}
                ],
                tasks: [
                    {id:1, name: 'Create firestore database', project: 'Project 1', due:'4 Feb at 8:36'},
                    {id:2, name: 'Create firestore database', project: 'Project 1', due:'4 Feb at 8:36'},
                    {id:3, name: 'Create firestore database', project: 'Project 1', due:'4 Feb at 8:36'}
                ]
            }
        },
        
    }
</script>

<style scoped>

button,
.btn {
  background: var(--secondary);
  border-radius: 8px;
  border: 0;
  padding: 8px 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-block;
}
button:hover,
.btn:hover {
  background: var(--primary);
  color: white;
}
button:disabled {
  opacity: 0.5;
  color: var(--primary);
  background: var(--secondary);
  cursor: not-allowed;
}

/* forms */
form {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  border: 3px solid #4f515a;
  background: rgb(237, 232, 232);
}
input,
textarea {
  background-color: #e6e7f0;
  height: 1.5rem;
  border: 0;
  border-radius: 8px;
  padding: 10px;
  outline: none;
  display: block;
  width: 50%;
  /* box-sizing: border-box; */
  margin: 20px auto;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7rem;
  margin-top: 3rem;
}

.header-title {
  margin-left: 4rem;
  font-size: 3rem;
}

.create-btn {
  margin-right: 4rem;
  padding: 1.2rem;
  font-size: 1.5rem;
  border-radius: 0px;
}

.project-subheader {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
}

.search-bar {
  box-sizing: content-box;
  border-radius: 5px;
  /* width: 10%; */
  width: 15vw;
  min-width: 150px;
  margin: 0 2rem 0 4rem;
  background-color: rgb(255, 255, 255);
  /* margin-left: 4rem; */
  background-image: url("img/search-icon.webp");
  background-size: 2rem;
  background-position: 95% ;
  background-repeat: no-repeat;
  font-size: 1.3rem;
  /* padding: 14px 20px 12px 45px; */
  border: 2px solid rgb(178, 176, 176);
  /* margin-right: 2rem; */

}

.dropbtn {
  background-color: rgb(237, 232, 232);
  box-sizing: content-box;
  border-radius: 0;
  width: 200px;
  display: flex;
  justify-content: space-between;
}

.main-container { 
  /* background-color: rgb(96, 124, 148); */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.timeline {
  max-width: 30vw;
  flex-grow: 3;
  /* background-color: burlywood; */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table-container {
  flex-grow: 7;
  margin-left: 4rem;
  display: flex;
  flex-direction: column;
  align-items:flex-start;
}

.table {
  width:95%;
  border-bottom: 2px solid rgba(186, 212, 186, 0.82);
}

th {
  border-top: 0;
  border-bottom: 2px solid rgba(186, 212, 186, 0.82);
  height: 30px;
  font-size: 1.75rem;
  text-align: start;
}

td {
  font-size: 1.4rem;
  padding: 0.5rem
}

table {
    border-collapse: separate;
    border-spacing: 0.5rem;
}


.namecol {
  border-left: 0;
  width: 35%;
}

.owncol {
  width: 30%;
}

.menucol {
  width: 4%;
  border-left: 0
}

.menu-btn {
  background-color: transparent;
}

.menu-btn:hover {
  background-color: transparent;
}

.cell4 {
  text-align: center;
}

.row-data:hover {
  background-color: rgb(231, 231, 231);
  cursor: pointer;
}

.tl-head {
  /* border-bottom: 2px solid #555; */
  font-size: 1.75rem;
  align-self: center;
}

hr {
  width: 95%;
  height: 2px;
  background-color: rgba(186, 212, 186, 0.82);
  border:none;
}

.card{
  width: 90%;
  margin-top: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  padding: 2rem 1.5rem;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.task-title {
  font-size: 1.5rem;
  word-wrap: normal;
  margin-bottom: 0.5rem;
}

.project-title {
  font-size: 1.5rem;
  display: block;  
  margin-bottom: 0.5rem;
}

.due {
  font-size: 1.25rem;
}

</style>
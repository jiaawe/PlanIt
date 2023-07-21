# Project Management System - Plan It
<b>Project Link: </b> https://planit-5dfc0.web.app/ <br> <br>
<b>Project Members</b>: <br>
Chen Jia Wei <br>
Calvin Septyanto <br>
Chong Wai Sheen <br>
Brandon Angga <br>
Hans Sebastian Mulyawan 
<br><br>

## Account Details
**Manager Account** <br>
Email: manager@planit.com <br>
Password: manager <br> 

**Employee One Account** <br>
Email: employee1@planit.com <br>
Password: employee <br> 

**Employee Two Account** <br>
Email: employee2@planit.com <br>
Password: employee2 <br> <br>

## Content Page
- Executive Summary
- Introduction
   - Problem Statement
   - Project Objectives
   - Project Scope
- User Stories
   - Authentication, Profile, Navigation
   - Projects, Tasks, Issues
- Requirements
   - Functional
   - Non-functional
   - Limitations
- User Flow
- Data Diagrams
   - Logical Diagram
   - Entity Relationship Diagram
- SCRUM Execution
   - Roles and Responsibilities
   - Product Backlog
   - Sprint 1 (13 March 2023 - 27 March 2023)
      - Sprint Goal
      - Sprint 1 Backlog
      - Sprint 1 Review
      - Sprint 1 Retrospective
      - Sprint 1 Burndown Chart
- Design
- Code Design & Principles
   - Abstraction
   - Clear-defined comments and methods
   - Don’t Repeat Yourself (DRY) Principle
- Prototype
   - Landing Page
   - Authentication Page
   - Navigation Bars
   - Home Page
   - Project Dashboard
   - Tasks
   - Issues
   - Employee Analytics Dashboard
   - Profile Page
- Relevant Links
   - Deployed Application
      - Manager testing account
      - Employee testing accounts
   - Github
   - Scrum
   - Video
- References
<br><br>

## Executive Summary

Plan It is a web application that aims to enhance effective collaboration in the workplace, and to accommodate flexible working arrangements for companies. With a shift towards remote work arrangements, managers are finding it challenging to efficiently manage and drive project developments forward while accurately assessing each employee's contributions. Plan It provides a centralized project management solution to address this pain point.

The application simplifies delegation of projects and tasks to employees, with an assigned priority and deadline for completion. It also provides an informative display of project and task details and requirements, as well as a simple and intuitive timeline of upcoming deadlines for projects and tasks. Employees can easily submit completed tasks for review, and managers can address any concerns or issues raised in relation to allocated tasks. An automated feature analyzes the total contributions in working hours and past allocated tasks of an employee, which allows managers to determine if more or less work should be allocated to the employee.

Plan It is designed to support multiple industries and types of businesses, such as finance, information technology, marketing, construction, healthcare, and more. It provides a structured and centralized management solution to enhance effective collaboration in the workplace. In order to preserve information security, and to provide a more customized experience, Plan It will be sold exclusively to a single client entity at a time, and will not accommodate cross-company project management collaborations.

Developed using consistent design principles and code that is easy to read, write, and maintain, Plan It is an intuitive application to use and navigate. Its functionalities are based on a thorough analysis and breakdown of user stories and user requirements. Along with breaking down the user flow and relationships, this report also analyses and identifies seven user requirement categories and five limitations.

The application was also developed with SCRUM principles, where the project development was conducted in an agile and user-centric way. User stories were completely laid out in the beginning, and further broken down into concrete tasks, which were completed and reviewed in bi-weekly sprints. With comprehensive documentation and continuous check-up, the project is driven at a consistent pace towards the final deadline.

In summary, Plan It is a web application that optimizes any business by providing a centralized project management solution to enhance effective collaboration in the workplace. With its intuitive design, simple delegation of projects and tasks, and automated documentation feature, managers can efficiently manage projects and accurately assess employee contributions even in the face of remote work arrangements.
<br><br>

## Introduction
### Problem Statement
Most of the companies right now are experiencing a shift in work culture, with a staggering 58% of the companies offering hybrid or remote work arrangements, at least part-time (Dua, 2022). It becomes more challenging for managers to efficiently coordinate and drive project developments forward (Mishra, 2021). At the same time, fair task delegations and accurate assessments of each employee's contributions are becoming more important than ever in providing quantifiable insights and analysis to make informed decisions on work expectations and rewards (Madell, 2022). Thus, with employers and employees alike pushing for flexible work arrangements, there is a need for a non-physical yet structured and centralized environment that allows effective progress tracking and collaboration.

### Project Objectives
We aim to create a web application that allows for a centralized project management to enhance effective collaboration in the workplace, and is able to accommodate flexible working arrangements. The following benefits to adopting our application are:

Simple delegation of projects and tasks to employees, with an assigned priority and deadline for completion.
Informative display of project and task details and requirements.
Simple and intuitive timeline of upcoming deadlines for projects and tasks.
Fast and easy task status updates by employees upon completion and allows the manager to track and review them.
Provides an avenue to raise concerns and issues for the employee’s allocated tasks, which allows managers to address them.
Automated documentation of the total contributions in working hours and past allocated tasks/projects of an employee. This allows managers to determine if more or less work should be allocated to the employee.

### Project Scope
Plan It is meant to support multiple different industries and types of businesses that involve project planning and/or tracking of employee contributions, such as finance and insurance, information technology, management, professional services, education, etc. These industries (Smit, 2020), in particular, are the sectors that are generally task-driven. The drive towards work-from-home arrangements makes project management platforms an integral tool in digitizing task distribution. Thus, Plan It was first created with this in mind: to maintain the effectiveness of these remote arrangements and task and project delegation processes. Furthermore, to prevent security breach and offer customized experiences, Plan It will be sold exclusively to a single client entity at a time, and will not accommodate cross-company project management collaborations.
<br><br>

## User Stories
### Authentication, Profile, Navigation
<ol>
   <li>As a user, I want to be able to securely register, log in to, and log out of my account so that I can access the project management tools features and protect my personal data.</li>
   <li>As a manager, I want to be able to authenticate my employees’ account to my projects so that they can only view and edit the information that they need.</li>
   <li>As a user, I want to be able to view and update my personal information (department and contact number) so that my team and manager are up-to-date.</li>
</ol>

### Projects, Tasks, Issues
<ol>
    <li>As a manager, I want to be able to easily create projects and delegate tasks to employees, assigning priorities and deadlines to ensure that work is completed on time, within budget, and according to expectations.</li>
    <li>As a manager, I want to be able to view all active and completed projects and tasks, along with their respective details, requirements, and timelines to ensure that everything is on track and aligned with our goals.</li>
    <li>As a manager, I want to have higher visibility to fairly divide project responsibilities among the team members according to priorities, urgencies, and weights of active tasks currently being worked on by each individual.</li>
    <li>As a manager, I want to be able to analyze employees’ individual contributions in working hours and past allocated tasks/projects which will help me make informed decisions on promotions, bonuses, and work allocations.</li>
    <li>As a manager, I want to be able to manage employees in my projects, including adding and removing employees, so that the team's access is up-to-date and secure.</li>
    <li>As an employee, I want to be able to easily filter all of my assigned tasks and projects, including their priorities and requirements, so that I can meet expectations effectively.</li>
    <li>As an employee, I want to have a clear view of upcoming deadlines and be able to manage my workload accordingly, to avoid delays or missed deadlines.</li>
    <li>As an employee, I want to be able to easily view other team members’ tasks so that I can understand what is the progress of the other tasks that my tasks are dependent on and help other team members to expedite the project completion.</li>
    <li>As an employee, I want to have a platform to raise any concerns or issues related to my allocated tasks or projects, so that my manager can address them efficiently.</li>
    <li>As an employee, I want to gain higher transparency of task divisions so that I could understand if I were fairly rewarded according to my contribution to the team.</li>
    <li>As an employee, I want to be able to thrive even in remote work arrangements by updating task statuses easily and efficiently through the application, so that my manager can review and approve them in a timely manner.</li>
</ol> <br>

## Requirements
### Functional
<table>
  <tr>
   <td><strong>S/N</strong>
   </td>
   <td><strong>Requirements Description</strong>
   </td>
   <td><strong>Acceptance Criteria</strong>
   </td>
   <td><strong>Priority</strong>
   </td>
  </tr>
  <tr>
   <td colspan="4" >Authentication
   </td>
  </tr>
  <tr>
   <td>1.1
   </td>
   <td>Managers and Employees must be able to register to the system by inputting a valid company email, name, contact number, password, company, department and role. The employee account is created upon successful validation of credentials. There should not be repeated usage of company email. For managers, they will additionally be prompted to enter a company’s secret code as validation.
   </td>
   <td>Success message must be shown upon successful registration, else show an error message for the invalid fields.
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>1.2
   </td>
   <td>Managers and Employees with existing accounts should be able to log in with their company email and password. 
   </td>
   <td>Home Page shown upon successful login, else return an error message stating invalid credentials
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>1.3
   </td>
   <td>Managers and Employees can reset their password by pressing the “Forget Password” button. Upon entering a valid company email, instructions to resetting the password will be sent to the email.
   </td>
   <td>Success message upon successful password reset, informing the user to check their email for instructions, else return an error message
   </td>
   <td>Medium
   </td>
  </tr>
  <tr>
   <td>1.4
   </td>
   <td>Managers and Employees should be able to log out of the system. There will be a logout button on the navigation bar after they are logged in.
   </td>
   <td>Upon pressing the logout button, the user is logged out of the system and brought to the landing page
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td colspan="4" >Home Page
   </td>
  </tr>
  <tr>
   <td>2.1
   </td>
   <td>Managers can view <strong>all</strong> projects created by them and Employees can view projects they are <strong>working on</strong>. Ongoing projects will be displayed on the top, while completed projects are below and grayed out, sorted by their deadlines.
   </td>
   <td>All projects and its details (name, manager and deadlines) are listed on this page. Only projects associated with the manager or employee are shown.
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>2.2
   </td>
   <td>Managers can search for projects created by them and Employees can search for projects they are working on. The result shows the projects that are filtered out according to the input.
   </td>
   <td>Out of all projects associated with them, only those with names that partially or fully contain the input are shown. A message stating no results is shown if no such project title is found.
   </td>
   <td>Low
   </td>
  </tr>
  <tr>
   <td>2.3
   </td>
   <td>Managers can create new projects. They will be prompted to input the project’s name, description and deadline, which are all compulsory fields. Project description has to be at least 10 words.
   </td>
   <td>Upon creation of a new project, a success message appears and the new project is displayed. Else, an error message is shown.
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>2.4
   </td>
   <td>Managers can view<strong> all</strong> current tasks for their projects. Employees can view all current tasks<strong> assigned</strong> to them to be completed. These tasks are sorted by due date, from earliest to latest, and then priority.
   </td>
   <td>All current tasks are displayed chronologically according to the due date and priority on the right side of the home page. A scrollable list will display up to three tasks.
   </td>
   <td>Medium
   </td>
  </tr>
  <tr>
   <td colspan="4" >Project Dashboard - Employees
   </td>
  </tr>
  <tr>
   <td>3.1
   </td>
   <td>Employees can view all created tasks in the project. The tasks will be split in 3 different sections in this order: Open, Pending Review, and Closed. The tasks are sorted according to the deadline in each section. Tasks that are Open but overdue will be highlighted.
   </td>
   <td>Displays all of the tasks in the project, sorted accordingly in the project dashboard sections. Tasks that are Open but overdue will have their due date highlighted in red.
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>3.2
   </td>
   <td>Employees can filter their <strong>assigned </strong>tasks in the project.
   </td>
   <td>Displays all tasks in the project <strong>assigned </strong>to the employee, sorted accordingly in the project dashboard sections.
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>3.3
   </td>
   <td>Employees should be able to search for the task title. There will be a search bar where the title of the task can be searched. The result shows the tasks that are filtered out according to the input and current filter view (all or assigned tasks).
   </td>
   <td>Only those with titles that partially or fully contain the user input are shown. The sections will be blank if no such task title is found.
   </td>
   <td>Medium
   </td>
  </tr>
  <tr>
   <td>3.4
   </td>
   <td>Employees can view all issues for the project. All issues raised will be displayed in the issues tab. Ongoing issues will be displayed in the open section while resolved issues are displayed in the closed section. The issues are sorted according to the date posted.
   </td>
   <td>Upon pressing on the issues tab, all the raised issues for the project are displayed in the respective section, sorted accordingly to date posted.
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>3.5
   </td>
   <td>Employees can send their <strong>assigned</strong> tasks to managers for review. The status of the task will be Pending Review after submission which will be resolved by the managers.
   </td>
   <td>Upon sending the task for review, the project dashboard will be updated, with the task being in the Pending Review section now.
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>3.6
   </td>
   <td>Employees can view the project’s details. The project’s details page displays the project’s name, description, deadline, manager, progress bar and project roadmap.
   </td>
   <td>All of the project details are displayed. The progress bar should show the current percentage of tasks completed. The roadmap shows a timeline of completed and current tasks.
   </td>
   <td>Low
   </td>
  </tr>
  <tr>
   <td colspan="4" >Project Dashboard - Managers
   </td>
  </tr>
  <tr>
   <td>4.1
   </td>
   <td>Managers can view <strong>all </strong>tasks for the project. The tasks will be split in 3 different sections in this order: Open, Pending Review, and Closed. The tasks are sorted according to the deadline in each section. Tasks that are Open but overdue will be highlighted.
   </td>
   <td>Displays <strong>all</strong> of the tasks in the project, sorted accordingly in the project dashboard. Tasks that are Open but overdue will have their due date highlighted in red.
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>4.2
   </td>
   <td>Managers should be able to search for the tasks title. There will be a search bar where the title of the task can be searched. The result shows the tasks that are filtered out according to the input.
   </td>
   <td>Out of all the tasks, only the tasks with titles that partially or fully contain the user input are shown. The sections will be blank if no such task title is found.
   </td>
   <td>Low
   </td>
  </tr>
  <tr>
   <td>4.3
   </td>
   <td>Managers can add and remove other employees from the project. Upon entering a valid employee’s company email address, they will be added into the project. The manager can then also select and remove employees working on this project.
   </td>
   <td>When an employee’s access is granted or removed successfully, a success message appears. The project’s details page and the list of projects on the newly added or removed employee’s home page will be updated. Else an error message appears.
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>4.4
   </td>
   <td>Managers can create new tasks within a project. The task will be created upon inputting the task title, deadline, description, priority, assigned employee (select one from a list of employees currently in the project), estimated working hours and attached files. All fields are compulsory except for attached files, with a minimum of 10 words for the task description.
   </td>
   <td>A success message will be displayed upon successful task creation. Else, a warning will be shown to fill in all necessary inputs that are missing or invalid
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>4.5
   </td>
   <td>Managers can view all issues for the project. All issues raised will be displayed on a separate tab in the project dashboard. Ongoing issues will be displayed in the open section while resolved issues are displayed in the closed section. The issues are sorted according to the date posted.
   </td>
   <td>Upon pressing on the issues tab, all the raised issues for the project are displayed in the respective section, sorted accordingly to date posted.
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>4.6
   </td>
   <td>Managers can close issues for the project. There will be a prompt shown to the manager for confirmation when closing the issue.
   </td>
   <td>Upon successful closure of the issue, it will be removed from the Open section to the Closed section in the issues tab.
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>4.7
   </td>
   <td>Managers should be able to close their project. Upon pressing the close project button, a warning will be shown to confirm the closure of the project. The warning will notify the manager if there are still unfinished tasks.
   </td>
   <td>Upon successful closure of the project, a success message will be shown. The project will be grayed out in the employees’ and managers’ home page. Else, an error message is shown.
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>4.8
   </td>
   <td>Managers can close tasks that are currently open in the task tab. A message will also be sent to confirm the closure of the task.
   </td>
   <td>Upon successful closure of the task, the project dashboard will be updated, with the task being in the Closed section now. Otherwise, an error message is shown.
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>4.9
   </td>
   <td>Managers can accept or reject tasks that are pending review. A message will be sent to confirm action.
   </td>
   <td>Upon accepting or rejecting the task review, the project dashboard will be updated with the task being in the Closed or Open section respectively. Else, an error message is shown.
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>4.10
   </td>
   <td>Managers can view the project’s details. The project’s details page displays the project’s name, description, deadline, manager, progress bar and project roadmap.
   </td>
   <td>All of the project details are displayed. The progress bar should show the current percentage of tasks completed. The roadmap shows a timeline of completed and current tasks.
   </td>
   <td>Low
   </td>
  </tr>
  <tr>
   <td colspan="4" >Task Page 
   </td>
  </tr>
  <tr>
   <td>5.1
   </td>
   <td>Managers and Employees can view task title, deadline, description, priority, assigned employees, estimated working hours and attached optional files.
   </td>
   <td>Pressing on the task in the project dashboard should bring the user to the task page and  display all the task details as listed.
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>5.2
   </td>
   <td>Employees should be able to raise issues for the task. The employee will be prompted to enter a title for the issue and a description for that particular task ID. A minimum of 10 words will be required for the description.
   </td>
   <td>Upon successful submission of the issue, a success message will be displayed. The issue will be displayed on the issues tab in the project’s dashboard. Else, an error message is shown.
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td colspan="4" >Employee Analytics Dashboards - Managers only
   </td>
  </tr>
  <tr>
   <td>6.1
   </td>
   <td>Managers can search for other employees. There will be a search bar where the manager can input the employee’s name or email address to search for him/her.
   </td>
   <td>All employees’ names or email addresses that match the input will be displayed. Otherwise, a “no employee found” message is displayed.
   </td>
   <td>Medium
   </td>
  </tr>
  <tr>
   <td>6.2
   </td>
   <td>Managers can view employee’s total assigned projects and tasks, task completion rate, estimated working hours per week and monthly completed tasks.
   </td>
   <td>Upon searching and selecting the employee, all the details mentioned should be displayed.
   </td>
   <td>Medium
   </td>
  </tr>
  <tr>
   <td colspan="4" >Profile Page
   </td>
  </tr>
  <tr>
   <td>7.1
   </td>
   <td>Managers and employees will be able to view their personal details. Their name, company email, contact number, department and role will be shown.
   </td>
   <td>On the profile page, they should be able to see their listed personal details
   </td>
   <td>Medium
   </td>
  </tr>
  <tr>
   <td>7.2
   </td>
   <td>Managers and employees can edit these following personal details: name, department and contact number. These details will be validated, similar to authentication.
   </td>
   <td>Upon successful edit, a success message will be displayed. Else, show an error message for the invalid fields
   </td>
   <td>Low
   </td>
  </tr>
</table> <br>

### Non-functional

<table>
  <tr>
   <td><strong>System Attributes</strong>
   </td>
   <td><strong>Attributes Description</strong>
   </td>
  </tr>
  <tr>
   <td rowspan="2" >Performance
   </td>
   <td>Processing of each request should be done within 2 seconds.
   </td>
  </tr>
  <tr>
   <td>Application should load within 2 seconds given a high number of users (> 100 users).
   </td>
  </tr>
  <tr>
   <td>Reliability
   </td>
   <td>Processing requests must perform successfully for at least 95% of use cases.
   </td>
  </tr>
  <tr>
   <td>Usability
   </td>
   <td>Intuitive and interactive application with a simple design. Page elements are designed with a common theme. To minimize clutter, there should not be any redundant features, buttons, pages, etc. that are not useful for the application.
   </td>
  </tr>
  <tr>
   <td>Availability
   </td>
   <td>Application must be available to users at least 98% of the time of the month
   </td>
  </tr>
  <tr>
   <td rowspan="6" >Security
   </td>
   <td rowspan="3" >There will be validation of credentials when employees and managers are trying to log in to the application. Any invalid credentials will be denied access.
   </td>
  </tr>
  <tr>
  </tr>
  <tr>
  </tr>
  <tr>
   <td>Passwords are stored in Firebase Authentication that employs password hashing to secure protection and confidentiality.
   </td>
  </tr>
  <tr>
   <td>Managers have access to certain pages, in which the Employee won’t be able to access.
   </td>
  </tr>
  <tr>
   <td>Both Manager and Employee accounts must be registered with a valid company email. Manager accounts must be created with an additional secret code specified by the company to the manager, where they will be validated afterwards.
   </td>
  </tr>
</table> <br>

### Limitations
1. Only one manager is in-charge of a project and given full administrative access. Similarly, only one employee is assigned to a task. In the real world, there could be some instances where there are multiple managers involved in a huge project and multiple employees working on a singular task.
2. There could be different levels of administrative access given, besides just employees and managers. E.g. CEO, CFO, etc. which should be able to view all of the company’s projects, instead of just the ones they are involved in.
3. Lack of departmentalization like in a real-world scenario where employees and managers are under teams. Managers can then track team members easily.
4. There could be better metrics to track the project’s progress (E.g. task completion rate weighted by priority and difficulty) and to assess employees’ contributions (E.g. quality of task reviews rated by manager).
5. Issues raised by employees can be further categorised based on their severity and give managers prompt reminders about urgent issues. <br><br>

## User Flow








## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

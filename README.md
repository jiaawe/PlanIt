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
</ol>













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

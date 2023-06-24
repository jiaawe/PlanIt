import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import HomePage from "../views/HomePage.vue";
import CreateProject from "../views/CreateProject.vue";
import ProjectPage from "../views/ProjectPage.vue";
import TasksTab from "../components/TasksTab.vue";
import IssuesTab from "../components/IssuesTab.vue";
import Profile from "@/views/ProfilePage.vue";
import Analytics from "@/views/Analytics.vue";
import EmployeePerformance from "@/components/EmployeePerformance.vue";
import ProjectRoadmap from "@/components/ProjectRoadmap.vue";
import LandingPage from "@/views/LandingPage.vue";
import CreateTask from "../views/CreateTask.vue";
import TaskDetails from "../views/TaskDetails.vue";
import AddEmployee from "../components/AddEmployee.vue";
import RaiseIssue from "../views/RaiseIssue.vue";
import IssueDetails from "../components/IssueDetails.vue";
import NotFound from "@/views/NotFound.vue";

// auth for page access
import { auth } from "@/firebase/firebase";

const requireAuth = (to, from, next) => {
  let user = auth.currentUser;
  if (!user) {
    next("/"); // Redirect to the login page if the user is not authenticated
  } else {
    next();
  }
};

// Set routes path
const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingPage,
  },
  {
    path: "/Home",
    name: "Home",
    component: HomePage,
    beforeEnter: requireAuth,
    meta: { requiresAuth: true },
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Register",
    name: "Sign Up",
    component: Register,
  },
  {
    path: "/CreateProject",
    name: "Create Project",
    component: CreateProject,
    beforeEnter: requireAuth,
  },
  {
    path: "/Project/:id",
    name: "Project",
    component: ProjectPage,
    beforeEnter: requireAuth,
    children: [
      {
        path: "tasks",
        component: TasksTab,
      },
      {
        path: "issues",
        component: IssuesTab,
      },
      {
        path: "add-member",
        component: AddEmployee,
      },
      {
        path: "createTask",
        component: CreateTask,
      },
      {
        path: "task/:taskid",
        component: TaskDetails,
      },
      {
        path: "issues/:issuesid",
        component: IssueDetails,
      },
      {
        path: "raise-issue",
        component: RaiseIssue,
      },
      {
        path: "ProjectRoadmap",
        component: ProjectRoadmap,
        props: true,
      },
    ],
  },
  // {
  //     path: "/Issue",
  //     name: "Issue",
  //     component: IssuePage,
  // },

  {
    path: "/Profile",
    name: "Profile",
    component: Profile,
    beforeEnter: requireAuth,
  },
  {
    path: "/Analytics",
    name: "Analytics",
    component: Analytics,
    beforeEnter: requireAuth,
  },
  {
    path: "/Analytics/:userId",
    name: "EmployeePerformance",
    component: EmployeePerformance,
    beforeEnter: requireAuth,
    props: true,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory } from 'vue-router'
import Issue from '@/views/IssuePage.vue'
const routes = [
 {
 path: '/issue',
 name: 'Issue',
 component: Issue
 }
]
const router = createRouter({
 history: createWebHistory(),
 routes
})
export default router
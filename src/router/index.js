import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/Register',
        name: 'Sign Up',
        component: Register
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
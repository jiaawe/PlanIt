<template>
    <body>
    <div class="main-container">
        <div class="left">
            <div class="logo-container">
                <img class="logo" alt="PlanIt" src="src\assets\plan-it.png">
            </div>
            <h1>Login to Your Account</h1>
            <div class="login-form">
                <input type="text" placeholder="Email" v-model = 'email'>
                <input type="password" placeholder="Password" v-model = 'password'>
            </div>
            <div class = 'error' v-show = 'this.error !== ""'>{{ this.error }}</div>
            <button class="login-btn" v-on:click = 'login'>Login</button>
            <a href="#" class="forget">forget password?</a>
        </div>
        <div class="right">
            <h1>New Here?</h1>
            <div class="text">Sign up now and manage your million dollar projects!</div>
            <button class="signup-btn" @click="$router.push('/Register')">Sign Up</button>
        </div>
    </div>
    
</body>
</template>

<script>
    import '../assets/main.css'
    import firebase from 'firebase/compat/app';
    import 'firebase/compat/auth';
    export default {
        name: 'Login',
        created() {
            document.title = 'Login'
        },
        components: {
        },
        data() {
            return {
                email: '',
                password: '',
                error: ''
            };
        },
        methods : {
            async login() {
                try {
                    await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
                    console.log("success");
                    this.error = '';
                } catch (e) {
                    console.log(e);
                    this.error = 'Invalid email or password';
                }
            }
        }
    }
</script>
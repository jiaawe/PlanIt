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

<style scoped>
/* custom font */
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;600;700;800;900&display=swap");

/* variables */
:root {
  --primary: #4f515a;
  --secondary: #ebebeb;
  --warning: #da0f41;
}

/* base styles  */
* {
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  /* color: var(--primary); */
}
body {
  background: #ffffff;
}
a {
  text-decoration: none;
}

/* buttons */
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

/* error text */
.error {
  color: var(--warning);
  font-size: 14px;
  margin: 16px 0;
}

/* success text */
.success {
  color: green;
  font-size: 14px;
  margin: 16px 0;
  /*display: flex;
  justify-content: center;
  align-items: center;*/
}

body {
  text-align: center;
}

.main-container {
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100vh;
}

.left {
  background-color:#ffffff;
  width: 55vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
}

.logo-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 8rem;
}

.logo {
  height: 3.5rem;
  margin: 1.5rem;
}

.right {
  background-color:#a2a9ed;
  width: 45vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.text {
  width: 80%;
  font-size: 1.5rem;
  line-height: 1.9rem;
  margin-bottom: 1.75rem;
}


.google-btn {
  width: 40%;
  height: 3rem;
  border: solid;
  background-color: #ffffff;
  border-color: #7b7b7c;
  border-radius: 8px;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,.25);
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-bottom: 1rem;
}

.google-icon {
  margin-right: 0.5rem;
}

.login-btn {
  width: 35%;
  align-self: center;
  margin-top: 1rem;
  background-color: #a2a9ed;
  height: 3rem;
  border-radius: 25px;
  margin-bottom: 0.5rem;
}

.signup-btn {
  width: 35%;
  background-color: #ffffff;
  height: 3rem;
  border-radius: 25px;
}

.forget {
  color: rgb(105, 104, 104);
}

.overdue {
  color: red
}


</style>
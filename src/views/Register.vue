<template>
    <body>
    <div class="main-container">
        <div class="left">
            <div class="logo-container">
                <img class="logo" alt="PlanIt" src="src\assets\plan-it.png">
            </div>
            <div class=form-container>
                <h1>Create Your Account</h1>
                <div class="login-form">
                    <input type="text" placeholder="Email" v-model = 'email' required>
                    <input type="text" placeholder="Name" v-model = 'name'>
                    <input type="password" placeholder="Password" v-model = 'password'>
                    <input type="password" placeholder="Confirm Password" v-model = 'confirmPassword'>
                    <input type="text" placeholder="Contact Number" v-model = 'contactNumber'>
                    <input type="text" placeholder="Company" v-model = 'company'>
                    <input type="text" placeholder="Department" v-model = 'department'>
                    <select name="role" id="role" placeholder="Role" v-model = 'role'>
                        <option value="" disabled selected>Select your role</option>
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                      </select>
                    <input type="text" placeholder="Manager Credential" v-show = 'this.role === "manager"' v-model = 'credential'>
                    <button class="attach-pic-btn">Attach Profile Picture</button>
                </div>
                <div class = 'error' v-show = 'this.error !== ""'>{{ this.error }}</div>
                <div class = 'success' v-show = 'this.success !== ""'>{{ this.success }}</div>
                <button class="signup-btn" v-on:click = 'register'>Sign Up</button>
            </div>
        </div>
        <div class="right">
            <h1 class="subtitle">Already have an account?</h1>
            <div class="text">Login and start your project now!</div>
            <button class="login-btn" @click="$router.push('/')">Log in</button>
        </div>
    </div>  
</body>
</template>

<script>
    import '../assets/main.css'
    import db from '../firebase/firebase.js'
    import firebase from 'firebase/compat/app';
    import 'firebase/compat/auth';

    export default {
        name: 'Sign Up',
        created() {
            document.title = 'Sign Up'
        },
        components: {
        },
        data() {
            return {
                email: '',
                name: '',
                password: '',
                confirmPassword: '',
                contactNumber: '',
                company: '',
                department: '',
                credential: '',
                role: "",
                error: '',
                success: '',
            };
        },
        methods: {
        validInteger(number) {
            try {
                if ( isNaN(number) || parseInt(number) < 0) {
                    return false;
                }
                return true;
            } catch {
                return false;
            }
        },
        async register() {
            if (this.email.trim() == '' || !this.email.includes('@planit.com')) {
                this.error = 'Please enter a valid email in the form xxx@planit.com';
                this.success = '';
            } else if (this.name.trim() == '') {
                this.error = 'Please enter name';
                this.success = '';
            } else if (this.password.length < 6) {
                this.error = 'Please enter a valid password of at least length 6';
                this.success = '';
            } else if (this.confirmPassword !== this.password) {
                this.error = 'Passwords do not match';
                this.success = '';
            } else if (!this.validInteger(this.contactNumber) || this.contactNumber.length < 8) {
                this.error = 'Enter a valid contact number';
                this.success = '';
            } else if (this.company.trim() == '') {
                this.error = 'Enter a valid company';
                this.success = '';
            } else if (this.department.trim() == '') {
                this.error = 'Enter a valid department';
                this.success = '';
            } else if (this.role !== 'manager' && this.role !== 'employee') {
                this.error = 'Please select a role';
                this.success = '';
            } else if (this.role === 'manager' && this.credential !== 'planit') {
                this.error = 'Invalid manager credential';
                this.success = '';
            } else {
                this.error = '';
                try {
                    const firebaseAuth = await firebase.auth();
                    console.log(this.name)
                    console.log(this.department)
                    console.log(this.company)
                    const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
                    const result = await createUser;
                    await db.collection('Users').doc(result.user.uid).set({
                        name: this.name,
                        email: this.email,
                        contactNumber: this.contactNumber,
                        company: this.company,
                        department: this.department,
                        role: this.role
                    });
                    this.error = '';
                    this.success = 'Account successfully created!';
                    console.log("success!")
                    return;
                } catch (e) {
                    this.success = '';
                    this.error = 'Inavlid email or password';
                    console.log("unssuccessful!")
                    return;
                }
            }
        },
    }
}
</script>

<style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;600;700;800;900&display=swap");

/* base styles  */
* {
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  /* color: var(--primary); */
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
  width: 20rem;
  height: 1.25rem;
  border: 0;
  border-radius: 8px;
  padding: 10px;
  outline: none;
  display: block;
  /* box-sizing: border-box; */
  margin: 15px auto;
}

select {
  background-color: #e6e7f0;
  width: 21rem;
  height: 2.5rem;
  border: 0;
  border-radius: 8px;
  color:#706e6e;
  opacity:1
}

/* error text */
.error {
  color: var(--warning);
  font-size: 14px;
  margin: 16px 0;
}

body {
  text-align: center;
}


.main-container {
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 11fr 9fr;
  width:100%;
  height:100vh;
}

.left {
  background-color:#ffffff;
  width: 55vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  height: 100%;
}

.logo-container {
  display: flex;
  justify-content: flex-start;
}

.logo {
  height: 3.5rem;
  margin: 1rem;
}

.form-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.right {
  background-color:#a2a9ed;
  height: 100%;
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

.subtitle {
  margin-bottom: 0.5rem;
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

.attach-pic-btn {
  font-weight:600;
  background-color: #e6e7f0;
  width: 21rem;
  color:#706e6e;
  opacity:1;
  display: block;
  margin-top: 1rem;
}
.signup-btn {
  width: 35%;
  align-self: center;
  margin-top: 1rem;
  background-color: #a2a9ed;
  height: 3rem;
  border-radius: 25px;
  margin-bottom: 4rem;
}

.login-btn {
  width: 35%;
  background-color: #ffffff;
  height: 3rem;
  border-radius: 25px;
}

.overdue {
  color: red
}

</style>
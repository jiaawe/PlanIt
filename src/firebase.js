import {initializeApp} from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCV_PdHcBP1nO21-T0H7kOOnqjuxVsYZKg",
    authDomain: "planit-5dfc0.firebaseapp.com",
    projectId: "planit-5dfc0",
    storageBucket: "planit-5dfc0.appspot.com",
    messagingSenderId: "142391402962",
    appId: "1:142391402962:web:b9780a89fd3c7b7405a80b",
    measurementId: "G-C6BEB8CJZ0"
  };
    
    // Initialize Firebase
    const firebaseApp = initializeApp(firebaseConfig);

    export default firebaseApp;
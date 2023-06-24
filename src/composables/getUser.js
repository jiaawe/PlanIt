import { ref } from 'vue'
// auth for page access
import { auth, db } from "../firebase/firebase.js";

// refs
const user = ref(auth.currentUser)

// auth changes
auth.onAuthStateChanged(async (_user) => {
  console.log('User state change. Current user is:', _user)
  // if(_user) {
  //   const user_data = await db.collection('Users').doc(_user.uid).get()
  //   _user = {..._user, ...user_data.data(), uid: _user.uid}
  // }
  user.value = _user
});

const getUser = () => {
  return { user } 
}

export default getUser
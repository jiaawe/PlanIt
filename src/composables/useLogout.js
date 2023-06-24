import { ref } from 'vue'
import { auth } from '../firebase/firebase'

// refs
const error = ref(null)
const isPending = ref(false)

// logout function
const logout = async () => {
  error.value = null
  isPending.value = true

  try {
    await auth.signOut()
    isPending.value = false
  }
  catch(err) {
    console.log(err.message)
    error.value = err.message
    isPending.value = false
  }
}

const useLogOut = () => {
  return { error, logout, isPending }
}

export default useLogOut
import { user } from './store/user'
import { goto } from '$app/navigation'
import { auth } from './firebase'
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  signOut
} from 'firebase/auth'

export const checkAuth = () => {
  onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
          user.set(currentUser)
          goto('/app')
      } else {
          user.set(null)
      }
  })
}

export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const loginUser = async (email: string, password: string) => {
  try {
    await setPersistence(auth, browserLocalPersistence)
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    return result.user
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const logoutUser = async () => {
  try {
    await signOut(auth)
    user.set(null)
    goto('/auth/login')
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    console.error(error)
    throw error
  }
}

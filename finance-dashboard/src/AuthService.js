import { auth } from "./firebaseConfig"; // Import the auth instance from your firebaseConfig file
import { signInWithEmailAndPassword, createUserWithEmailAndPassword,signOut } from "firebase/auth";
// signup Function
export const signUp = async(email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    }
    catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
}
// login Function

export const login = async(email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    }
    catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}
// logout Function
export const logout = async() => {
    try {
        await signOut(auth);
        console.log("User logged out");
    }
    catch (error) {
        console.error(error.message, error);
        throw error;
    }
}
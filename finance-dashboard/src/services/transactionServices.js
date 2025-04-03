import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const transactionRef = collection(db, "transactions");
// Function to add a transaction

export const addTransaction = async (transaction) => {
    try {
        const docRef = await addDoc(transactionRef, transaction);
        console.log("Transaction added with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding transaction: ", error);
        throw error;
    }
}
// Function to get all transactions
export const getTransactions = async () => {
    try {
        const querySnapshot = await getDocs(transactionRef);
        const transactions = [];

        querySnapshot.forEach((doc) => {
            transactions.push({ id: doc.id, ...doc.data() });
        }); 
        return transactions;
    }catch (error) {
        console.error("Error getting transactions: ", error);
        throw error;
    }
}
        
  
// Function to delete a transaction
export const deleteTransaction = async (id) => {
    try {
        const docRef = doc(db, "transactions", id);
        await deleteDoc(docRef);
        console.log("Transaction deleted with ID: ", id);
    } catch (error) {
        console.error("Error deleting transaction: ", error);
        throw error;
    }
}
// Function to update a transaction
export const updateTransaction = async (id, updatedTransaction) => {
    try {
        const docRef = doc(db, "transactions", id);
        await updateDoc(docRef, updatedTransaction);
        console.log("Transaction updated with ID: ", id);
    } catch (error) {
        console.error("Error updating transaction: ", error);
        throw error;
    }
}
// Function to get a transaction by ID
export const getTransactionById = async (id) => {
    try {
        const docRef = doc(db, "transactions", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting transaction by ID: ", error);
        throw error;
    }
}

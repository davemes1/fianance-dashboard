import React from "react";
import { addTransaction } from "../../services/transactionServices";

import { useState } from "react";

const TransactionForm = ({ onTransactionAdded }) => {
    const[type,setType] = useState("income");
    const[amount,setAmount] = useState("");
    const[category,setCategory] = useState("");
    const[message,setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const transaction = {
                type,
                amount: parseFloat(amount),
                category,

            };
            // Call the addTransaction function to save the transaction
            // to the database
            // and refresh the list of transactions in the parent component
            // This function is passed as a prop to the TransactionForm component
            // It is called when a transaction is added successfully
            // to refresh the list of transactions in the parent component
            // The component also displays a message indicating whether the transaction was added successfully or if there was an error
            // The component uses the useState hook to manage the form state and the message state
            // The handleSubmit function is called when the form is submitted
            // and it prevents the default form submission behavior, creates a transaction object,
            // and calls the addTransaction function
            // If the transaction is added successfully, it updates the message state to indicate success;
            // otherwise, it updates the message state to indicate an error
            // The component also accepts an onTransactionAdded prop, which is a function that is called when a transaction is added successfully
            // This allows the parent component to refresh the list of transactions after a new transaction is added
            // The component returns a form with input fields for the type, amount, and category of the transaction,
            await addTransaction(transaction);

            setMessage("Transaction added successfully!");
            onTransactionAdded(); // Call the parent function to refresh transactions

        } catch (error) {
            setMessage("Error adding transaction: " + error.message);
        }
        // Reset form fields after submission
        setType("income");
        setAmount("");
        setCategory("");
        setTimeout(() => {
            setMessage("");
        }, 3000); // Clear message after 3 seconds

    }

    return (
        <div>
            <h2>Add Transaction</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Type:
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </label>
                <br />
                <label>
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Category:
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Add Transaction</button>
            </form>
        </div>
        
    );
}

export default TransactionForm;
// This component allows users to add a new transaction by filling out a form with the type (income or expense), amount, and category. When the form is submitted, it calls the addTransaction function to save the transaction to the database and refreshes the list of transactions in the parent component. The component also displays a message indicating whether the transaction was added successfully or if there was an error.
// The component uses the useState hook to manage the form state and the message state. The handleSubmit function is called when the form is submitted, and it prevents the default form submission behavior, creates a transaction object, and calls the addTransaction function. If the transaction is added successfully, it updates the message state to indicate success; otherwise, it updates the message state to indicate an error.
// The component also accepts an onTransactionAdded prop, which is a function that is called when a transaction is added successfully. This allows the parent component to refresh the list of transactions after a new transaction is added.
// The component returns a form with input fields for the type, amount, and category of the transaction, as well as a submit button. It also displays any messages related to the transaction addition process.
// The component is styled using CSS classes defined in the parent component or in a separate CSS file. The component can be used in the Dashboard component to allow users to add new transactions to their financial records.
// The component can be imported and used in the Dashboard component as follows:
// import TransactionForm from "./TransactionForm";
//
// function Dashboard() { 
//     const handleTransactionAdded = () => {
//         // Refresh transactions here
//     };
//     return (
//         <div>
//             <h1>Dashboard</h1>
//             <TransactionForm onTransactionAdded={handleTransactionAdded} />
//         </div>
//     );
// }
// export default TransactionForm;

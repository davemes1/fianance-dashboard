import React, { useState } from "react";
import style from './Dash.module.css'
import { useNavigate } from "react-router-dom";
import { logout } from "../../AuthService";
import TransactionForm from "../../Components/TransactionForm/TransactionForm";
import TransactionList from "../../Components/TransactionList/TransactionList";
import FinancialChart from "../../Components/FinancialChart/FinancialChart";


function Dashboard() {
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    // Function to handle transaction addition and refresh the list
    // This function is passed as a prop to the TransactionForm component

    const handleTransactionAdded = () => {
        setRefresh(!refresh);
    }

    // Function to handle logout
    // This function is called when the user clicks the logout button
    // It calls the logout function from the AuthService and navigates to the login page

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };


    // Function to handle logout
    // This function is called when the user clicks the logout button
    return (
        <div className={style.container}>
            <h1>Dashboard</h1>
            <p>Welcome to the finance dashboard!</p>

            <button onClick={handleLogout} className={style.logoutButton}>

                Logout
            </button>
            <TransactionForm onTransactionAdded={handleTransactionAdded} />
            <FinancialChart key={refresh} />
            <h2>Transaction List</h2>
            {/* Pass the refresh state to the TransactionList component to refresh the list when a new transaction is added */}
            <button className={style.transactionListButton}>
                <TransactionList key={refresh} />
            </button>
            <p>Click on a transaction to view details.</p>
        </div>
    );
}
export default Dashboard;
import React, { useEffect, useState } from "react";
import { getTransactions } from "../../services/transactionServices";

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [profit, setProfit] = useState(0);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions();
                setTransactions(data);
                const income = data.filter((transaction) => transaction.type === "income").reduce((acc, transaction) => acc + transaction.amount, 0);
                const expense = data.filter((transaction) => transaction.type === "expense").reduce((acc, transaction) => acc + transaction.amount, 0);
                setTotalIncome(income);
                setTotalExpense(expense);
                setProfit(income - expense);
                setBalance(income - expense);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }

        };

        fetchTransactions();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteTransaction(id);
            setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Transaction History</h2>
            <div>
                <h3>Total Income: ${totalIncome}</h3>
                <h3>Total Expense: ${totalExpense}</h3>
                <h3>Profit: ${profit}</h3>
                <h3>Balance: ${balance}</h3>
            </div>
            {transactions.length === 0 && <p>No transactions found.</p>}
            <div>
                <h3>Filter Transactions</h3>
                <label htmlFor="filter">Filter by Type:</label>
                <select id="filter" onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
            <div>
                <h3>Sort Transactions</h3>
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" onChange={(e) => setSort(e.target.value)}>  
                    <option value="all">All</option>
                    <option value="income">Income</option>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>



            <table>
                <thead>

                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.type}</td>
                            <td>${transaction.amount}</td>
                            <td>{transaction.category}</td>
                            <td>
                                <button onClick={() => handleDelete(transaction.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {transactions.length === 0 && <p>No transactions found.</p>}


           

        </div>
        </div>
        
    );
};


export default TransactionList;
import React from "react";
import { getTransactions } from "../../services/transactionServices";
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend, ResponsiveContainer} from "recharts";
import { useEffect, useState } from "react";
import { use } from "react";

const FinancialChart = () => {
    const [chartData,setChartData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [transactions,setTransactions] = useState([]);
    const [profitLoss,setProfitLoss] = useState(0);
    const [totalIncome,setTotalIncome] = useState(0);
    const [totalExpense,setTotalExpense] = useState(0);
    const [balance,setBalance] = useState(0);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions();
                const incomeData = data.filter((transaction) => transaction.type === "income");
                const expenseData = data.filter((transaction) => transaction.type === "expense");
               
                setChartData([{ name: "Income",value : incomeData, fill: "#34D399" }, 
                    { name: "Expense", value: expenseData, fill: "#FF5733" },
                    { name: "Balance", value: incomeData.reduce((acc, transaction) => acc + transaction.amount, 0) - expenseData.reduce((acc, transaction) => acc + transaction.amount, 0), fill: "#3B82F6" },
               { name: profitLoss >=0 ? "Profit" : "Loss", value: Math.abs(profitLoss), fill: profitLoss >= 0 ? "#34D399" : "#FF5733" },

            ]);
                setProfitLoss(incomeData.reduce((acc, transaction) => acc + transaction.amount, 0) - expenseData.reduce((acc, transaction) => acc + transaction.amount, 0));
                setTotalIncome(incomeData.reduce((acc, transaction) => acc + transaction.amount, 0));
                setTotalExpense(expenseData.reduce((acc, transaction) => acc + transaction.amount, 0));
                setBalance(incomeData.reduce((acc, transaction) => acc + transaction.amount, 0) - expenseData.reduce((acc, transaction) => acc + transaction.amount, 0));
                setTransactions(data);

            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }
    , []);
    if (loading) return <p>Loading...</p>;
    if (chartData.length === 0) return <p>No transactions found.</p>;
    return (
        <div>
            <h2>Financial Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart width={600} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
            </ResponsiveContainer>
            <div>
                <h3>Total Income: ${totalIncome}</h3>
                <h3>Total Expense: ${totalExpense}</h3>
                <h3>Profit/Loss: ${profitLoss}</h3>
                <h3>Balance: ${balance}</h3>
            </div>
        </div>
    );
}

export default FinancialChart;
// Compare this snippet from finance-dashboard/src/services/transactionServices.js:


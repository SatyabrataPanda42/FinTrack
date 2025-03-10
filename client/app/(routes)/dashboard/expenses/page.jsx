"use client";
import React, { useState, useEffect,useCallback } from "react";
import ExpenseListTable from './_components/ExpenseListTable'
const API_URL ="https://fintrack-u5iw.onrender.com";

function page() {
       const [totalExpense, setTotalExpense] = useState(0);
    const [expensesList, setExpensesList] = useState([]);

    

 const fetchTotalExpense = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found. Please log in.");
            }
    
            const response = await fetch(`${API_URL}/expenses`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (!response.ok) throw new Error("Failed to fetch expenses");
    
            const data = await response.json();
            console.log("Expense API Response:", data);
    
            // ✅ Store expensesList for BarChart mapping
            setExpensesList(data);
    
            // ✅ Return total spent
            const totalSpent = data.reduce((sum, expense) => sum + (expense.amount || 0), 0);
            return totalSpent;
        } catch (error) {
            console.error("Error fetching total expense:", error);
            return 0; // Return 0 if there's an error
        }
    }, []);
    
     
    useEffect(() => {
      const loadExpenses = async () => {
          const expenseTotal = await fetchTotalExpense();
          setTotalExpense(expenseTotal);
      };
      loadExpenses();
  }, [fetchTotalExpense]);

      const getAllExpenses = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found. Please log in.");
            }
    
            const response = await fetch(`${API_URL}/expenses`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (!response.ok) throw new Error("Failed to fetch expenses");
    
            const data = await response.json();
            console.log("🔄 Fetched Expenses:", data);
    
            setExpensesList(data); // ✅ Update state with fetched expenses
        } catch (error) {
            console.error("❌ Error fetching expenses:", error);
            setExpensesList([]); // ✅ Reset state on error
        }
    }, []); // ✅ Dependencies array prevents unnecessary re-renders
    
  return (
    <div>
        <ExpenseListTable 
                 expensesList={expensesList}
                   refreshData={()=>{fetchTotalIncome()}} // ✅ Pass memoized function
                  />
    </div>
  )
}

export default page

"use client";
import React, { useState, useEffect,useCallback } from "react";
import CardInfo from "../dashboard/_component/CardInfo"
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://fintrack-u5iw.onrender.com/api";
import BarchartDashboard from "../dashboard/_component/BarchartDashboard"
import IncomeItem from "./income/_component/IncomeItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
function Dashboard() {
    const [user, setUser] = useState(null);
    const [totalExpense, setTotalExpense] = useState(0);
    const [expensesList, setExpensesList] = useState([]);



    // Function to load user from localStorage
    const loadUser = () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        loadUser(); // Load user initially

        // ✅ Listen for changes in localStorage (when login/logout happens)
        const handleStorageChange = () => {
            loadUser();
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);


      const [incomeList, setIncomeList] = useState([]);
      
      const fetchTotalIncome = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found. Please log in.");
            }
    
            const response = await fetch(`${API_URL}/income`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (!response.ok) throw new Error("Failed to fetch incomes");
    
            const data = await response.json();
            console.log("💰 Income API Response:", data);
    
            const incomeArray = data.docs || data || [];
            if (!Array.isArray(incomeArray)) {
                throw new Error("Invalid response format: Expected an array.");
            }
    
            setIncomeList(incomeArray);
        } catch (error) {
            console.error("❌ Error fetching total income:", error);
            setIncomeList([]);
            getAllExpenses(); // ✅ Reset on error
        }
    }, []); // ✅ No dependencies to avoid unnecessary updates
    
    
      useEffect(() => {
        fetchTotalIncome();
      }, [fetchTotalIncome]);

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
        <div className="p-8">
            {user ? (
                <h2 className="font-bold text-3xl">
                    Welcome, <span className="text-primary">{user.name}</span>! 🎉
                </h2>
            ) : (
                <p className="text-gray-500">Loading user data...</p>
            )}
            <p className="text-gray-500">Here's what happenning with your money! Lets Manage your expenses</p>
           <CardInfo incomeList={incomeList} totalExpense={totalExpense}/>

            <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
              <div className="md:col-span-2">
              <BarchartDashboard incomeList={incomeList} expensesList={expensesList} />
              <ExpenseListTable 
                 expensesList={expensesList}
                   refreshData={()=>{fetchTotalIncome()}} // ✅ Pass memoized function
                  />



              </div>
              <div className="grid gap-5">
                {incomeList.map((income,index)=>(
                  <IncomeItem income={income} key={index}/>
                ))}
              </div>
            </div>
        </div>
    );
}

export default Dashboard;

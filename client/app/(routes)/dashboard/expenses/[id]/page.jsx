"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import IncomeItem from "../../income/_component/IncomeItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import EditIncome from "../_components/EditIncome";
import { Button } from "../../../../../components/ui/button";
import { PenBox, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../../components/ui/alert-dialog";
<<<<<<< HEAD
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://fintrack-u5iw.onrender.com/api";
=======
const API_URL = "https://fintrack-u5iw.onrender.com";
>>>>>>> 4461e62fe6e774bb62e5b16a8e00909b3fda9b7f

function IncomeDetails() {
  const params = useParams();
  const incomeId = params.id;

  const [income, setIncome] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [expensesList, setExpensesList] = useState([]);

  const fetchIncome = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      const response = await fetch(`${API_URL}/income/${incomeId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch income data. Status: ${response.status}`
        );
      }

      const data = await response.json();
      setIncome(data);

      await getExpenseList();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteIncome = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage

    if (!token) {
      console.error("No authentication token found. Please log in.");
      return;
    }

    try {
      console.log("Deleting all expenses for incomeId:", incomeId);

      // 1️⃣ Delete all expenses linked to this incomeId
      const deleteExpensesResponse = await fetch(
        `${API_URL}/expenses?incomeId=${incomeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const expensesData = await deleteExpensesResponse.json();
      console.log("Delete Expenses Response:", expensesData);

      if (!deleteExpensesResponse.ok) {
        console.error("Failed to delete expenses before deleting Income.");
        alert("Error deleting expenses. Income was not deleted.");
        return;
      }

      // 2️⃣ Now delete the Income (income)
      console.log("Deleting Income for incomeId:", incomeId);
      const response = await fetch(`${API_URL}/income/${incomeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        console.log("Income and expenses deleted successfully");

        // Redirect to another page after deletion
        window.location.href = "/dashboard/income";
      } else {
        const errorData = await response.json();
        console.error("Failed to delete Income:", errorData);
        alert("Failed to delete Income.");
      }
    } catch (error) {
      console.error("Error deleting Income:", error);
      alert("An error occurred while deleting the Income.");
    }
  };

  const getExpenseList = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      const response = await fetch(`${API_URL}/expenses?incomeId=${incomeId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch expenses. Status: ${response.status}`);
      }

      const expenseData = await response.json();
      setExpenses(expenseData);
      setExpensesList(expenseData);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!incomeId) return;
    fetchIncome();
  }, [incomeId, refreshKey]);

  // Function to force UI update
  const forceRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    getExpenseList(); // ✅ Fetch expenses again
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold flex justify-between items-center">
        My Expenses
        <div className="flex gap-2 items-center">
          <EditIncome income={income} refreshData={forceRefresh}/>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2" variant="destructive">
                {" "}
                <Trash /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current Income along with expenses and remove your data
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteIncome()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {error && <p className="text-red-500">Error: {error}</p>}
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="w-full h-[150px] bg-gray-300 rounded"></div>
          </div>
        ) : income ? (
          <IncomeItem key={refreshKey} income={income} expenses={expenses} />
        ) : (
          <p>No income data found.</p>
        )}

        {/* ✅ Pass forceRefresh to AddExpense */}
        <AddExpense incomeId={incomeId} refreshData={forceRefresh} />
      </div>
      <div className="mt-4">

        <ExpenseListTable
          expensesList={expensesList}
          setExpensesList={setExpensesList}
          refreshData={forceRefresh}
        />
      </div>
    </div>
  );
}

export default IncomeDetails;

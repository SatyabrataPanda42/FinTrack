"use client";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function ExpenseListTable({ expensesList, setExpensesList, refreshData }) {
  // Function to delete an expense
  const deleteExpense = async (expenseId) => {
    const token = localStorage.getItem("token"); 

    if (!token) {
        console.error("No authentication token found. Please log in.");
        return;
    }

    try {
        console.log("Sending DELETE request for:", expenseId);

        const response = await fetch(`http://localhost:5000/api/expenses/${expenseId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        console.log("Response status:", response.status);

        if (response.ok) {
            console.log("✅ Expense deleted successfully");

            // ✅ Ensure `refreshData` is properly called
            if (typeof refreshData === "function") {
                console.log("🔄 Calling refreshData() to update UI...");
                refreshData(); // ✅ Triggers state update
            } else {
                console.warn("⚠ refreshData function is not defined");
            }

            toast("Expense has been Deleted", {
                action: {
                    label: "Exit",
                    onClick: () => console.log("Exit"),
                },
            });
        } else {
            const errorData = await response.json();
            console.error("❌ Failed to delete expense:", errorData);
        }
    } catch (error) {
        console.error("❌ Error deleting expense:", error);
    }
};



  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg">Latest Expenses</h2>
      <div className="grid grid-cols-4 bg-slate-200 p-2 mt-3">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expensesList.map((expense, index) => (
        <div key={expense._id} className="grid grid-cols-4 bg-slate-200 p-2">
          <h2>{expense.title}</h2>
          <h2>{expense.amount}</h2>
          <h2>{expense.createdAt}</h2>
          <h2>
            <Trash
              className="text-red-600 cursor-pointer"
              onClick={() => deleteExpense(expense._id)}
            />
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;

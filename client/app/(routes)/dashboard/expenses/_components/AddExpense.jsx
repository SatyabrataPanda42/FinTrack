"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { toast } from "sonner";

function AddExpense({ refreshData, incomeId }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedToken) setToken(storedToken);
    }
  }, []);

  const onCreateExpense = async () => {
    try {
      if (!user || !user._id) {
        alert("User ID not found. Please log in.");
        return;
      }
      if (!incomeId) {
        alert("Income ID is required to create an expense.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, amount, user: user._id, incomeId }),
      });

      if (!response.ok) throw new Error("Failed to create expense");

      const data = await response.json();
      console.log("Expense Created:", data);

      setTitle("");
      setAmount("");

      // ✅ Force re-fetch after adding an expense
      refreshData();

      toast("Expense has been created", {
        action: { label: "Exit", onClick: () => console.log("Exit") },
      });
    } catch (error) {
      console.error("Error in onCreateExpense:", error);
      alert(error.message);
    }
  };

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Grocery"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. 1000"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={!(title && amount)}
        onClick={onCreateExpense} // ✅ Call function directly
        className="mt-5 w-full"
      >
        Add New Expense
      </Button>
    </div>
  );
}

export default AddExpense;

"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://fintrack-u5iw.onrender.com/api";

function IncomeItem({ income }) {
  const [totalExpense, setTotalExpense] = useState(0);

  const fetchTotalExpense = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      // ✅ Fetch only expenses that belong to this specific incomeId
      const response = await fetch(`${API_URL}/expenses?incomeId=${income._id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch expenses");

      const data = await response.json();
      const total = data.reduce((sum, expense) => sum + expense.amount, 0); // ✅ Calculate total expenses

      setTotalExpense(total); // ✅ Update state with correct expenses
    } catch (error) {
      console.error("Error fetching total expense:", error);
      setTotalExpense(0);
    }
  };

  useEffect(() => {
    fetchTotalExpense();
  }, [income._id]);

  return (
    <Link
      href={`/dashboard/expenses/${income._id}`}
      
    >
      <div className="p-5 border-2 rounded-lg flex flex-col items-center justify-between h-[150px] cursor-pointer hover:shadow-lg">
      <div className="flex justify-between w-full"> {/* ✅ Ensure spacing between sections */}
        {/* Left Section */}
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl p-3 px-2 bg-slate-100 rounded-full">💰</h2>
          <div>
            <h2 className="font-bold">{income.title || "No title"}</h2>
            <h2 className="text-sm text-gray-500">{income.description || "No description"}</h2>
          </div>
        </div>
  
        {/* Right Section: Amount */}
        <div className="text-right">
          <h2 className="font-bold text-primary text-lg">₹{income.amount || 0}</h2>
        </div>
      </div>
  
      {/* Progress bar */}
      <div className="mt-4 w-full">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm text-slate-400">₹{totalExpense} Spent</h2> {/* ✅ Show correct total expense */}
          <h2 className="text-sm text-slate-400">₹{income.amount - totalExpense} Remaining</h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${(totalExpense / income.amount) * 100 || 0}%` }} // ✅ Dynamically update progress
          />
        </div>
      </div>
      </div>
    </Link>
  );
  
}

export default IncomeItem;

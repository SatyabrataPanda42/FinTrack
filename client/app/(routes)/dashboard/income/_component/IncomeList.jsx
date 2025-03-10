"use client"
import React, { useEffect, useState, useCallback } from "react";
import CreateIncome from "./CreateIncome";
import IncomeItem from "./IncomeItem";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://fintrack-u5iw.onrender.com/api";

function IncomeList() {
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
      console.log("API Response:", data);

      const incomeArray = data.docs || data || [];
      if (!Array.isArray(incomeArray)) {
        throw new Error("Invalid response format: Expected an array.");
      }

      setIncomeList(incomeArray);
    } catch (error) {
      console.error("Error fetching total income:", error);
      setIncomeList([]); // Ensure it's always an array
    }
  }, []);

  useEffect(() => {
    fetchTotalIncome();
  }, [fetchTotalIncome]);

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* ✅ Pass refreshData correctly */}
        <CreateIncome refreshData={fetchTotalIncome} />
        {incomeList?.length>0? incomeList.map((income, index) => (
          <IncomeItem key={income._id || index} income={income} />
        ))
      :[1,2,3,4,5].map((item,index)=>(
        <div key={index} className="w-full bg-slate-200 rounded-lg
        h-[150] animate-pulse">


          </div>
      ))
      }
      </div>
    </div>
  );
}

export default IncomeList;

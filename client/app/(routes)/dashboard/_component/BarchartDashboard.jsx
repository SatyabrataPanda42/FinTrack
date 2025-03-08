"use client";
import React from "react";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function BarchartDashboard({ incomeList = [], expensesList = [] }) {
  // Map income and associate with expenses
  const data = incomeList.map((income) => {
    // Find total expenses related to this income
    const relatedExpenses = expensesList.filter(
      (expense) => expense.incomeId === income._id
    );
    const totalExpense = relatedExpenses.reduce(
      (sum, expense) => sum + (expense.amount || 0),
      0
    );

    return {
      name: income.title || "Income",
      incomeAmount: income.amount || 0,
      totalSpend: totalExpense, // Overlayed on income
    };
  });

  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg">Activity</h2>
      <ResponsiveContainer width={'100%'} height={300}>
      <BarChart  data={data}
      margin={{
        top:7
      }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Income Bar */}
        <Bar dataKey="incomeAmount" fill="#84ac6c" name="amount" />
        {/* Expenses Overlay */}
        <Bar dataKey="totalSpend" fill="#649444" name="totalSpend" barSize={15} />
      </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarchartDashboard;

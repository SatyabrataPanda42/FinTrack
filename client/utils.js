const API_URL = "https://fintrack-u5iw.onrender.com";


export const signupUser = async (userData) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};


export const loginUser = async (userData) => {
  try {
      const res = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok) {
          // Store user & token in localStorage
          localStorage.setItem("user", JSON.stringify(data.user));  // ✅ Store user object
          localStorage.setItem("token", data.token);  // ✅ Store token

          return data;
      } else {
          throw new Error(data.message || "Login failed");
      }
  } catch (error) {
      console.error("Login error:", error);
      throw error;
  }
};

//Create User Income

export const storeUserIncome = (name, amount) => {
  if (!name || !amount) {
    console.error("Invalid income data:", { name, amount });
    return;
  }
  const incomeData = { name, amount };
  localStorage.setItem("income", JSON.stringify(incomeData));
  console.log("Stored Income in localStorage:", incomeData);
};


// Retrieve user income from localStorage
export const getUserIncome = () => {
  const storedIncome = localStorage.getItem("income");
  if (!storedIncome) {
    console.warn("No income data found in localStorage.");
    return { name: "Default Income", amount: 0 }; // Use a default value if missing
  }
  try {
    return JSON.parse(storedIncome);
  } catch (error) {
    console.error("Error parsing income from localStorage:", error);
    return { name: "Error Loading", amount: 0 };
  }
};


// Create User Income
export const createUserIncome = async (name, amount) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }

    const incomeData = { name, amount };
    const response = await fetch(`${API_URL}/income`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(incomeData),
    });

    if (!response.ok) throw new Error("Failed to create income");

    const data = await response.json();
    storeUserIncome(name, amount); // Store income in localStorage
    console.log("Income Created:", data);
    return data;
  } catch (error) {
    console.error("Error creating income:", error);
    throw error;
  }
};

//Fetch All Income
const fetchTotalIncome = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ Retrieve the token correctly
  
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }
  
      const response = await fetch("https://fintrack-u5iw.onrender.com/api/income", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // ✅ Use the stored token
        },
      });
  
      if (!response.ok) throw new Error("Failed to fetch incomes");
      
      const data = await response.json(); // ✅ Fetch all income records
      const totalIncome = data.reduce((sum, income) => sum + income.amount, 0); // ✅ Calculate the sum
  
      console.log("Total Income:", totalIncome);
      return totalIncome; // ✅ Return the total income
    } catch (error) {
      console.error("Error fetching total income:", error);
      return 0; // ✅ Return 0 in case of an error
    }
  };
  
// Create an Expense
export const createUserExpense = async (expenseData) => {
    try {
      const token = localStorage.getItem("token"); // ✅ Retrieve the token
  
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }
  
      const response = await fetch(`${API_URL}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // ✅ Use the stored token
        },
        body: JSON.stringify(expenseData), // ✅ Send expense data
      });
  
      if (!response.ok) throw new Error("Failed to create expense");
  
      const data = await response.json();
      console.log("Expense Created:", data);
      return data;
    } catch (error) {
      console.error("Error creating expense:", error);
      throw error;
    }
  };
  
  // Fetch All Expenses and Calculate Total
  export const fetchTotalExpense = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ Retrieve the token
  
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }
  
      const response = await fetch(`${API_URL}/expenses`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // ✅ Use the stored token
        },
      });
  
      if (!response.ok) throw new Error("Failed to fetch expenses");
  
      const data = await response.json(); // ✅ Fetch all expense records
      const totalExpense = data.reduce((sum, expense) => sum + expense.amount, 0); // ✅ Calculate the total expense
  
      console.log("Total Expense:", totalExpense);
      return totalExpense; // ✅ Return the total expense
    } catch (error) {
      console.error("Error fetching total expense:", error);
      return 0; // ✅ Return 0 in case of an error
    }
  };
  
  // Fetch Number of Expense Items
  export const fetchExpenseCount = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ Retrieve the token
  
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }
  
      const response = await fetch(`${API_URL}/expenses`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // ✅ Use the stored token
        },
      });
  
      if (!response.ok) throw new Error("Failed to fetch expenses");
  
      const data = await response.json(); // ✅ Fetch all expense records
      const expenseCount = data.length; // ✅ Count the number of expense items
  
      console.log("Number of Expenses:", expenseCount);
      return expenseCount; // ✅ Return the total number of expenses
    } catch (error) {
      console.error("Error fetching expense count:", error);
      return 0; // ✅ Return 0 in case of an error
    }
  };

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("../src/routes/users/usersroute"); // Ensure correct path
const expenseRoute = require("./routes/expenses/expenseRoute");
const incomeRoute = require("./routes/income/incomeRoute");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

// Routes
app.use("/api/users", userRoutes); // Use your user routes
app.use("/api/expenses",expenseRoute);
app.use("/api/income",incomeRoute);

// Start Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

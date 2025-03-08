const expressAsyncHandler = require("express-async-handler");
const Expense = require("../../model/Expense");

// Helper function to format date as (DD:MM:YYYY)
const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}:${month}:${year}`;
};

// Create Expense
const createExpense = expressAsyncHandler(async (req, res) => {
    const { title, amount, user, incomeId } = req.body;
    try {
        const expense = await Expense.create({ title, amount, user, incomeId });

        // Format response before sending
        const formattedExpense = {
            ...expense._doc,
            createdAt: formatDate(expense.createdAt),
            updatedAt: formatDate(expense.updatedAt)
        };

        res.json(formattedExpense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch all expenses for the logged-in user
const fetchAllExpense = expressAsyncHandler(async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }

        const { incomeId } = req.query;
        const filter = { user: req.user._id }; // Fetch only the logged-in user's expenses

        if (incomeId) {
            filter.incomeId = incomeId; // Filter by incomeId if provided
        }

        let expenses = await Expense.find(filter);

        expenses = expenses.map(expense => ({
            ...expense._doc,
            createdAt: formatDate(expense.createdAt),
            updatedAt: formatDate(expense.updatedAt)
        }));

        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Fetch Single Expense
const fetchExpenseDetails = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params;
    try {
        let expense = await Expense.findById(id);

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        // Format response before sending
        expense = {
            ...expense._doc,
            createdAt: formatDate(expense.createdAt),
            updatedAt: formatDate(expense.updatedAt)
        };

        res.json(expense);
    } catch (error) {
        res.json(error);
    }
});

// Update Expense
const updateExpense = expressAsyncHandler(async (req, res) => {
    const { title, amount, user, incomeId } = req.body;
    const { id } = req.params;
    try {
        let expense = await Expense.findByIdAndUpdate(
            id,
            { title, amount, user, incomeId },
            { new: true }
        );

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        // Format response before sending
        expense = {
            ...expense._doc,
            createdAt: formatDate(expense.createdAt),
            updatedAt: formatDate(expense.updatedAt)
        };

        res.json(expense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Expense
const deleteExpense = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params;
    try {
        const expense = await Expense.findByIdAndDelete(id);
        
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.json(error);
    }
});

const deleteExpensesByIncomeId = expressAsyncHandler(async (req, res) => {
    try {
        const { incomeId } = req.query; // Extract incomeId from query params

        if (!incomeId) {
            return res.status(400).json({ message: "incomeId is required" });
        }

        const deletedExpenses = await Expense.deleteMany({ incomeId });

        if (deletedExpenses.deletedCount === 0) {
            return res.status(404).json({ message: "No expenses found for this incomeId" });
        }

        res.json({ message: "All related expenses deleted successfully", deletedCount: deletedExpenses.deletedCount });
    } catch (error) {
        console.error("Error deleting expenses:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = { createExpense, fetchAllExpense, fetchExpenseDetails, updateExpense, deleteExpense,deleteExpensesByIncomeId  };

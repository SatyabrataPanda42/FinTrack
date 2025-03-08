const express = require('express');
const { createExpense,fetchAllExpense, fetchExpenseDetails,updateExpense,deleteExpense,deleteExpensesByIncomeId 
 } = require('../../controllers/expenses/expenseController');
const authMiddlewire = require('../../middlewares/authMiddlewire');
const expenseRoute = express.Router();
expenseRoute.get('/',authMiddlewire,fetchAllExpense);
expenseRoute.get('/:id',authMiddlewire,fetchExpenseDetails);
expenseRoute.post('/', authMiddlewire, createExpense);
expenseRoute.put('/:id', authMiddlewire, updateExpense);
expenseRoute.delete('/:id',authMiddlewire,deleteExpense); //api/income/:id
expenseRoute.delete("/", authMiddlewire, deleteExpensesByIncomeId);
module.exports = expenseRoute;
const express = require('express');

const { createIncome,fetchAllIncome,fetchIncomeDetails,updateIncome,deleteIncome } = require('../../controllers/Income/incomeController');
const authMiddlewire = require('../../middlewares/authMiddlewire');
const incomeRoute = express.Router();
incomeRoute.post('/',authMiddlewire,createIncome);
incomeRoute.get('/',authMiddlewire,fetchAllIncome);
incomeRoute.get('/:id',authMiddlewire,fetchIncomeDetails);
incomeRoute.put('/:id',authMiddlewire,updateIncome);
incomeRoute.delete('/:id',authMiddlewire,deleteIncome); //api/income/:id
module.exports = incomeRoute;
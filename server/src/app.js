const express = require('express');
const dbConnect = require('./config/dbConnect');
const {errorHandler,notFound} = require('./middlewares/errormiddleware');
const userroute = require('./routes/users/usersroute');
const incomeRoute = require('./routes/income/incomeRoute');
const expenseRoute = require('./routes/expenses/expenseRoute');
const app = express();
//db Connect
const logger = (req, res, next) => {
    console.log("Middleware");
    next(); 
}
app.use(logger);

dbConnect();
//midddleware
app.use(express.json());

//route
app.use('/api/users',userroute);
//income route
app.use('/api/income', incomeRoute);
//expense route
app.use('/api/expenses', expenseRoute);

//error handler
app.use(notFound);
app.use(errorHandler);



//income
//expenses




module.exports = app;


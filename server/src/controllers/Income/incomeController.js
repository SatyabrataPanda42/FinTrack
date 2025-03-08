const expressAsyncHandler = require("express-async-handler");
const Income = require("../../model/Income"); // Import the model

//create income

const createIncome = expressAsyncHandler(async (req, res) => {
    console.log("Route hit");

    // Extract user ID dynamically from authenticated request
    const userId = req.user ? req.user._id.toString() : null;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized. User ID not found." });
    }

    const { title, description, amount } = req.body;

    try {
        const income = await Income.create({
            title,
            description,
            amount,
            user: userId, // Assign user ID dynamically
        });

        res.status(201).json(income);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




//fetch all income
const fetchAllIncome = expressAsyncHandler(async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }

        const incomes = await Income.find({ user: req.user._id }); // ✅ Filter by logged-in user
        res.json(incomes);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});




//fetch single
const fetchIncomeDetails = expressAsyncHandler(async(req, res) => {
    const {id} = req?.params;
    try {
        const income = await Income.findById(id);
        res.json(income);
    } catch (error) {
        res.json(error);
    }
});


//update income
const updateIncome = expressAsyncHandler(async(req, res) => {
    const {title, description, amount, user} = req.body;
    const {id} = req?.params;
    try {
        const income = await Income.findByIdAndUpdate(id, {
            title,
            description,
            amount,
            user
        }, {new: true});
        res.json(income);
    } catch (error) {
        res.json(error);
    }
});

//delete income
const deleteIncome = expressAsyncHandler(async(req, res) => {
    const {id} = req?.params;
    
    try {
        const income = await Income.findByIdAndDelete(id);
        res.json(income);
    } catch (error) {
        res.json(error);
    }
});




module.exports = {createIncome, fetchAllIncome, fetchIncomeDetails,updateIncome,deleteIncome}; // Export the functions    
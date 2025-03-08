const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');    

// Helper function to format date
const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = d.getFullYear();
    return `${day}:${month}:${year}`;
};

// Schema
const expenseSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a Title']
    },
    amount: {
        type: Number,
        required: [true, 'Please provide an amount'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user ID'],
    },
    incomeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Income',
        required: [true, 'Please provide an Income ID'],
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// Virtuals to format timestamps
expenseSchema.virtual('createdAtFormatted').get(function () {
    return formatDate(this.createdAt);
});

expenseSchema.virtual('updatedAtFormatted').get(function () {
    return formatDate(this.updatedAt);
});

expenseSchema.plugin(mongoosePaginate);

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;

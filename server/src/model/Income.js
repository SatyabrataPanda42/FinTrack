const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require('bcryptjs');
//schema
const incomeSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a Title']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    type: {
        type: String,
        default: 'Income',
    },
    amount: {
        type: Number,
        required: [true, 'Please provide a amount'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user ID'],
    },
},

{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
},
);
//paginnation
incomeSchema.plugin(mongoosePaginate);

const Income = mongoose.model('Income', incomeSchema);
module.exports = Income;
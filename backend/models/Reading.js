const mongoose = require('mongoose');

const ReadingSchema = mongoose.Schema({
    value : {
        type : Number,
        required : [true, 'Please provide company name'],
        maxlength: 100,
    },
    date : {
        type : Date,
        default : Date.now,
        require : true
    },
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : [true, 'Please provide user'],
    }
}, {timestamps: true})

module.exports = mongoose.model('Reading', ReadingSchema)
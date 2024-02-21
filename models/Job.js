const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    position :{
        type : String,
        required : [true , 'please add a position']
    },
    description :{
        type : String , 
        required : [true , 'Please add a description']
    },
    time: {
        type: String,
        required: [true, 'Please add a time']
    }
});

module.exports = mongoose.model('Job',JobSchema);
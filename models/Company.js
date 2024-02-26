const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    companyName :{
        type : String,
        required : [true , 'please add a company name']
    },
    description :{
        type : String , 
        required : [true , 'Please add a description']
    },
    image: {
        type: Buffer,
        required: [true, 'Please add a picture']
    }
});

module.exports = mongoose.model('Company',CompanySchema);
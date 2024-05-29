const mongoose  = require("mongoose");
const { format } = require("path");

const serviceSchema = mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    phoneNumber:{
        type : Number,
        required : true,

    },
    sqfeet:{
        type : Number,
        required : true,

    },
    placelocation :{
        type : String,
        required : true,
    },
    plan : {
        type : String,
        required : true,
    },
    startDate : {
        type : Date,
        required : true,
    },
    endDate : {
        type : Date,
        required : true
    },
    comment : {
        type : String,
    }

})

module.exports = mongoose.model ('Service',serviceSchema)
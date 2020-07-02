const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required: true,
        trim: true
    },
    
    phoneNo: {
        type : Number,
        required: true,
        trim: true
    },
    
    email: {
        type : String,
        required: true,
        trim: true,
        default: 'N/A'
    },
    
    address: {
        type : String,
        trim: true,
        default: 'N/A'
    },
    
    age: {
        type : String,
        required: true,
        trim: true,
        default: 'N/A'
    },

    isAuthenticated : {
        type : Boolean,
        default: false
    }, 

    tasksAssigned : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Task'
    }]    
});

module.exports = User = mongoose.model("User", userSchema);
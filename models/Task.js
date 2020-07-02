const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskName : {
        // unique taskName for each task
        type : String,
        required: true
    },

    taskDescription: {
        type : String,
        trim: true,
        default: 'N/A'
    } 
});

module.exports = Task = mongoose.model("Task", taskSchema);
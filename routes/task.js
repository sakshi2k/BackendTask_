const express = require("express");
const bodyParser = require("body-parser");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/tasks' });

// importing task model.
const Task = require("../models/Task");
const User = require("../models/User");

const app = express();

app.route("/tasks")

    // desc : see all TASKS assigned
    .get((req, res) => {
        Task.find({}, (foundTask, err) => {
            if(!err) {
                if(foundTask) {
                    res.write(foundTask);
                }
            }
        });
        res.send("Tasks lists");
    });

app.route("/addTask")

    // .post(upload.single('task'), async(req, res) => {
    .post(async(req, res) => {
          
        const newTask = new Task({
            taskName : req.body.taskName,
            taskDescription : req.body.taskDescription 
        });

        try {
            Task.findOne({taskName : req.body.taskName}, async(foundTask, err) => {
                if(!err) {
                    if(foundTask){
                        res.send("Task Name already taken. Try another?")
                    } else {
                        await newTask.save();

                // const file = req.file;      // multer dest: 'uploads/tasks'
                //                             // req.file is the `task` file

                        return res.json({
                                    success : true,
                                    message : "Task created successfully"
                                });
                            }
                        } 
                });
        }
        catch (err) {
            res.send("ERROR : " + err);
        }
    });

app.route("/task/:taskName")

    // desc : see a task identified (uniquely by Name) by student.
    .get((req, res) => {
        try {
            Task.findOne({taskName : taskName}, (foundTask, err) => {
                if(!err) {
                    if(foundTask) {
                        res.send(foundTask)
                        // file downloaded from here by student.
                    }
                }
            });
        } catch (err) {
            res.send("ERROR : " + err);
        }
    });

app.route("/task/:taskName/:studentID")

    .post(upload.single('task'),(req, res) => { 

        // const 
        try {
            const user = req.params.studentID;
            User.findOne({_id : user}, (foundTask, err) => {
                if(!err) {
                    tasksAssigned.push();
                    }
                });
        } catch (err) {
            res.send("ERROR : " + err);
        }
    });
    
module.exports = app;
const express = require("express");
const randomString = require("randomstring");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer"); 
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// Requiring Models
const Instructor = require('../models/Instructor');
const User = require('../models/User');

const app = express();

/* ************************************** Routes ************************************* */

app.route("/instructor")

    // desc : Renders registration page
    .get((req, res) => {
        res.render("instructor-register");
    })

    // desc :  CREATE - Create an INSTRUCTOR User.
    .post(upload.single('avatar'), async(req, res) => {
    const {userName, caption, phoneNo, email, address, age, occupation} = req.body;
    const avatar = req.file;                                        // multer dest: 'uploads/'

    
    const newInstructor = new Instructor({
        userName : userName,
        caption : caption, 
        phoneNo : phoneNo, 
        email : email, 
        address : address, 
        age : age, 
        occupation : occupation
        // avatar yet to be uploaded in DB        
    });

    try {    
        // create Instructor with unique email.
        Instructor.findOne({email : email}, async(err, foundUser) => {
            if(!err) {
                
                // check if user already registered.
                if(foundUser){
                    res.send("Instructor already registered with this email ID.!");
                } else {

                    // Generate secret token
                    const secretToken = randomString.generate(16);

                    newInstructor.secretToken = secretToken;

                    await newInstructor.save();

                    // sending token through mail - NODE-MAILER

                    const message = "Your secret Code is : " + secretToken;

                    let testAccount = await nodemailer.createTestAccount();

                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                      host: "smtp.ethereal.email",
                      port: 587,
                      secure: false, // true for 465, false for other ports
                      auth: {
                        user: testAccount.user, // generated ethereal user
                        pass: testAccount.pass, // generated ethereal password
                      },
                    });
                  
                    // send mail with defined transport object
                    let info = await transporter.sendMail({
                      from: '"Fred Foo 👻" <foo@example.com>', // sender address
                                                //   to: newInstructor.email, // list of receivers
                      to: newInstructor.email, // list of receivers
                      subject: "Your One time Secret Token", // Subject line
                      text: message, // plain text body
                      html: message, // html body
                    });
                  
                    console.log("Message sent: %s", info.messageId);
                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

                    return res.json({
                        success : true,
                        message : "Check your mail to Verify your account",
                        // for testingPurpose only
                        testingPurposeOnly: "OR visit  " + nodemailer.getTestMessageUrl(info)                    
                    });
                }            
            }
        
        })   
    } catch (err) {
        return res.json({
            success: false,
            message: err
        })
    }

});


app.route("/instructor/verify")
    // desc : To Verify Instructor account via Secret Code
    .get((req, res) => {
        res.render("verify-instructor");
    })

    // Authenticated Registeration
    .post(async(req, res, next) => {
        try{
        const {secretToken, email} = req.body;

        // find the account that matches with the Instructor using email.
        Instructor.findOne({email : email}, async(err, foundInstructor) => {
            if(!err){
                if(!foundInstructor) {
                    res.send({
                        success : false,
                        message : "Instructor not found!"
                    })
                } else {
                    if(foundInstructor.secretToken === secretToken) {
                        foundInstructor.active = true;   // false by default
                        foundInstructor.secretToken = '';
                        foundInstructor.save();
                        res.send({
                            success : true,
                            message : "Congratulations, You are not registered.!"
                        }) 
                    } else {
                        // Wrong Secret Token
                        return res.json({
                            success : "false",
                            message : "Wrong Secret token"
                        });
                    }
                }
            }
        })
        }
        catch (err) {
            next(error);
        }
    });

// desc : To authenticate new users
app.route("/instructor/authenticateUsers")
    
    .get(async (req, res) => {

        const unauthenticatedUsers = await User.find({isAuthenticated : "false"});// (err, foundUser) => {
            
        res.render("authenticateUsers", {users : unauthenticatedUsers });
    })
    
    .post(async (req, res) => { 
        
        const authticatedUserId = req.body.choice;                   // mongo based _id

        User.findById({_id : authticatedUserId}, async(err, foundUser) => {
            if(!err){
                if(foundUser){
                    foundUser.isAuthenticated = true;
                    await foundUser.save();
                }
            } else {
                res.send(err);
            }
        })

        res.redirect("/instructor/authenticateUsers");
    });

module.exports = app;
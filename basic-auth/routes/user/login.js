const express = require('express');
const router  = express.Router();
const User = require('../../models/User');
const bcrypt = require("bcrypt");

const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);


router.post("/login",(req, res, next) => {
    const {email, password} = req.body;
    User
    .findOne({
        email
    })
    .then((user)=>{
        if(!user) { 
            res.status(403).json({message: "Invalid credentials!"})
        }else {
            bcrypt.compare(password,user.password, function(err,correctPassword){
            if(err) next("hash compare error");
            else if(!correctPassword) {
                res.status(403).json({message: "Invalid credentials!"})
            }else {
                req.session.currentUser = user;
                res.status(200).json({
                    firstName: user.firstName,
                    email: user.email,
                    lastName: user.lastName
                })
            }
            })
        }
    })
    .catch((err)=> {
        res.send("Error, not logged in.", err)
    })
});


module.exports = router;
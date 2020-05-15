const express = require('express');
const router  = express.Router();
const User = require('../../models/User');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/signup", (req, res, next) => {
    const { email, password ,firstName, lastName } = req.body;
    User
    .findOne({ "email": email })
    .then((user) => {
        if (user !== null) {
            res.status(403).json({message: "The email already exists!"})
        }else {
            bcrypt
            .hash(password, bcryptSalt, function (err, hash) {
                if (err) next("Hashing error", err)
                else {
                    User
                    .create({
                        email: email,
                        password: hash,
                        firstName: firstName,
                        lastName: lastName
                    })
                    .then((user)=>{
                        res.status(200).json({
                            message: `Hey, ${user.firstName} ${user.lastName}, you can login now.`
                        })
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }
            })
        }
    })
})

module.exports = router;
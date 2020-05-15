const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const session = require("express-session");

router.get('/profile', (req, res, next) => {
    User
    .findById(req.session.currentUser._id)
    .then((user) => {
        res.json({
            firstName: user.firstName,
            email: user.email,
            lastName: user.lastName
        })
    })
    .catch((err)=>{
        console.log("profile error:", err);
    })
});


module.exports = router;
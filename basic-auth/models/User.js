const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    password: {type:String,
        validate: {
            validator: function (v) {
                return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(v);
            },
            message: props => `${props.value}is not a valid password. 8 chars at least one uppercase one lowercase`
        }
    },
    email: String,
    firstName: String,
    lastName: String
});


const User = mongoose.model("users",userSchema)

module.exports = User;
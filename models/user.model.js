const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[5, "Username must be at least 5 characters long."]
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[13, "Email must be at least 5 characters long."],
    },
    password:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minlength:[5, "Password must be at least 5 characters long."],
    }
});

const user = mongoose.model("user",userSchema);

module.exports = user;
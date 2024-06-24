const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please provide name'],
        minlength : 3,
        maxlength : 50,
    },
    email : {
        type : String,
        required : [true, 'Please provide email'],
        match : [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide valid email id'
        ],
        unique : true
    },
    gender : {
        type : String,
        enum : ['Male', 'Female', 'Others'],
        required : true,
    },
    age : {
        type : String,
        required : [true, 'Please enter the age']
    },
    password : {
        type : String,
        required : [true, 'Please provide password'],
        minlength : 5,
    }
})

// mongoose middlewares

UserSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

// instance methods

UserSchema.methods.creatJWT = function () {
    const token = jwt.sign({userId : this._id, name : this.name, gender : this.gender, age : this.age}, 'jwt secret', {expiresIn : '30d'})
    return token;
}

UserSchema.methods.comparePasswords = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

// export the model

module.exports = mongoose.model('User', UserSchema)
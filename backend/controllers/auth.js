const User = require('../models/User');
const statusCodes = require('http-status-codes');
const {BadRequestError, UnauthenticatedError} = require('../errors');
const bcrypt = require('bcryptjs')


const register = async (req,res) => {
    try {
        const user = await User.create({...req.body.values});
        const token = user.creatJWT()
        res.status(statusCodes.CREATED).json({name : user.name, token});
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => {
                if (err.kind === 'minlength') {
                    throw new BadRequestError(`${err.path.charAt(0).toUpperCase() + err.path.slice(1)} is shorter than the minimum allowed length (${err.properties.minlength})`);
                }
                if (err.kind === 'maxlength') {
                    throw new BadRequestError(`${err.path.charAt(0).toUpperCase() + err.path.slice(1)} is longer than the maximum allowed length (${err.properties.maxlength})`);
                }
                return err.message;
            });
        }
        if(error.code == 11000){
            throw new BadRequestError('User with this email exists');
        }
    }
    
}

const login = async (req,res) => {
    const {email, password}  = req.body.values

    if(!email || !password){
        throw new BadRequestError('Please provide all the credentials');
    }

    const user = await User.findOne({email});
    if(!user){
        throw new UnauthenticatedError('No user with this mail')
    }

    const check = await user.comparePasswords(password);

    if(!check){
        throw new UnauthenticatedError('Incorrect Password');
    }
    
    const token = user.creatJWT();
    
    res.status(statusCodes.OK).json({user:{name : user.name}, token});
}


module.exports = {register, login};
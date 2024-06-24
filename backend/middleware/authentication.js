const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');


const auth = (req,res, next) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Invalid authorization');
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, 'jwt secret')
        req.user = {userId : payload.userId, name : payload.name}
        next();
    } catch (error) {
        throw new UnauthenticatedError('Invalid authorization')
    }
}

module.exports = auth;
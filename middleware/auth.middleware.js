const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
   
    const token = req.cookies.token;
        
    if(!token){
        console.error('No token found');
        return res.redirect('/user/login');
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);;
        const user = await userModel.findById(decode.userId);

        if(!user){
            console.error('User not found');
            return res.redirect('/user/login');
        }
        req.user = user;
        // console.log('Auth Middleware: ', user);
        next();
    }catch(err){
        console.error('Auth Middleware Error: ', err);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

}

module.exports = authMiddleware;
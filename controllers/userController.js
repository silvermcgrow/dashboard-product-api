const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res)=>{
    
    try {
        const {name, email, password} = req.body;
        // Check for if email is exist
        const user = await User.findOne({ email });
        if(user){
            return res.status(401)
                .json({'message': 'Email is already exist'});
        }

        const userInfo = new User(req.body);
        userInfo.password = await bcrypt.hash(req.body.password, 10);
        const response = await userInfo.save();
        response.password = undefined;

        return res.status(201)
            .json({'message': 'User Created', 'data': response});
    } catch (error) {
        return res.status(500)
            .json({'message':'Internal Server Error', error});
    }
}

const loginUser = async (req, res)=>{
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if(!user){
            return res.status(403)
                .json({'message': 'Unauthorized User'});
        }
        // Check password
        const isPsswordMatch = await bcrypt.compare(password, user.password);
        if(!isPsswordMatch){
            return res.status(403)
                .json({'message': 'Unauthorized User/Email password not matched'});
        }
        const userObject = {
            name: user.name,
            email: email,
            _id: user._id
        };
        const jwtToken = jwt.sign(userObject, process.env.JWT_SECRET, {expiresIn:'4h'});
        userObject.token = jwtToken;
        return res.status(200)
            .json({'message': 'User Logedin', 'data': userObject});
    } catch (error) {
        return res.status(500)
            .json({'message':'Internal Server Error', error});
    }
}

module.exports = {
    registerUser,
    loginUser
}
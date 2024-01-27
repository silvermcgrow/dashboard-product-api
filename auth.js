const jwt = require('jsonwebtoken');

const isAuthorized = async (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(401)
        .json({'message':'Unauthorized'});
    }

    try {
        const decode = jwt.verify(authHeader, process.env.JWT_SECRET);
        if(!decode){
            return res.status(401)
                .json({'message':'Unauthorized'});
        }
        next();
    } catch (error) {
        return res.status(401)
        .json({'message':'Unauthorized', error});
    }

}

module.exports = isAuthorized;
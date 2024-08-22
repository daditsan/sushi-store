const { User } = require('../models')
const { signToken, verifyToken } = require('../helpers/jwt')
require('dotenv').config(); //for debug

const authentication = async (req, res, next) => {
    try {
        let tokenAccess = req.headers.authorization;

        if(!tokenAccess) {
            throw { name: "Invalid Token" }
        }
    
        const [bearer, token] = tokenAccess.split(" ");
    
        if (bearer !== 'Bearer') {
            throw { name: "Invalid Token" }
        }
    
        const payload = verifyToken(token)
    
        const user = await User.findByPk(payload.id);
    
        if(!user) {
            throw { name: "Invalid Token" }
        }
    
        req.user = { id: user.id, role: user.role }
        next();
    } catch (error) {
        next(error)
    } 
}

module.exports = authentication;

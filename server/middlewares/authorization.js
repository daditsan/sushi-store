const { Cuisine } = require('../models')

const authorization = async (req, res, next) => {
    try {
        let { id } = req.params;

        if (req.user.role === 'Admin') {
            next();
        } else {
            let cuisine = await Cuisine.findByPk(id);
            
            if(!cuisine) {
                throw { name: 'Not Found Cuisine' }
            }

            if (cuisine.authorId === req.user.id) {
                next()
            } else {
                throw { name: 'Forbidden' }
            }
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { authorization };
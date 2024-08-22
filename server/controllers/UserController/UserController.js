const { User } = require('../../models')
const { comparePassword } = require('../../helpers/bcryptjs');
const { signToken } = require('../../helpers/jwt');


class UserController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email) {
                throw ({ name: "Bad Request Email" })
            }
            

            if (!password) {
                throw ({ name: "Bad Request Password" })
            }

            let loginInfo = await User.findOne({
                where: {
                    email
                }
            })

            if (!loginInfo || !comparePassword(password, loginInfo.password)) {
                throw ({ name: "Unauthorized Incorrect" })
            }

            res.status(200).json({ access_token: signToken({ id: loginInfo.id })})


        } catch (error) {
            next(error)
        }
    }
    
    static async addUser(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body

            if (!email) {
                throw { name: 'Bad Request Email' }   
            }

            if (!password) {
                throw { name: 'Bad Request Password' }
            }

            const registerInfo = await User.create({
                username, email, password, phoneNumber, address
            })

            res.status(201).json({
                id: registerInfo.id,
                email: registerInfo.email
            })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController;
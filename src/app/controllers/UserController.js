const User = require("../models/User") 

class UserController {
    async store(req, res){
        const userExists = await User.findOne({where: { email: req.body.email }})

        if (userExists) {
            return res.status(400).json({error: "User already exists."});
        }

        const {id, name, email, provider} = await User.create(req.body);

        return res.json({
            id,
            name,
            email,
            provider
        });
    }

    async update(req,res) {
        const { email, oldPassword } = req.body

        const user = await User.findByPk(req.userId)

        if (email !== user.email) {
            const userExists = await User.findOne({where: { email }})

            if (userExists) {
                return res.status(400).json({error: "User already exists."});
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))){
            return res.status(401).json({error: "Password does not match."});
        }

        const { password, confirmPassword } = req.body;

        if (password != confirmPassword) {
            return res.status(401).json({error: "Password and Confirm Password doen not match"});
        }

        const { id, name, provider} = await user.update(req.body);

        return res.json({
           id,
           name,
           email,
           provider, 
        });
    }

}

module.exports = new UserController();
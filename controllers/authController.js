const User = require('../models/User.js');
const Role = require('../models/Role.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require('./config');

const generateAccessToken = (id, roles) => {
    const payload = { id, roles};
    return jwt.sign(payload, secret, {expiresIn: '24h'});
}

class authController {
    async registration(req, res){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json(errors);
            }
            const {username, password, email} = req.body;
            const candidate = await User.findOne( {email} );
            if(candidate){
                res.status(400).json({
                    message: 'Пользователь с такой почтой не существует',
                });
            }
            var passwordhash = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: 'USER'});
            const user = new User({
                username,
                password: passwordhash,
                email,
                roles: [userRole.value],
            });
            await user.save();
            return res.json(user);   
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: 'Registration error',
            });
        }
    }

    async login(req, res){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json(error);
            }

            const {email, password} = req.body;
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({
                    message: `Пользователь ${email} не найден`,
                });
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword){
                return res.status(400).json({
                    message: 'Неверный логин или пароль',
                });
            }

            const token = generateAccessToken(user._id, user.roles);
            res.json(token);
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: 'Login error',
            });
        }
    }

    async getUsers(req, res){
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            
        }
    }
}

module.exports = new authController();
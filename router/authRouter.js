const Router = require('express');
const controller = require('../controllers/authController');
const { loginValidation, registerValidation} = require('./validation');
const { handleValidationErrors } = require('./handleValidationError');
const { check } = require('express-validator');

const router = new Router();


router.post('/registration', [
    check('username', 'Имя пользователя не может быть').notEmpty(),
    check('email', 'Неверный формат почты').isEmail(),
    check('password', 'Пароль должен быть минимум из 6 символов').isLength({ min: 6})
], controller.registration);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);

module.exports = router;
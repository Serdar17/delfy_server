const { body } = require('express-validator');

module.exports = loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум из 6 символов').isLength({ min: 6 }),
];

module.exports = registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум из 6 символов').isLength({ min: 6 }),
    body('username', 'Имя пользователя должно быть больше 3 символов').isLength({ min: 3 }),
];
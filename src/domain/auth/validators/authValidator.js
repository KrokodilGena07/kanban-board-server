const {body} = require('express-validator');

const authValidator = [
    body('username', 'Имя пользователя не валидно').isLength({min: 1, max: 255}),
    body('email', 'Почта не валидна').isEmail(),
    body('password', 'Введите более сильный пароль').isStrongPassword({
        minLength: 10,
        minLowercase: 2,
        minUppercase: 2,
        minNumbers: 2,
        minSymbols: 1
    })
];

module.exports = authValidator;
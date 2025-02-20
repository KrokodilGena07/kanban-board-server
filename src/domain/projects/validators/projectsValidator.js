const {body} = require('express-validator');


module.exports = projectsValidator = (fieldName) => {
    return [
        body('name', 'Имя проекта не валидно').isLength({min: 1, max: 255}),
        body(fieldName, `${fieldName} не валиден`).isLength({min: 1, max: 255})
    ];
};
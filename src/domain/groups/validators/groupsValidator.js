const {body} = require('express-validator');


const groupsValidator = [
    body('name', 'Имя не валидно').isLength({min: 1, max: 255}),
    body('userId', `userId не валиден`).isLength({min: 1, max: 255}),
    body('projectId', `projectId не валиден`).optional().isLength({min: 1, max: 255})
];

const groupsUpdateValidator = [
    body('name', 'Имя не валидно').isLength({min: 1, max: 255}),
    body('id', `id не валиден`).isLength({min: 1, max: 255})
];

module.exports = {
    groupsUpdateValidator,
    groupsValidator
};
const {body} = require('express-validator');

const baseValidator = [
    body('name', 'Имя не валидно').isLength({min: 1, max: 255}),
    body('description', 'Описание не валидно').isLength({min: 1, max: 255}),
    body('term', 'Срок не валиден').isDate(),
    body('priority', 'Приоритет не валиден').isLength({min: 1, max: 255}),
];

const taskValidator = [
    ...baseValidator,
    body('userId', 'userId не валиден').isLength({min: 1, max: 255}),
    body('projectId', 'projectId не валиден').optional().isLength({min: 1, max: 255}),
    body('groupId', 'groupId не валиден').optional().isLength({min: 1, max: 255}),
];

const updateTaskValidator = [
    ...baseValidator,
    body('id', 'id не валиден').isLength({min: 1, max: 255}),
];

module.exports = {
    taskValidator,
    updateTaskValidator
};
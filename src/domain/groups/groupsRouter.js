const Router = require('express');
const groupsController = require('./groupsController');
const authMiddleware = require('../../middlewares/authMiddleware');
const {
    groupsValidator,
    groupsUpdateValidator
} = require('./validators/groupsValidator');

const groupsRouter = new Router();

groupsRouter.get('/:projectId', authMiddleware, groupsController.get);
groupsRouter.post('/', authMiddleware, ...groupsValidator, groupsController.create);
groupsRouter.put('/', authMiddleware, ...groupsUpdateValidator, groupsController.update);
groupsRouter.delete('/:id', authMiddleware, groupsController.delete);

module.exports = groupsRouter;
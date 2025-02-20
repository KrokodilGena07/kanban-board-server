const Router = require('express');
const tasksController = require('./tasksController');
const authMiddleware = require('../../middlewares/authMiddleware');
const {updateTaskValidator, taskValidator} = require('./validators/taskValidator');

const tasksRouter = new Router();

tasksRouter.get('/', authMiddleware, tasksController.get);
tasksRouter.post('/', authMiddleware, ...taskValidator, tasksController.create);
tasksRouter.put('/', authMiddleware, ...updateTaskValidator, tasksController.update);
tasksRouter.delete('/:id', authMiddleware, tasksController.delete);

module.exports = tasksRouter;
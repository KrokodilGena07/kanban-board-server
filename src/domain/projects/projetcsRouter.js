const Router = require('express');
const projectsController = require('./projectsController');
const authMiddleware = require('../../middlewares/authMiddleware');
const projectsValidator = require('./validators/projectsValidator');

const projectsRouter = new Router();

projectsRouter.get('/:userId', authMiddleware, projectsController.get);
projectsRouter.post('/', authMiddleware, ...projectsValidator('userId'), projectsController.create);
projectsRouter.put('/', authMiddleware, ...projectsValidator('id'), projectsController.update);
projectsRouter.delete('/:id', authMiddleware, projectsController.delete);

module.exports = projectsRouter;
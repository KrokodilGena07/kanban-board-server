const Router = require('express');
const authRouter = require('../domain/auth/authRouter');
const projectsRouter = require('../domain/projects/projetcsRouter');
const groupsRouter = require('../domain/groups/groupsRouter');
const tasksRouter = require('../domain/tasks/tasksRouter');

const router = new Router();

router.use('/auth', authRouter);
router.use('/projects', projectsRouter);
router.use('/groups', groupsRouter);
router.use('/tasks', tasksRouter);

module.exports = router;
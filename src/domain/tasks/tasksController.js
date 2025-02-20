const tasksModel = require('./tasksModel');
const {validationResult} = require('express-validator');
const ApiError = require('../../error/ApiError');

class TasksController {
    async get(req, res, next) {
        try {
            const {projectId, userId} = req.query;
            const data = await tasksModel.get(projectId, userId);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async create(req, res, next) {
        try {
            const {name, description, term, priority, userId, projectId, groupId} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Данные не валидны', errors.array()));
            }

            const data = await tasksModel.create(
                name, description, term, priority, userId, projectId, groupId
            );
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const {name, description, term, priority, id} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Данные не валидны', errors.array()));
            }

            const data = await tasksModel.update(
                name, description, term, priority, id
            );
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await tasksModel.delete(id);
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }


}

module.exports = new TasksController();
const {validationResult} = require('express-validator');
const ApiError = require('../../error/ApiError');
const projectModel = require('./projectsModel');

class ProjectsController {
    async create(req, res, next) {
        try {
            const {name, userId} = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Данные не валидны', errors.array()));
            }

            const data = await projectModel.create(userId, name);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async get(req, res, next) {
        try {
            const {userId} = req.params;
            const data = await projectModel.get(userId);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const {name, id} = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Данные не валидны', errors.array()));
            }

            const data = await projectModel.update(id, name);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await projectModel.delete(id);
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ProjectsController();
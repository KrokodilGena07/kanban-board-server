const groupsModel = require('./groupsModel');
const {validationResult} = require('express-validator');
const ApiError = require('../../error/ApiError');

class GroupsController {
    async get(req, res, next) {
        try {
            const {projectId} = req.params;
            const data = await groupsModel.get(projectId);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async create(req, res, next) {
        try {
            const {userId, name, projectId} = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Данные не валидны', errors.array()));
            }

            const data = await groupsModel.create(userId, name, projectId);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const {id, name} = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Данные не валидны', errors.array()));
            }

            const data = await groupsModel.update(id, name);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await groupsModel.delete(id);
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }


}

module.exports = new GroupsController();
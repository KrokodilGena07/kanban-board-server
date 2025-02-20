const uuid = require('uuid');
const {User, Project} = require('../../models');
const ApiError = require('../../error/ApiError');

class ProjectsModel {
    async create(userId, name) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiError.badRequest('Ошибка');
        }

        const id = uuid.v4();
        return await Project.create({id, userId, name});
    }

    async get(userId) {
        return await Project.findAll({where: {userId}});
    }

    async update(id, name) {
        const project = await Project.findByPk(id);
        if (!project) {
            throw ApiError.badRequest('Ошибка');
        }

        project.name = name;
        return await project.save();
    }

    async delete(id) {
        const project = await Project.findByPk(id);
        if (!project) {
            throw ApiError.badRequest('Ошибка');
        }

        await project.destroy();
    }
}

module.exports = new ProjectsModel();
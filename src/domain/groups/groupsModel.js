const {Group, User, Project} = require('../../models');
const ApiError = require('../../error/ApiError');
const uuid = require('uuid');

class GroupsModel {
    async get(projectId) {
        return await Group.findAll({where: {projectId}});
    }

    async create(userId, name, projectId) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiError.badRequest('Ошибка');
        }

        const pId = projectId ?? user.inboxId;

        const project = await Project.findByPk(pId);
        if (!project) {
            throw ApiError.badRequest('Ошибка');
        }

        const id = uuid.v4();
        return await Group.create({id, userId, name, projectId: pId});
    }

    async update(id, name) {
        const group = await Group.findByPk(id);
        if (!group) {
            throw ApiError.badRequest('Ошибка');
        }

        group.name = name;
        return await group.save();
    }

    async delete(id) {
        const group = await Group.findByPk(id);
        if (!group) {
            throw ApiError.badRequest('Ошибка');
        }

        await group.destroy();
    }
}

module.exports = new GroupsModel();
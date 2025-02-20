const {Task, Project, Group, User} = require('../../models');
const ApiError = require('../../error/ApiError');
const uuid = require('uuid');

class TasksModel {
    async create(name, description, term, priority, userId, projectId, groupId) {
        const data = {};
        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiError.badRequest('Ошибка');
        }

        const pId = projectId ?? user.inboxId;
        const project = await Project.findByPk(pId);
        if (!project) {
            throw ApiError.badRequest('Ошибка');
        }
        data.projectId = pId;
        await project.increment('tasksCount');

        if (groupId) {
            const group = await Group.findByPk(groupId);
            if (!group) {
                throw ApiError.badRequest('Ошибка');
            }
            data.groupId = groupId;
            await group.increment('tasksCount');
        }

        const id = uuid.v4();
        return await Task.create({
            id, name, description, term, priority, userId, ...data
        });
    }

    async get(projectId, userId) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiError.badRequest('Ошибка');
        }
        return await Task.findAll({where: {projectId: projectId ?? user.inboxId, userId}});
    }

    async update(name, description, term, priority, id) {
        const task = await Task.findByPk(id);
        if (!task) {
            throw ApiError.badRequest('Ошибка');
        }

        task.set({name, description, term, priority});
        return await task.save();
    }

    async delete(id) {
        const task = await Task.findByPk(id);
        if (!task) {
            throw ApiError.badRequest('Ошибка');
        }

        const project = await Project.findByPk(task.projectId);
        if (!project) {
            throw ApiError.badRequest('Ошибка');
        }
        await project.decrement('tasksCount');

        if (task.groupId) {
            const project = await Group.findByPk(task.groupId);
            await project.decrement('tasksCount');
        }

        await task.destroy();
    }
}

module.exports = new TasksModel();
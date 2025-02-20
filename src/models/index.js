const db = require('../config/db');
const {DataTypes} = require('sequelize');

const User = db.define('user', {
    id: {type: DataTypes.STRING, primaryKey: true},
    username: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    activationLink: {type: DataTypes.STRING, allowNull: false, unique: true},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    inboxId: {type: DataTypes.STRING, allowNull: false, unique: true}
});

const Token = db.define('token', {
    id: {type: DataTypes.STRING, primaryKey: true},
    refreshToken: {type: DataTypes.STRING, allowNull: false, unique: true}
});

const Task = db.define('task', {
    id: {type: DataTypes.STRING, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    priority: {type: DataTypes.STRING, defaultValue: 'P4'},
    term: {type: DataTypes.DATE, allowNull: false},
    groupId: {type: DataTypes.STRING},
});

const Project = db.define('project', {
    id: {type: DataTypes.STRING, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    tasksCount: {type: DataTypes.INTEGER, defaultValue: 0}
});

const Group = db.define('group', {
    id: {type: DataTypes.STRING, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    tasksCount: {type: DataTypes.INTEGER, defaultValue: 0}
});

User.hasOne(Token);
Token.belongsTo(User);

Project.hasMany(Group);
Group.belongsTo(Project);

User.hasMany(Task);
Task.belongsTo(User);

Project.hasMany(Task);
Task.belongsTo(Project);

User.hasMany(Project);
Project.belongsTo(User);

module.exports = {
    User,
    Token,
    Task,
    Project,
    Group
};
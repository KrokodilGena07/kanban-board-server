const {User, Token, Project} = require('../../models');
const ApiError = require('../../error/ApiError');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const mailModel = require('../mail/mailModel');
const tokensModel = require('../tokens/tokensModel');
const UserDto = require('./dtos/UserDto');

class AuthModel {

    link(activationLink) {
        return `${process.env.API_URL}/api/auth/activate/${activationLink}`;
    }

    async registration(username, email, password, role) {
        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            throw ApiError.badRequest('Пользователь с такой почтой уже существует');
        }

        const id = uuid.v4();
        const activationLink = uuid.v4();
        const hashPassword = await bcrypt.hash(password, 5);
        const incomingProjectId = uuid.v4();

        const user = await User.create({
            id, username, password: hashPassword, email, activationLink, role, inboxId: incomingProjectId
        });
        await mailModel.sendMail(email, this.link(activationLink));

        await Project.create({userId: id, name: 'Входящие', id: incomingProjectId});

        return await this.#finishAuthorization(user);
    }

    async login(email, password) {
        if (!email || !password) {
            throw ApiError.badRequest('Пароль или почта пустая');
        }

        const user = await User.findOne({where: {email}});
        if (!user) {
            throw ApiError.badRequest('Пользователь не найден');
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordEqual) {
            throw ApiError.badRequest('Пароль неверный');
        }

        const activationLink = uuid.v4();
        user.activationLink = activationLink;
        await user.save();
        await mailModel.sendMail(email, this.link(activationLink));

        return await this.#finishAuthorization(user);
    }

    async logout(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorized();
        }

        const token = await Token.findOne({where: {refreshToken}});
        if (!token) {
            throw ApiError.unauthorized();
        }

        const user = await User.findByPk(token.userId);
        if (!user) {
            throw ApiError.unauthorized();
        }

        user.isActivated = false;
        await user.save();
        await token.destroy();
    }

    async activate(link) {
        const user = await User.findOne({where: {activationLink: link}});
        if (!user) {
            throw ApiError.badRequest('Пользаватель не найден');
        }

        user.isActivated = true;
        await user.save();
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorized();
        }

        const tokenFromDB = await Token.findOne({where: {refreshToken}});
        const userData = tokensModel.validateRefreshToken(refreshToken);
        if (!tokenFromDB  || !userData) {
            throw ApiError.unauthorized();
        }

        const user = await User.findByPk(userData.id);
        return await this.#finishAuthorization(user);
    }

    async #finishAuthorization(user) {
        const userDto = new UserDto(user);
        const tokens = tokensModel.generateTokens({
            id: userDto.id, email: userDto.email, role: userDto.role
        });
        await tokensModel.saveTokens(tokens.refreshToken, userDto.id);
        return {...tokens, user: userDto};
    }
}

module.exports = new AuthModel();
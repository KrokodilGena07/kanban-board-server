const nodemailer = require('nodemailer');

class MailModel {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        });
    }

    async sendMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Активация аккаунта",
            html: `
                <div>
                    <h1>Активируйте аккаунт</h1>
                    <a href="${link}">${link}</a>
                </div>
            `,
        });
    }
}

module.exports = new MailModel();
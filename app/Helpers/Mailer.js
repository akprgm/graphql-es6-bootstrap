/**
 * Mailer helper
 */
import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import nodemailer from 'nodemailer';
import Logger from './Logger';

export default class Mailer {
  constructor() {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        host: process.hope.mail.host,
        port: Number(process.hope.mail.port),
        secure: false,
        requireTLS: true,
        auth: {
          user: process.hope.mail.username,
          pass: process.hope.mail.password,
        },
      });
    }
  }

  /**
   * send registration mail to client
   * @param {*} clientMail
   */
  sendRegisterationMail(clientMail, data) {
    const templatePath = path.join(__dirname, '../../public/emails/activate-account.ejs');
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    const template = ejs.render(templateContent, data);
    const mailOptions = {
      from: process.hope.mail.name,
      to: clientMail,
      subject: 'Welcome to HCPSpace',
      html: template,
    };

    this.sendMailToUser(mailOptions);
  }

  /**
   * send forgot password mail
   * @param {*} clientMail
   */
  sendForgotPasswordMail(email, data) {
    const templatePath = path.join(__dirname, '../../public/emails/forgot-password.ejs');
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    const template = ejs.render(templateContent, data);
    const mailOptions = {
      from: process.hope.mail.name,
      to: email,
      subject: 'Hope Security',
      html: template,
    };
    this.sendMailToUser(mailOptions);
  }

  sendMailToUser(mailOptions) {
    const email = mailOptions.to;
    this.transporter.sendMail(mailOptions, (error) => {
      if (error) {
        Logger.info(`Message not sent to ${email}, Subject: ${mailOptions.subject} , ${error}`);
      } else {
        Logger.error(`Message sent to ${email}, Subject: ${mailOptions.subject}`);
      }
    });
  }
}

const nodeMailer = require('nodemailer');
const Email = require('email-templates');

const transporter = nodeMailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const email = new Email({
  transport: transporter,
  send: true,
  preview: false,
});

module.exports = email;

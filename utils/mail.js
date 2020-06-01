const nodeMailer = require('nodemailer');
const pug = require('pug');

const transporter = nodeMailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const generateHTML = (fileName, options = {}) => {
  return pug.renderFile(`${__dirname}/../emails/${fileName}.pug`, options);
};

const mailSender = async (options) => {
  const html = generateHTML(options.fileName, options);
  const mailOptions = {
    from: `${process.env.MAIL_SENDER} <${process.env.MAIL_ID}>`,
    to: options.email,
    subject: options.subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};
module.exports = { mailSender };

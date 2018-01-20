const nodemailer = require('nodemailer');
const config = require('../config/config.json');

module.exports = {
  getPage: (req, res) => {
    res.render('works');
  },

  sendMail: (req, res) => {
    if(!req.body.name || !req.body.email || !req.body.message) {
      return res.json({status: 'error', message: 'Вы заполнили не все поля'});
    }
    const transporter = nodemailer.createTransport(config.mail.smtp);
    const mailOptions = {
      from: `"${req.body.name}" <${req.body.email}>`,
      to: config.mail.smtp.auth.user,
      subject: config.mail.subject,
      text: req
        .body
        .message
        .trim()
        .slice(0, 500) + `\n\nОтправлено с: <${req.body.email}>`,
    };
    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        return res.json({status: 'error', message: 'Произошла ошибка на сервере'});
      }
      res.json({status: 'ok', message: 'Сообщение отправлено'});
    });
  },
};
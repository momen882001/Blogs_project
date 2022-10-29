const mailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");

const transporter = mailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendMailer = async (to, subject, body, link, username) => {
  // read the Html file where it will sent to the email
  let emailTemplate = new Promise(function (resolve, reject) {
    fs.readFile(
      "./assets/verify.html",
      { encoding: "utf-8" },
      function (err, html) {
        resolve(html);
        reject(err);
      }
    );
  });

  // get the html where I read before
  emailTemplate.then(async (html) => {
    let temp = handlebars.compile(html);
    let message = {
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      html: temp({ username, link }),
    };

    try {
      let info = await transporter.sendMail(message);
      console.log(info.messageId);
    } catch (err) {
      console.log("Error While Sending the Email\n" + err);
    }
  });
};

module.exports = sendMailer;

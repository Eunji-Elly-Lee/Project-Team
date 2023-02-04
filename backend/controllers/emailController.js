const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");

// Initialize nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPW
  }
});

// Point to the template folder
const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.join(__dirname, "../../frontend/src/emailTemplates/"),
    defaultLayout: false,
  },
  viewPath: path.join(__dirname, "../../frontend/src/emailTemplates/"),
  extName: ".handlebars"
}

// Use a template file with nodemailer
transporter.use("compile", hbs(handlebarOptions));

// POST send email
exports.sendCodeEmail = async (req, res) => {
  const email = req.body.email;
  const code = Math.floor(Math.random() * 100000);

  const mailOptions = {
    from: `"Kill The Code" <${process.env.EMAIL}>`,
    to: email,
    subject: "Kill The Code Verification Code",
    template: "verificationCode",
    context: {
      code: code
    }  
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(500).json(error);
    } else {
      console.log(`Email sent: ${info.response}`);
      return res.status(200).json(code);
    }
  });
};

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require.main.require("./model/db_control");
var mysql = require("mysql");
var nodemailer = require("nodemailer");
var randomToken = require("random-token");
const { check, validationResult } = require("express-validator");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", function (req, res) {
  res.render("signup.ejs");
});

router.post(
  "/",
  [
    check("username").notEmpty().withMessage("Username is required"),
    check("password").notEmpty().withMessage("Password is required"),
    check("email").notEmpty().withMessage("Email required"),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var email_status = "not_verified";
    var email = req.body.email;
    var username = req.body.username;

    db.signup(
      req.body.username,
      req.body.email,
      req.body.password,
      email_status
    );
    var token = randomToken(8);
    db.verify(req.body.username, email, token);

    db.getuserid(email, function (err, result) {
      var id = result[0].id;
      var output =
        `<p>Dear ` +
        username +
        `,</P>
            <p> Thanks for sign up. Your verification ID and Token is given below: </p>
            <ul>
            <li>User ID: ` +
        id +
        `</li>
            <li>Token: ` +
        token`</li>
            </ul>
            <p>Verify link: <a href="http://localhost:3000/verify"></a></p>
            <p><b>This is automatically generated mail</b></p>

            `;
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "nandaskom53@gmail.com",
          pass: "Nandaskom123",
        },
      });
      var mailOptions = {
        from: "Hms@gamil.com",
        to: email,
        subject: "Email Verification",
        html: output,
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          return console.log(err);
        }
        console.log(info);
      });
      res.send("Check your email for token to verify");
    });
  }
);

module.exports = router;

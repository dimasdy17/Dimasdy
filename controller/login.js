var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require.main.require("./model/db_control");
var mysql = require("mysql");
var session = require("express-session");
var sweetalert = require("sweetalert2");
const { check, validationResult } = require("express-validator");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hospitalsm",
});

router.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post(
  "/",
  [
    check("username").notEmpty().withMessage("Username is required"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  function (request, response) {
    const errors = validationResult(request);
    if (!errors.isEmpty())
      return response.status(422).json({ errors: errors.array() });
    var email = request.body.email;
    var password = request.body.password;

    if (usename && password) {
      con.query(
        "select * from users where username = ? and password = ?",
        [username, password],
        function (error, result, fields) {
          if (result.length > 0) {
            request.session.loggedin = true;
            request.session.username = username;
            response.cookie("username", username);
            var status = results[0].email_status;
            if (status == "not_verified") {
              response.send("Please verify your email");
            } else {
              sweetalert.fire("loggerd in");
              response.redirect("/home");
            }
          }
        }
      );
    } else {
      response.send("Incorrect Username/Password");
    }
    response.end();
  }
);
module.exports = router;

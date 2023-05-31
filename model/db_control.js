var mysql = require("mysql");
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
const { Result } = require("express-validator");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hospitalsm",
});

con.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("You are connected to database");
  }
});
module.exports.signup = function (username, email, password, status, callback) {
  con.query(
    'SELECT email FROM users WHERE email = "' + email + '" ',
    function (err, result) {
      console.log(result[0]);
      if (result[0] == undefined) {
        var query =
          "INSERT INTO `users`(`username`, `email`, `password`, `email_status`) VALUES('" +
          username +
          "', '" +
          email +
          "', '" +
          password +
          "', '" +
          status +
          "')";
        con.query(query, callback);
        console.log(query);
      } else {
        console.log("error");
      }
    }
  );
};

module.exports.verify = function (username, email, token, callback) {
  var query =
    "insert into `verify` (`username`,`email`,`token`) values ('" +
    username +
    "','" +
    email +
    "','" +
    token +
    "')";
  con.query(query, callback);
};

module.exports.getuserid = function (email, callback) {
  var query = "select *from verify where email = '" + email + "' ";
  con.query(query, callback);
};

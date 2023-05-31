var express = require("express");
var session = require("express-session");
var cookie = require("cookie-parser");
var path = require("path");
var ejs = require("ejs");
var multer = require("multer");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
var expressValidator = require("express-validator");
var sweetalert = require("sweetalert2");
var bodyParser = require("body-parser");
const http = require("http");
var db = require("./model/db_control");
var signup = require("./controller/signup");
var login = require("./controller/login");

var app = express();

app.set("view engine", "ejs");
const server = http.createServer(app);

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookie());
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use("/signup", signup);
app.use("/login", login);

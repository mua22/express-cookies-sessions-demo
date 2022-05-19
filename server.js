var express = require("express");
var cookieParser = require("cookie-parser"); // module for parsing cookies
var app = express();
var session = require("express-session");
app.use(cookieParser());
app.use(session({ secret: "Shh, its a secret!" }));
app.get("/setcookie", function (req, res) {
  // setting cookies
  res.cookie("username", "john doe", { maxAge: 900000, httpOnly: true });
  return res.send("Cookie has been set");
});
app.get("/getcookie", function (req, res) {
  var username = req.cookies["username"];
  if (username) {
    return res.send(username);
  }
  return res.send("No cookie found");
});
app.get("/", function (req, res) {
  if (req.session.page_views) {
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
  } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time!");
  }
});
app.listen(3100);

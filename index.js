//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const ejs = require("ejs");
const { dir } = require("console");
const { dirname } = require("path");
const app = express();

var aud;
var tfile;
//app.set("view engine", "ejs");
var word_num = 1;
const defaultValue = 1;
var cnt = 0;
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/shabd", function (req, res) {
  if (req.body && req.body.word_num) {
    word_num = req.body.word_num;
    if (word_num < 1 || word_num > 120) {
      word_num = 1;
    }
  }
  cnt = 1;
  aud = "audios/file" + word_num + ".wav";
  tfile = "files/file" + word_num + ".txt";
  console.log(tfile);
  console.log(word_num);
  res.redirect("/shabd");
});

app.post("/", function (req, res) {
  // console.log("now post on home root ");
  res.redirect("/");
});

app.get("/", function (req, res) {
  res.render("index", {
    head: "",
    heading: "🌳 सिर सांटे रूंख रहे तो भी सस्तो जाण 🌳",
    filecontent: "निवण प्रणाम सा ",
    audi: "hey",
  });
});

app.get("/shabd", function (req, res) {
  if (cnt == 0) {
    word_num = 1;
    aud = "audios/file" + word_num + ".wav";
    tfile = "files/file" + word_num + ".txt";
  }
  fs.readFile(__dirname + "/" + tfile, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        head: "शब्द",
        heading: word_num,
        filecontent: data,
        audi: aud,
      });
    }
  });
});

app.listen(7000, function () {
  console.log("server is running  on port 7000");
});

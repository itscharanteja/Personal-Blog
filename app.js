const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const { post } = require("jquery");
var _ = require("lodash");
const posts = [
  { title: "day 1", body: "qwerty" },
  { title: "day 2", body: "asdfads" },
  { title: "day 3", body: "qwerwqeqsd" },
];

const homeStartingContent = "homeStartingContent";
const aboutContent = "aboutContent";
const contactContent = "contactContent";

const app = express();
 
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", {
    home: homeStartingContent,
    post: posts,
  });
});

app.get("/about", (req, res) => {
  res.render("about", { about: aboutContent });
});
app.get("/contact", (req, res) => {
  res.render("contact", { contact: contactContent });
});
app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  var post = { title: req.body.postTitle, body: req.body.postBody };
  posts.push(post);
  res.redirect("/");
});

app.get("/postName/:name", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.name);

  posts.forEach((e) => {
    const storedTitle = e.title;
    const requestedTitleBody = e.body;
    if (requestedTitle == _.lowerCase(storedTitle)) {
      res.render("post", { Title: requestedTitle, Body: requestedTitleBody });
    }
  });
});
app.listen(3000, () => {
  console.log("Server started at 3000");
});

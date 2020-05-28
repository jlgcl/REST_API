const { v4: uuidv4 } = require("./node_modules/uuid/dist");
const models = require("./models/index.js");
const routes = require("./routes");

// var createError = require("http-errors");
var express = require("express");
// import express from "express";
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");

var app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

/// --------------- REST Tutorial ----------------- ///

// app.get("/users", (req, res) => {
//   return res.send("GET HTTP method on user resource");
// });

// app.post("/users", (req, res) => {
//   return res.send("POST HTTP method on user resource");
// });

// app.put("/users/:userId", (req, res) => {
//   return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
// });

// app.delete("/users/:userId", (req, res) => {
//   return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
// });

/* MOVED TO ./models/index.js */
// let users = {
//   1: {
//     id: "1",
//     username: "Robin Wieruch",
//   },
//   2: {
//     id: "2",
//     username: "Dave Davids",
//   },
// };

// let messages = {
//   1: {
//     id: "1",
//     text: "Hello World",
//     userId: "1",
//   },
//   2: {
//     id: "2",
//     text: "By World",
//     userId: "2",
//   },
// };

/* MOVED TO ./ROUTES FILES */
// app.get("/session", (req, res) => {
//   return res.send(req.context.models.users[req.context.me.id]);
// });
// app.get("/users", (req, res) => {
//   return res.send(Object.values(req.context.models.users));
// });
// app.get("/users/:userId", (req, res) => {
//   return res.send(req.context.models.users[req.params.userId]);
// });

// app.get("/messages", (req, res) => {
//   return res.send(Object.values(req.context.models.messages));
// });
// app.get("/messages/:messageId", (req, res) => {
//   return res.send(req.context.models.messages[req.params.messageId]);
// });

//custom (application-wide) middleware - FOR REST RESOURCES (USERS, MESSAGES)
app.use((req, res, next) => {
  req.context = {
    models, //assigns models from ./models/index.js to the req.models (so that it can be used elsewhere such as req.models.messages)
    me: models.users[1], //set the first user (user[1]) as "req.me" - users are imported from ./routes/index.js
  };
  next();
});

//middleware to use routes (./routes folder) - able to use all the GET/POST functions in the respective routes.
app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

/* MOVED TO ./ROUTES FOLDER */
// app.post("/messages", (req, res) => {
//   const id = uuidv4();
//   const message = {
//     id,
//     text: req.body.text,
//     userId: req.context.me.id,
//   };

//   req.context.models.messages[id] = message;

//   return res.send(message);
// });

// app.delete("/messages/:messageId", (req, res) => {
//   const {
//     [req.params.messageId]: message,
//     ...otherMessages
//   } = req.context.models.messages;

//   req.context.models.message = otherMessages;

//   return res.send(message);
// });

/// ------------------- N/A -------------------///
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;

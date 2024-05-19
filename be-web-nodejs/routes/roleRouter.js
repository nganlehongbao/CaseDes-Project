const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var authenticate = require("../authenticate");
const Role = require("../models/role");
const RoleRouter = express.Router();
const cors = require("./cors");
RoleRouter.use(bodyParser.json());

//Create, Read, Delete => dish
RoleRouter.route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Role.find({})
      .then(
        (phonCaseDesigns) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(phonCaseDesigns);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .post(cors.corsWithOptions, (req, res, next) => {
    Role.create(req.body)
      .then(
        (dish) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dish);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /quizzes");
  })

  .delete(cors.corsWithOptions, (req, res, next) => {
    Role.deleteMany({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = RoleRouter;

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var authenticate = require("../authenticate");
const PhoneCaseDesigns = require("../models/phoneCaseDesigns");
const phoneCaseDesignRouter = express.Router();
const cors = require("./cors");
phoneCaseDesignRouter.use(bodyParser.json());

//Create, Read, Delete => dish
phoneCaseDesignRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    PhoneCaseDesigns.find({})
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
    PhoneCaseDesigns.create(req.body)
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
    PhoneCaseDesigns.deleteMany({})
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

// route("/basic-info")
phoneCaseDesignRouter
  .route("/basic-info")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    PhoneCaseDesigns.find({})
      .select("userId name description image phoneBrand phoneModel price")
      .sort({ createdAt: -1 })
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
  .put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on");
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end("post operation not supported on");
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end("delete operation not supported on");
  });

// route("/:phoneCaseDesignId")
phoneCaseDesignRouter
  .route("/:phoneCaseDesignId")
  .get((req, res, next) => {
    PhoneCaseDesigns.findById(req.params.phoneCaseDesignId)
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

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(
      "POST operation not supported on /design-phone-case/" +
        req.params.phoneCaseDesignId
    );
  })

  .put((req, res, next) => {
    PhoneCaseDesigns.findByIdAndUpdate(
      req.params.phoneCaseDesignId,
      {
        $set: req.body,
      },
      { new: true }
    )
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

  .delete((req, res, next) => {
    PhoneCaseDesigns.findByIdAndDelete(req.params.phoneCaseDesignId)
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

module.exports = phoneCaseDesignRouter;

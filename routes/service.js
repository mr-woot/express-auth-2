/**
 * Service routes.
 */
module.exports = ({ client, db, logger }) => {
  const express = require("express");
  const router = express.Router();
  const serviceController = require("../controllers/service.controller")();
  const { authenticate } = require("../middlewares")();
  const validate = require("express-validation");

  router
    .route("/service")
    .put(authenticate, (req, res, next) =>
      serviceController.updateServiceController(req, res, next, {
        logger,
        client,
        db
      })
    )
    .delete(authenticate, (req, res, next) =>
      serviceController.deleteServiceController(req, res, next, {
        logger,
        client,
        db
      })
    );

  return router;
};

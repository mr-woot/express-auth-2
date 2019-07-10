module.exports = ({ client, logger, db }) => {
  const express = require("express");
  const router = express.Router();
  const adminController = require("../controller/admin.controller")();

  router
    .route("/approve-email")
    .get((req, res, next) =>
      adminController.approveEmail(req, res, next, { client, logger, db })
    );

  return router;
};

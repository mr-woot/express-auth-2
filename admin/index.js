module.exports = (app, { client, logger, db }) => {
  const { isAdmin } = require("../middlewares/index")();
  /**
   * Admin Routes
   */
  app.use(
    "/api/v1/admin",
    isAdmin,
    require("./routes/admin.routes")({
      client,
      db,
      logger
    })
  );
};

module.exports = () => {
  const adminService = require("../service/admin.service")();

  const approveEmail = async (req, res, next, { logger }) => {
    try {
      const { userIdToUpdate } = req.body;
      const result = await adminService.approveEmail(userIdToUpdate);
      logger.info(`Email approved for user id: ${userIdToUpdate}`);
      res.send({
        status: 201,
        message: "User sahi se update ho gyi hai."
      });
    } catch (err) {
      next(err);
    }
  };

  return {
    approveEmail
  };
};

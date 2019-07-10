module.exports = () => {
  const serviceService = require("../services/service.service")();

  const updateServiceController = async (req, res, next, { logger }) => {
    try {
      const { serviceName } = req.body;
      const userId = req.user.id;
      const result = await serviceService.updateService(userId, serviceName);
      logger.info(`User service updated successfully of user id: ${userId}`);
      res.send({
        status: 201,
        message: "User ki service sahi se update ho gyi hai."
      });
    } catch (err) {
      next(err);
    }
  };

  const deleteServiceController = async (req, res, next, { logger }) => {
    try {
      const { serviceName } = req.body;
      const userId = req.user.id;
      const result = await serviceService.deleteService(userId, serviceName);
      logger.info(`Service deleted successfully of user id: ${userId}`);
      res.send({
        status: 201,
        message: "User ki service sahi se delete ho gyi hai."
      });
    } catch (err) {
      next(err);
    }
  };

  return {
    updateServiceController,
    deleteServiceController
  };
};

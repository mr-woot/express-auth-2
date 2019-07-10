module.exports = () => {
  const { User } = require("../models");
  const config = require("../config");
  const { SERVICES } = require("../models/enums");

  /**
   * Update service
   * @param {String} id User id
   * @param {String} serviceName Service name to update
   */
  const updateService = (id, serviceName) => {
    return new Promise(async (resolve, reject) => {
      try {
        let [user] = await User.find({
          _id: id
        });
        if (user) {
          if (!SERVICES[serviceName]) {
            return reject({ message: "Service name is invalid.", status: 429 });
          }
          if (user.services.includes(serviceName)) {
            return reject({
              message: "Service name already exists.",
              status: 429
            });
          }
          const services = [...user.services, serviceName];
          user = await user.updateOne({
            services
          });
          user.ok === 1
            ? resolve("User service updated successfully.")
            : resolve("User service updation failed.");
        } else {
          reject({ message: "User doesn't exists", status: 404 });
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  const deleteService = (id, serviceName) => {
    return new Promise(async (resolve, reject) => {
      try {
        let [user] = await User.find({
          _id: id
        });
        if (user) {
          if (!SERVICES[serviceName]) {
            return reject({ message: "Service name is invalid.", status: 429 });
          }
          if (!user.services.includes(serviceName)) {
            return reject({
              message: "Service name doesn't exists.",
              status: 429
            });
          }
          const services = user.services.filter(value => {
            return value !== serviceName;
          });
          user = await user.updateOne({
            services
          });
          user.ok === 1
            ? resolve("Service deleted successfully.")
            : resolve("Service deletion failed.");
        } else {
          reject({ message: "User doesn't exists", status: 404 });
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  return {
    updateService,
    deleteService
  };
};

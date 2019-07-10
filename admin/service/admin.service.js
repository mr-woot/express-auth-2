module.exports = () => {
  const { User } = require("../../models");
  const config = require("../../config");
  const { SERVICES } = require("../../models/enums");

  const approveEmail = id => {
    return new Promise(async (resolve, reject) => {
      try {
        let [user] = await User.find({
          _id: id
        });
        if (user) {
          if (user.emailVerified) {
            return reject({
              message: "Email already verified.",
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

  return {
    approveEmail
  };
};

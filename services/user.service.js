module.exports = () => {
  const models = require("../models");
  const authUtils = require("../utils/authUtils");

  /**
   * Create user service
   * @param {Object} payload
   */
  const createUser = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await models.User.create(payload);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Update user service
   * @param {String} id
   * @param {Object} payload
   */
  const updateUser = (id, payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let [user] = await models.User.find({
          _id: id
        });
        if (user) {
          let updatePayload = payload;
          if (payload.password) {
            let password = await authUtils.createPasswordHash(payload.password);
            updatePayload = { ...payload, password };
          }
          user = await user.updateOne(updatePayload);
          user.ok === 1
            ? resolve("User updated successfully.")
            : resolve("User updation failed.");
        } else {
          reject({ message: "User doesn't exists", status: 409 });
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Delete user service
   * @param {String} id
   */
  const deleteUser = id => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await models.User.findOneAndDelete({
          _id: id
        });
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Get user service
   * @param {String} id Optional
   */
  const getUsers = page => {
    return new Promise(async (resolve, reject) => {
      try {
        page = page < 0 ? 0 : page;
        let response = await models.User.paginate(
          {},
          {
            page,
            offset: page * 10,
            limit: 10,
            sort: {
              updatedAt: -1
            }
          }
        );
        const payload = {
          data: response.docs
        };
        payload.data = payload.data.map(item => {
          return {
            id: item._id,
            fullName: item.fullName,
            email: item.email,
            role: item.role,
            emailVerified: item.emailVerified,
            services: item.services,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
          };
        });
        resolve({
          ...payload,
          total: response.totalDocs,
          page: parseInt(page),
          offset: response.offset
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  return {
    createUser,
    deleteUser,
    updateUser,
    getUsers
  };
};

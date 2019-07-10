const Joi = require("joi");

module.exports = {
  userGet: {
    query: {
      page: Joi.number()
        .allow(0)
        .positive()
        .required()
        .error(() => "page should be a non-negative query param")
    }
  },
  userCreate: {
    body: {
      fullName: Joi.string()
        .trim()
        .regex(/^[a-zA-Z ]*$/)
        .required()
        .error(() => "Full name body params is required"),
      email: Joi.string()
        .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .required()
        .error(() => "Email body param is required"),
      password: Joi.string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,30}$/
        )
        .required()
        .error(
          () =>
            "Password body params is required with minlength 5 and maxlength 30, one special character, one number, one capital alphabet, one small alphabet"
        )
    }
  },
  userUpdate: {
    body: {
      fullName: Joi.string()
        .trim()
        .regex(/^[a-zA-Z ]*$/)
        .optional()
        .error(() => "Full name body params is required"),
      email: Joi.string()
        .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .required()
        .error(() => "Email body param is required")
    }
  },
  userChangePassword: {
    body: {
      oldPassword: Joi.string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,30}$/
        )
        .required()
        .error(
          () =>
            "Password body params is required with minlength 5 and maxlength 30, one special character, one number, one capital alphabet, one small alphabet"
        ),
      newPassword: Joi.string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,30}$/
        )
        .required()
        .error(
          () =>
            "Password body params is required with minlength 5 and maxlength 30, one special character, one number, one capital alphabet, one small alphabet"
        ),
      confirmNewPassword: Joi.any()
        .valid(Joi.ref("newPassword"))
        .required()
        .options({ language: { any: { allowOnly: "must match password" } } })
    }
  }
};

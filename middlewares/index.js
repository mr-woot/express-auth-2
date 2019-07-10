module.exports = () => {
  const jwt = require("jsonwebtoken");
  const config = require("../config");

  const isAdmin = async (req, res, next) => {
    // extract info from bearer jwt token
    // validate jwt and check if it containes roles array with one of the value as ADMIN
    if (req.headers["x-auth-key"]) {
      try {
        const decoded = await jwt.verify(
          req.headers["x-auth-key"],
          config["jwt_secret_key"]
        );
        if (decoded.role != "admin") {
          res.status(401).send({
            status: 401,
            error: {
              message: "Unauthorized access",
              statusCode: 401
            }
          });
        }
        req.user = decoded;
        next();
      } catch (error) {
        res.status(401).send({ status: 401, error });
      }
    } else {
      res.status(403).send({
        status: 403,
        error: {
          message: "Required x-auth-key token"
        }
      });
    }
    next();
  };

  const authenticate = async (req, res, next) => {
    if (req.headers["x-auth-key"]) {
      try {
        const decoded = await jwt.verify(
          req.headers["x-auth-key"],
          config["jwt_secret_key"]
        );
        req.user = decoded;
        next();
      } catch (error) {
        res.status(401).send({ status: 401, error });
      }
    } else {
      res.status(403).send({
        status: 403,
        error: {
          message: "Required x-auth-key token"
        }
      });
    }
  };
  return {
    authenticate,
    isAdmin
  };
};

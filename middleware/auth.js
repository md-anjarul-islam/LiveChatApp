const userHandler = require("../model/user");

module.exports = async function(req, res, next) {
  let token = req.headers.authtoken;
  let verifiedToken = await userHandler.verifyToken(token);
      
  if (!verifiedToken) res.status(401).json({ message: "Unauthorized Access!" });
  else {
      req.headers.user = verifiedToken;
      next();
  }
};
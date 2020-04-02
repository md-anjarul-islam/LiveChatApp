function validator(schema) {
    return function(req, res, next) {
      const { error, value } = schema.validate(req.body);
      if (error) {
        let errMessage = error.details[0].message;
        res.status(400).json({ message: errMessage });
      } else {
        next();
      }
    };
  }
  module.exports = validator;
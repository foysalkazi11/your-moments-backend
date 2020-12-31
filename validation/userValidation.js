const { body, validationResult } = require("express-validator");

exports.userValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0].msg;
    return res.status(400).json({ message: error });
  }
  next();
};

exports.validateName = body("username")
  .trim()
  .not()
  .isEmpty()
  .withMessage("username should not be empty")
  .isLength({
    min: 4
  })
  .withMessage("username should at least 4 characters long")
  .escape();
exports.validateEmail = body("email")
  .trim()
  .not()
  .isEmpty()
  .withMessage("email should not be empty")
  .isEmail()
  .withMessage("Enter valid email")
  .normalizeEmail()
  .withMessage("Enter valid email");
exports.validatePassword = body("password")
  .trim()
  .not()
  .isEmpty()
  .withMessage("password should not be empty")
  .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)
  .withMessage(
    "Password mast be minimum 6 characters long, at least one uppercase letter, one lowercase letter, one number and one special character (#?!@$%^&*-)"
  );

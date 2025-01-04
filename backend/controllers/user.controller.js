const UserService = require("../services/user.service.js");
const UserModel = require("../models/user.model");
const { validationResult } = require("express-validator");

module.exports.RegisterUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { firstname, lastname, email, password } = req.body;
  try {
    const user = await UserService.RegisterUser({
      firstname,
      lastname,
      email,
      password,
    });
    const token = await user.getSignedJwtToken();
    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports.LoginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) throw new Error("Invalid email or password");
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) throw new Error("Invalid email or password");
    const token = await user.getSignedJwtToken();
    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

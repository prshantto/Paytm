const UserModel = require("../models/user.model");

module.exports.RegisterUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  const hashedPassword = await UserModel.hashPassword(password);
  const userExists = await UserModel.findOne({ email });
  if (userExists) throw new Error("Email already exists");
  const user = await UserModel.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });
  return user;
};

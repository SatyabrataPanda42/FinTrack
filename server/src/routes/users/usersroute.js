const express = require("express");
const { registerUser, fetchAllUsers, loginUserController } = require("../../controllers/Users/usercontroler");

const userroute = express.Router();

userroute.post("/register", registerUser);
userroute.post("/login", loginUserController);
userroute.get("/", fetchAllUsers);

module.exports = userroute;

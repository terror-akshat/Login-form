const { register, login, getAllUser } = require("../controller/userController");

const routes = require("express").Router();

routes.post("/", register);
routes.post("/login", login);
routes.get("/allUsers/:id", getAllUser);

module.exports = routes;

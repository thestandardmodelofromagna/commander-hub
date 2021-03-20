/**
 * Express routes for user apis.
 * 
 * @summary List of all CRUD rest api endpoints.
 * 
 * @author Daniele Tentoni, Andrea Nicoletti, Federico Magnani.
 * @since 1.0.0
 */

const express = require("express");
const UserRouter = express.Router();

const { getUser, getUsers, addUser, putUser, deleteUser } = require('../controllers/userController');

UserRouter.route('/users').get((req, res, next) => {
  getUsers(req, res, next);
});

UserRouter.route("/user/:id").get((req, res, next) => {
  if (typeof req.params.id === "undefined") {
    return next({ description: "User id cannot be undefined in GET request" });
  }

  getUser(req.params.id, res, next);
});

UserRouter.route("/user").post((req, res, next) => {
  if (typeof req.body.id !== "undefined") {
    return next({ description: "User id cannot be defined in POST request" });
  }

  addUser(req.body.username, res, next);
});

UserRouter.route("/user/:id").put((req, res, next) => {
  if (typeof req.params.id === "undefined") {
    return next({ description: "User id cannot be undefined in GET request" });
  }

  putUser(req, res, next);
});

UserRouter.route("/user/:id").delete((req, res, next) => {
  if (typeof req.params.id === "undefined") {
    return next({ description: "User id cannot be undefined in GET request" });
  }

  deleteUser(req, res, next);
});

module.exports = UserRouter;
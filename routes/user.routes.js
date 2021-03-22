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

const { getUser, getUsers, addUser, putUser, deleteUser } = require('../controllers/user.controller');

/**
 * GET all user route.
 */
UserRouter.route('/users').get((req, res, next) => {
  getUsers(req, res, next);
});

/**
 * GET a user by id route.
 */
UserRouter.route("/user/:id").get((req, res, next) => {
  if (typeof req.params.id === "undefined") {
    return next({ description: "User id cannot be undefined in GET request" });
  }

  getUser(req, res, next);
});

/**
 * POST a new user route.
 * 
 * User id must be undefined, since it is created when the new user is added
 * to database instance.
 */
UserRouter.route("/user").post((req, res, next) => {
  if (typeof req.body.id !== "undefined") {
    return next({ description: "User id cannot be defined in POST request" });
  }

  addUser(req, res, next);
});

/**
 * PUT an updated user by id route.
 */
UserRouter.route("/user/:id").put((req, res, next) => {
  if (typeof req.params.id === "undefined") {
    return next({ description: "User id cannot be undefined in GET request" });
  }

  putUser(req, res, next);
});

/**
 * DELETE a user by id.
 */
UserRouter.route("/user/:id").delete((req, res, next) => {
  if (typeof req.params.id === "undefined") {
    return next({ description: "User id cannot be undefined in GET request" });
  }

  deleteUser(req, res, next);
});

module.exports = UserRouter;
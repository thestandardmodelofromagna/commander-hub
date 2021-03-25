/**
 * User model.
 * 
 * @summary User schema definition.
 * 
 * @author Daniele Tentoni, Andrea Nicoletti, Federico Magnani.
 * @since 1.0.0
 */

const UserModel = require('../models/user.model');

/**
 * Add a new user to database.
 * 
 * @param {Request} req Express request. Must contains the new user in his body.
 * @param {Response} res Express response.
 * @param {Callback} next Next operation callback.
 * @returns Next if error raised.
 */
const addUser = (req, res, next) => {
  if (typeof req.body.name !== "string") {
    return next({ description: "Invalid input type: name must be a string" });
  }

  const newUser = new UserModel({
    name: req.body.name
  });
  newUser.save((error) => {
    if (error) {
      return next(error);
    }

    res.status(200).json(newUser);
  });
};

/**
 * Return a specific user from database.
 * 
 * @param {Request} id Express request. Must contains the id to get in the params.
 * @param {Response} res Express response.
 * @param {*} next Next operation callback.
 */
const getUser = (req, res, next) => {
  if (typeof req.params.id !== "number") {
    return next({ description: "Invalid input type: id must be a number" });
  }

  UserModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    }

    res.status(200).json(data);
  });
};

/**
 * Return all users in database.
 * 
 * @param {Request} req Express request
 * @param {Response} res Express response
 * @param {Function} next Next function
 */
const getUsers = (req, res, next) => {
  UserModel.find((error, data) => {
    if (error) {
      return next(error);
    }

    res.status(200).json(data);
  });
}

/**
 * Update a user in the database by its id.
 * 
 * @param {Request} req Express Request. Must contains user id in its params.
 * @param {Response} res Express Response.
 * @param {Function} next Next callback.
 * @returns Next operation if errors raised, nothing otherwise.
 */
const putUser = (req, res, next) => {
  if (typeof req.params.id !== "number") {
    return next({ description: "Invalid input type: id must be a number" });
  }

  UserModel.findByIdAndUpdate(req.params.id, req.body, (error, user) => {
    if (error) {
      return next(error);
    }

    res.status(200).json(user);
  });
};

/**
 * Delete the given user. Can this action be taken by anyone?
 * 
 * @param {Request} req Express request
 * @param {Response} res Express response
 */
const deleteUser = (req, res, next) => {
  if (typeof req.params.id !== "number") {
    return next({ description: "Invalid input type: id must be a number" });
  }

  UserModel.findByIdAndDelete(req.params.id, (error, user) => {
    if (error) {
      return next(error);
    }

    res.status(200).json(user);
  });
};

module.exports = {
  getUser,
  getUsers,
  addUser,
  putUser,
  deleteUser
}
/**
 * User model.
 * 
 * @summary User schema definition.
 * 
 * @author Daniele Tentoni, Andrea Nicoletti, Federico Magnani.
 * @since 1.0.0
 */

const UserModel = require('../models/user');

const addUser = (name, res, next) => {
  if (typeof name !== "string") {
    return next({ description: "Invalid input type: name must be a string" });
  }

  const newUser = new UserModel({
    name
  });
  newUser.save((error) => {
    if (error) {
      return next(error);
    }

    res.status(200);
  });
};

const getUser = (id, res, next) => {
  UserModel.findById(id, (error, data) => {
    if (error) {
      return next(error);
    }

    res.status(200).json(data);
  });
};

/**
 * Return all users in database
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
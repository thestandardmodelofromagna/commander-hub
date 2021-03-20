/**
 * User model.
 * 
 * @summary User schema definition.
 * 
 * @author Daniele Tentoni, Andrea Nicoletti, Federico Magnani.
 * @since 1.0.0
 */

const UserModel = require('../models/user');

const addUser = (name, res) => {
  const newUser = new UserModel({
    name
  });
  newUser.save((error) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200);
    }
  });
};

const getUser = (id, res) => {
  UserModel.findById(id, (error, data) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(data);
    }
  });
};

/**
 * Return all users in database.
 */
const getUsers = (req, res) => {
  UserModel.find((error, data) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(data);
    }
  });
}

module.exports = {
  getUser,
  getUsers,
  addUser
}
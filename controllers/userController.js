/**
 * User model.
 * 
 * @summary User schema definition.
 * 
 * @author Daniele Tentoni, Andrea Nicoletti, Federico Magnani.
 * @since 1.0.0
 */

const userModel = require('../models/user');

const addUser = (name, res) => {
  const newUser = new userModel({
    name
  });
  newUser.save((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200);
    }
  });
};

const getUser = (id, res) => {
  userModel.findById(id, (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(data);
    }
  });
};

/**
 * Return all users in database.
 */
const getUsers = (req, res) => {
  userModel.find((error, data) => {
    if (error) {
      res.status(500).send(error);
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
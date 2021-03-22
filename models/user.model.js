/**
 * User model.
 * 
 * @summary User schema definition.
 * 
 * @author Daniele Tentoni, Andrea Nicoletti, Federico Magnani.
 * @since 1.0.0
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  }
}, {
  collection: 'users'
});

module.exports = mongoose.model('user', userSchema);
/**
 * Express routes for account apis.
 * 
 * @summary List of all account pages endpoints.
 * 
 * @author Daniele Tentoni.
 * @since 1.0.0
 */

const express = require("express");
const AccountRouter = express.Router();

AccountRouter.route('/login').get((req, res) => res.sendFile(`${__dirname}/public/account/login.html)`));
AccountRouter.route('/register').get((req, res) => res.sendFile(`${__dirname}/public/account/egister.html)`));
AccountRouter.route('/user').get((req, res) => res.sendFile(`${__dirname}/public/account/user.html)`));
AccountRouter.route('/logout').get((req, res) => res.sendFile(`${__dirname}/public/account/logout.html)`));

module.exports = AccountRouter;
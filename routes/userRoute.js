/**
 * Express routes for user apis.
 * 
 * @summary List of all CRUD rest api endpoints.
 * 
 * @author Daniele Tentoni, Andrea Nicoletti, Federico Magnani.
 * @since 1.0.0
 */

const { getUser, getUsers, addUser } = require('../controllers/userController');
module.exports = app => {
    app.route('/users').get((req, res) => {
        getUsers(req, res);
    }),
        app.route('/user/:id').get((req, res) => {
            getUser(req.params.id, res);
        }),
        app.route('/user').post((req, res) => {
            addUser(req.body.username, res);
        })
    // app.route('/card/:id').put(cardController.putCard);
    // app.route('/card/:id').delete(cardController.deleteCard);
}
/**
 * Express routes for card apis.
 * 
 * @summary List of all CRUD rest api endpoints.
 * 
 * @author Daniele Tentoni.
 * @since 1.0.0
 */

const getCards = require('../controllers/cardController');
module.exports = app => {
    app.route('/cards').get(getCards);
    // app.route('/card/:id').get(cardController.getCard);
    // app.route('/card').post(cardController.postCard);
    // app.route('/card/:id').put(cardController.putCard);
    // app.route('/card/:id').delete(cardController.deleteCard);
}
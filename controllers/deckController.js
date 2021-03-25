/**
 * User model.
 * 
 * @summary User schema definition.
 * 
 * @author Daniele Tentoni, Andrea Nicoletti, Federico Magnani.
 * @since 1.0.0
 */

const deckModel = require('../models/deck');

const addDeck = (userId, commIdList, partnerId, res) => {
    const newDeck = new deckModel({
        userId,
        commIdList,
        partnerId
    });
    newUser.save((error) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200);
        }
    });
};

/**
 * Return all decks of a given user.
 */
const getDecksByUser = (id, res) => {
    deckModel.find({ userId: id }, (error, data) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(data);
        }
    });
};

module.exports = {
    addDeck,
    getDecksByUser
}
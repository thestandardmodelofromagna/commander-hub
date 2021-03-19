/**
 * Main js script.
 * 
 * @summary Use this file to set the initial app configuration.
 * 
 * @author Andrea Nicoletti, Daniele Tentoni.
 * @since 1.0.0
 */

// Require api calls library.
const express = require('express');
const cardRoute = require('./routes/cardRoute');

// Create base entrypoint.
const app = express();
app.use(express.json());
cardRoute(app);

app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/public/index.html`);
});

//Serve static public folder
app.use(express.static('public'));

// Card endpoint moved to card route script.

const port = process.env.PORT || 22077;

app.listen(port, function () {
    console.log(`You are in ${process.env.NODE_ENV} environment.`);
    console.log(`Server ready to accept requests on http://localhost:${port}`);
});

// Setup a catch-all point.
app.get('*', (req, res) => res.status(404).send({
    message: 'Here there\'s nothing. 404?'
}));

// Error handler.
app.use(function (err, req, res, next) {
    console.error("Last error handler.");
    console.error(err.message);

    if (!err.statusCode)
        err.statusCode = 500;

    res.status(err.statusCode).send(err.message);
});

module.exports = app;
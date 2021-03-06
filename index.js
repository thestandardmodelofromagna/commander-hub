const express = require('express'); // Require api calls library.

let app = express(); // Create base entrypoint.

/*
 * GET: Get a resource from server.
 */
app.get('/', function (req, res) { // At <url>/
    // res.send('Hello World!'); // Client get Hello World string.
    res.sendFile(`${__dirname}/public/index.html`);
});

/*
 * GET: Given a name, fetch scryfall to get all cards named.
 * Use :name to access to request params.
 */
app.get('/card', function (req, res) {
    // Call py script.
    // Generate data.
    let name = req.query.name;
    let cards = {
        "cards": [name, "another", "another one"]
    };
    console.log("Called card with name: " + cards);
    // Send data.
    res.send(cards);
});

/*
 * POST: Create a resource from server.
 */
// app.post('/card')
/*
 * PUT: Update a resource from server.
 */
// app.put('/card')
/*
 * DELETE: Delete a resource from server.
 */
// app.delete('/card')

app.listen(8080, function() {
    console.log("I'm ready");
});

// Setup a catch-all point.
app.get('*', (req, res) => res.status(404).send({
    message: 'Here there\'s nothing. 404?'
}));

// Error handler.
app.use(function (err, req, res, next) {
    console.error("Last error handler.");
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

module.exports = app;
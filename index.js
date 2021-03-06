const express = require('express'); // Require api calls library.

let app = express(); // Create base entrypoint.

/*
 * GET: Get a resource from server.
 */
app.get('/', function (req, res) { // At <url>/
    res.send('Hello World!'); // Client get Hello World string.
});

/*
 * POST: Create a resource from server.
 */
/*
 * PUT: Update a resource from server.
 */
/*
 * DELETE: Delete a resource from server.
 */

app.listen(8080, function() {
    console.log("I'm ready");
});

// console.log("Hello World!");
// Require api calls library.
const express = require('express');
const { spawn } = require('child_process');

// Create base entrypoint.
let app = express();

app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/card', function (req, res) {
    let buffer;
    let pythonPath = `${__dirname}/python/mtgedhweb.py`;

    // Spawn new child process to call the python script.
    const python = spawn('python3', [pythonPath, req.query.name]);

    // Collect data from script.
    python.stdout.on('data', function (data) {
        buffer = data;
    });
    // In close event we are sure that stream from child process is closed.
    python.on('close', function (code) {
        res.send(buffer)
    });
});

app.listen(8080, function () {
    console.log("Server ready to accept requests");
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
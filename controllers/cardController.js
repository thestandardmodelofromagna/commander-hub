/**
 * Card controller.
 * 
 * @summary List of CRUD data logic.
 * 
 * @author Daniele Tentoni.
 * @since 1.0.0
 */

const { spawn } = require('child_process');

// TODO: Add database.
/**
 * Get from Python script a list of Scryfall cards.
 * 
 * @param {request} req express reques.
 * @param {response} res express response.
 */
module.exports = (req, res) => {
    const pythonPath = `./python/mtgedhweb.py`;

    // Spawn new child process to call the python script.
    const python = spawn('python3', [pythonPath, req.query.name]);

    let buffer;

    // Collect data from script.
    python.stdout.on('data', data => {
        buffer = data;
    });

    // Re-log errors from python script.
    python.stderr.on('data', data => {
        console.error("Error from python: ", data.toString());
    })

    // In close event we are sure that stream from child process is closed.
    python.on('close', code => {
        console.log(`Result code: ${pythonPath} ${req.query.name} ${code}`);
        res.send(buffer);
    });
};
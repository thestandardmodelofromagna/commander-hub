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
const { urlencoded, json } = require('body-parser');
const path = require('path');
const cardRoute = require('./routes/cardRoute');

/*
 * Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
 * https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
 */
const helmet = require('helmet');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(() => {
    console.log("Database connected");
  }, (error) => {
    console.log("Database connection error ", error);
  });

// Create base entrypoint.
const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
// app.use(helmet());
cardRoute(app);

const userApi = require('./routes/user.routes');
app.use("/api", userApi);

// Account routes will be available at /account/...
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Card endpoint moved to card route script.

const port = process.env.PORT || 8080;

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
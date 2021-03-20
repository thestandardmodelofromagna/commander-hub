# Commander-hub

Use this tool to store your Commander decks!

App published to Heroku at .

### Javascript dependencies

Use `npm install` to install all js packages.

### Python dependencies

Use `pip install -r requirements.txt` to install all python packages. This is necessary since Heroku dosen't install all python packages with default commands. If you have to install a new python package, append it to requirements.txt file and re-run that install command. This should work.

You need all both dependencies installed to run locally the project.

Check you have installed `python` on your system. If you have `python3` installed and not python, spawn wouldn't found binaries to run python scripts.

## Run project

### Locally

Require the access to MongoDB instance on discord or configure your own on your machine. Set accordly the environment variable `MONGODB_URI="put your url here"`.

To start locally the project, run `npm run start_locally`.

### Production

Production environment is set to Heroku, the deploy is done automatically when a pull_request is merged to main branch.

Use `node index.js` or `npm run start` to run server.
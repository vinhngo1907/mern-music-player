const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const morgan = require('morgan');
const debug = require('debug');

const info = debug('server:app:info');
const error = debug('server:app:error');
const database = require("./lib/Database");
const routes = require("./app");

const app = express();
const server = http.createServer(app);
app.disable('x-powered-by');

// Connect DB
database.init().then(() => info('Connected to database')).catch(err => error(err));

// middlewares
const env = app.get('env');

app.use(express.json())
app.use(express.static('public'));
app.use(bodyParser());
app.use(cors());

// routes
routes(app);

process.on('uncaughtException', (err) => {
	error('crashed!!! - ' + (err.stack || err));
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

/* eslint-disable linebreak-style */
/*
const express = require('express');
const routes = require('./routes');
*/
// eslint-disable-next-line linebreak-style
// If you install the dependence sucrase and nodemon, you can change the syntax of module importantion
import 'dotenv/config';
import express from 'express';
import routes from './routes';

import './database';

class App {
	constructor() {
		this.server = express();
		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.server.use(express.json());
	}

	routes() {
		this.server.use(routes);
	}
}

// module.exports = new App().server;
// If you install the dependence sucrase and nodemon, you can change the syntax of module exportation
export default new App().server;

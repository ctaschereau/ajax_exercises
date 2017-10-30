'use strict';
const path = require('path');
const _ = require('underscore');
const express = require('express');
const cons = require('consolidate');
const bodyParser = require('body-parser');

const randomFail = require('./middlewares/randomFail');
const paintingRoutes = require('./api/routes/paintingRoute');
const personRoutes = require('./api/routes/personRoutes');

let app = express();
let port = process.env.PORT || 3000;

// Setup basic template engine
app.engine('html', cons.underscore);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'public'));
_.templateSettings = {
	evaluate : /<<%([\s\S]+?)%>>/g,
	interpolate : /<<%=([\s\S]+?)%>>/g,
	escape : /<<%-([\s\S]+?)%>>/g
};

// parse application/json and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup middlewares
app.use(randomFail);

paintingRoutes(app);
personRoutes(app);

app.get('/', (req, res) => {
	res.render('index');
});

// Error handling
app.use((err, req, res, next) => {
	console.error(err.stack);
	if (req.xhr) {
		res.status(500).send({ error: err.message })
	} else {
		res.render('error', { error: err.message })
	}
});

app.listen(port);

console.log('AJAX exercises server started on: ' + port);
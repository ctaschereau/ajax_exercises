const path = require('path');
const express = require('express');

let app = express();
let port = process.env.PORT || 3000;

const paintingRoutes = require('./api/routes/paintingRoute');
paintingRoutes(app);

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(port);

console.log('AJAX exercises server started on: ' + port);
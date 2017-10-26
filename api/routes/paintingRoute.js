'use strict';
module.exports = (app) => {
	let paintingController = require('../controllers/paintingController');

	app.route('/painting')
		.get(paintingController.get_painting_metadata);


	app.route('/painting/:paintingPartID')
		.get(paintingController.get_painting_part);
};
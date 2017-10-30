'use strict';
module.exports = (app) => {
	let personController = require('../controllers/personController');

	app.route('/person').put(personController.add_person);

	app.route('/person/:personID').post(personController.modify_person);

	app.route('/person/:personID').delete(personController.delete_person);
};
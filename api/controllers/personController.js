'use strict';
const _ = require('underscore');
const personModel = require('../models/personModel');



exports.add_person = (req, res, next) => {
	let person = new personModel(req.body.firstName, req.body.lastName);
	person.save((err) => {
		if (err) {
			next(err);
			return;
		}
		res.json({
			id : person.id
		});
	});
};

exports.modify_person = (req, res, next) => {
	let personID = Number(req.params.personID);
	if (_.isNaN(personID)) {
		next(new Error(`Expected first parameter to be a number but got : ${req.params.personID}`));
		return;
	}

	personModel.find(personID, (err, person) => {
		person.firstName = req.body.firstName;
		person.lastName = req.body.lastName;
		person.save((err) => {
			if (err) {
				next(err);
				return;
			}
			res.json({});
		});
	});
};

exports.delete_person = (req, res, next) => {
	let personID = Number(req.params.personID);
	if (_.isNaN(personID)) {
		next(new Error(`Expected first parameter to be a number but got : ${req.params.personID}`));
		return;
	}
	res.json({});
};

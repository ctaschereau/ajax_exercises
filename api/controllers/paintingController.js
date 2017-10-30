'use strict';
const _ = require('underscore');
const paintingModel = require('../models/paintingModel');

let painting = new paintingModel();

exports.get_painting_metadata = (req, res, next) => {
	painting.getMetadata((err, metadata) => {
		if (err) {
			next(err);
			return;
		}
		res.json(metadata);
	});
};


exports.get_painting_part = (req, res, next) => {
	let paintingID = Number(req.params.paintingID);
	if (_.isNaN(paintingID)) {
		next(new Error(`Expected first parameter to be a number but got : ${req.params.paintingID}`));
		return;
	}
	let paintingPartID = Number(req.params.paintingPartID);
	if (_.isNaN(paintingPartID)) {
		next(new Error(`Expected second parameter to be a number but got : ${req.params.paintingPartID}`));
		return;
	}
	painting.getPart(paintingID, paintingPartID, (err, paintPart) => {
		if (err) {
			next(err);
			return;
		}
		res.send(paintPart);
	});
};


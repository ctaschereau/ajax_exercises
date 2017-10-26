'use strict';
const paintingModel = require('../models/paintingModel');

let painting = new paintingModel();

exports.get_painting_metadata = (req, res) => {
	painting.getMetadata((err, metadata) => {
		if (err) {
			res.send(err);
			return;
		}
		res.json(metadata);
	});
};


exports.get_painting_part = (req, res) => {
	painting.getPart(req.params.paintingPartID, (err, paintPart) => {
		if (err) {
			res.send(err);
			return;
		}
		res.send(paintPart);
	});
};


const os = require('os');
const _ = require('underscore');
const path = require('path');
const fs = require('fs');

// Intentionally NOT performance oriented!!

class paintingModel {

	getMetadata(callback) {
		let paintingID = Math.floor(Math.random() * 3);
		let paintingFilename = `painting${paintingID}.txt`;
		this._getDataLinesFromPainting(paintingID, (err, dataLines) => {
			if (err) {
				callback(err);
				return;
			}
			callback(null, {
				paintingID : paintingID,
				paintingName : paintingFilename,
				lineLength : dataLines[0].length,
				nbLines : dataLines.length
			});
		});
	}

	getPart(paintingID, partID, callback) {
		paintingID = Number(paintingID);
		partID = Number(partID);
		this._getDataLinesFromPainting(paintingID, (err, dataLines) => {
			if (err) {
				callback(err);
				return;
			}
			if (!dataLines[partID]) {
				callback(new Error(`The paiting part with ID ${partID} does not exist!`));
				return;
			}
			let dataToSend = dataLines[partID];
			_.times(3, (idx) => {
				if (dataLines[partID + idx]) {
					dataToSend = dataToSend + '\n' + dataLines[partID + idx];
				}
			});
			callback(null, dataToSend);
		});
	}

	_getDataLinesFromPainting(paintingID, callback) {
		let paintingFilename = `painting${paintingID}.txt`;
		fs.readFile(path.join('resources', paintingFilename), 'utf8', (err, data) => {
			if (err) {
				callback(err);
				return;
			}
			let dataLines = data.split(os.EOL);
			callback(null, dataLines);
		});
	}

}

module.exports = paintingModel;
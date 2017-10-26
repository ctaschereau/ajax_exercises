const os = require('os');
const path = require('path');
const fs = require('fs');

let paintingFilename = `painting${Math.floor(Math.random() * 3)}.txt`;


// Intentionally NOT performance oriented!!

class paintingModel {

	getMetadata(callback) {
		this._getDataLinesFromPainting((err, dataLines) => {
			if (err) {
				callback(err);
				return;
			}
			callback(null, {
				paintingName : paintingFilename,
				lineLength : dataLines[0].length,
				nbLines : dataLines.length
			});
		});
	}

	getPart(partID, callback) {
		this._getDataLinesFromPainting((err, dataLines) => {
			if (err) {
				callback(err);
				return;
			}
			if (!dataLines[partID]) {
				callback(new Error(`The paiting part with ID ${partID} does not exist!`));
				return;
			}
			callback(null, dataLines[partID]);
		});
	}

	_getDataLinesFromPainting(callback) {
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
const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
	fs.readFile(path, 'utf8', function(err, data) {
		if (err) {
			console.log(err);
			process.exit(1);
		}
		console.log(data);
	});
}

async function webCat(URL) {
	try {
		let res = await axios.get(URL);
		console.log(res.data);
	} catch (err) {
		console.log(`Error Fetching ${URL}`);
		console.log(`${err}`);
		process.exit(1);
	}
}

let path = process.argv[2];

if (path.includes('.txt')) {
	cat(path);
}
else {
	webCat(path);
}

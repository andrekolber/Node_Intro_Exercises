const fs = require('fs');
const process = require('process');
const axios = require('axios');

function handleOutput(text, out) {
	if (out) {
		fs.writeFile(out, text, 'utf8', function(err) {
			if (err) {
				console.log(`Could not write ${out}: ${err}`);
				process.exit(1);
			}
		});
	}
	else {
		console.log(text);
	}
}

function cat(path, out) {
	fs.readFile(path, 'utf8', function(err, data) {
		if (err) {
			console.log(`Error reading ${path}: ${err}`);
			process.exit(1);
		}
		handleOutput(data, out);
		console.log(`No output, but ${out} contains contents of ${path}`);
	});
}

async function webCat(URL, out) {
	try {
		let res = await axios.get(URL);
		handleOutput(res.data, out);
		console.log(`No output, but ${out} contains ${URL}'s data`);
	} catch (err) {
		console.log(`Error Fetching ${URL}`);
		console.log(err);
		process.exit(1);
	}
}

let path;
let out;

if (process.argv[2] === '--out') {
	out = process.argv[3];
	path = process.argv[4];
}
else {
	path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
	webCat(path, out);
}
else {
	cat(path, out);
}

const fs = require('fs');

const search = (result) => {
	result.forEach((el) => {
		fs.appendFileSync(path + '/output/url001.csv', el + "\n");
	});
}

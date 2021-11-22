const { browser } = require('./browser');
const { main } = require('./main');

global.path = __dirname + "/..";

(async () => {
	//Start the browser and create a browser instance
	const instance = await browser();
	
	// Pass the browser instance to the scraper controller
	await main(instance);
})();
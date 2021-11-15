const { browser } = require('./browser');
const { scrape } = require('./controller');

(async () => {
	//Start the browser and create a browser instance
	const instance = await browser();
	
	// Pass the browser instance to the scraper controller
	await scrape(instance);
})();
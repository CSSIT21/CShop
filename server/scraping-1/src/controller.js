const scraper = require('./scraper');

const scrape = async (browser) => {
	await scraper.scraper(browser);
};

module.exports = { scrape };
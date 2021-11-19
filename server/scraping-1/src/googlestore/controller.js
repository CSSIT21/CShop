const scraper = require('./scraper_newsection');

const scrape = async (browser) => {
	return scraper.scraper(browser);
};

module.exports = { scrape };
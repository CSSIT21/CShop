const autoScroll = require('../utils/autoScroll');
const { detail } = require('./detail_scraper');

const search = async (browser, url) => {
	// Initialize page
	const page = await browser.newPage();
	await page.goto(url);
	await page.waitForSelector('.container');
	
	// Scroll to the end of page for loading all results.
	await autoScroll(page);
	
	// Extract search result anchor elements.
	const items = await page.$$eval('.shopee-search-item-result__item > a', (elems) => {
		// Extract the product name from the data
		elems = elems.map((el) => {
			return el.href;
		});
		
		return elems;
	});
	
	// Close the page
	await page.close();
	
	const details = [];
	for (const item of items) {
		details.push(await detail(browser, item));
	}
	// Return
	return details;
};

module.exports = { search };
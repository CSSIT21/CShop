const fs = require('fs');
const { search } = require('./search_scraper');
const { detail } = require('./detail_scraper');
const searchArray = require('./search_array');

const scrape = async (browser) => {
	const { searchResultComputer } = await searchArray(browser);
	// console.log(searchResultComputer);
	// const detailResult = await detail(browser, "https://shopee.co.th/Microsoft-Surface-Pro-7-Laptop-with-Type-Cover-(%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9F%E0%B8%A3%E0%B8%B5-Galaxy-Earbud-Live-%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B8%84%E0%B9%88%E0%B8%B2-6-990-%E0%B8%9A%E0%B8%B2%E0%B8%97)-i.151635150.6206625238?sp_atk=7a77f306-1fcf-4ce7-b4a0-786b2e460228")
};

module.exports = { scrape };
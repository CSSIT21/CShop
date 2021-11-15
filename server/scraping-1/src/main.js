const { scrape: scrapeGoogleStore } = require('./googlestore/controller');
const { scrape: scrapeShopee } = require('./shopee/controller');

const main = async (browser) => {
	// * For demonstration purpose
	// const resultGoogleStore = await scrapeGoogleStore(browser);
	// console.log(resultGoogleStore);
	
	const resultShopee = await scrapeShopee(browser, "Google Nest");
	
};

module.exports = { main };
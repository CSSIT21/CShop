const puppeteer = require('puppeteer');

const browser = async () => {
	return new Promise((resolve, reject) => {
		puppeteer.launch({
			headless: false,
			args: ['--disable-setuid-sandbox'],
			ignoreHTTPSErrors: true,
		}).then((browser) => {
			resolve(browser);
		}).catch((err) => {
			reject(err);
		});
	});
};

module.exports = {
	browser,
};
const puppeteer = require('puppeteer');

const browser = async () => {
	return new Promise((resolve, reject) => {
		puppeteer.launch({
			headless: !Boolean(process.env.NOHEADLESS),
			args: ['--disable-setuid-sandbox --lang=en-US,en'],
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
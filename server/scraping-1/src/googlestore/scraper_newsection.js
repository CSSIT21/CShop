const url = 'https://store.google.com/us?hl=en-US';

const scraper = async (browser) => {
	// New page
	const page = await browser.newPage();
	
	// Navigate to the URL
	await page.goto(url);
	
	// Wait for the required DOM to be rendered
	await page.waitForSelector('#yDmH0d');
	
	// Get the link to all the required books
	return await page.$$eval('.mqn2-ip4', (elems) => {
		// Extract the product name from the data
		elems = elems.map((el) => ({
			title: el.querySelector('.mqn2-ip6 > .mqn2-ip7').textContent
		}));
		
		return elems;
	});
};

module.exports = {
	url,
	scraper,
};
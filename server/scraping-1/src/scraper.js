const url = 'https://store.google.com/us?hl=en-US';

const scraper = async (browser) => {
	// New page
	const page = await browser.newPage();
	
	// Navigate to the URL
	console.log(`[NAV] ${url}...`);
	await page.goto(url);
	
	// Wait for the required DOM to be rendered
	await page.waitForSelector('#yDmH0d');
	
	// Get the link to all the required books
	let urls = await page.$$eval('.mqn2-ip4', (links) => {
		// Make sure the book to be scraped is in stock
		// links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
		
		// Extract the links from the data
		links = links.map((el) => el.querySelector('.mqn2-ip6 > .mqn2-ip7').textContent);
		return links;
	});
	
	console.log(urls);
};

module.exports = {
	url,
	scraper,
};
const autoScroll = require('../utils/autoScroll');

const detail = async (browser, url) => {
	// Initialize page
	const page = await browser.newPage();
	await page.goto(url);
	await page.waitForSelector('.container');
	
	// Scroll to the end of page for loading all results.
	await autoScroll(page);
	
	// Title extraction
	const title = await page.$$eval('.attM6y', (elems) => {
		return elems[0].querySelector('span').textContent;
	});
	
	// Price extraction
	const [price, priceRange] = await page.$$eval('.Ybrg9j', (elems) => {
		const text = elems[0].textContent;
		return [parseInt(text.split(' ')[0].substring(1).replace(/,/g, '')), text]; // Split base price in case of price be a range.
	});
	
	// Description extraction
	const description = await page.$$eval('._3yZnxJ', (elems) => {
		return elems[0].querySelector('span').textContent;
	});
	
	// Quantity extraction
	const quantity = await page.$$eval('._90fTvx', (elems) => {
		const text = elems[0].querySelector('.flex > div:last-child').textContent;
		const matches = text.match(/\d+/g);
		return parseInt(matches[0]);
	});
	
	// Sold extraction
	const sold = await page.$$eval('.aca9MM', (elems) => {
		return parseInt(elems[0].textContent);
	});
	
	// Rating extraction
	const [ratingValue, ratingCount] = await page.$$eval('.OitLRu', (elems) => {
		return [parseInt(elems[0]?.textContent) || 0, parseInt(elems[1]?.textContent || 0)];
	});
	
	// Images extraction
	const images = [];
	
	const imgThumbnails = await page.$$('._3-_YTZ');
	await imgThumbnails[0].click();
	await imgThumbnails[0].click();
	
	await page.waitForSelector('._3-_YTZ._2fdy4G');
	const imgSelectors = await page.$$('._3-_YTZ._2fdy4G');
	
	for (let img of imgSelectors) {
		await img.click();
		try {
			await page.waitForSelector('._1PrnIh._2GchKS', { timeout: 100 });
		} catch (e) {
			continue;
		}
		const image = await page.evaluate(() => document.querySelector('._1PrnIh._2GchKS')?.style.backgroundImage);
		image && images.push(image.substring(5, image.length - 2));
	}
	
	// Options extraction
	const options = await page.$$eval('._2XdAdB .items-center:not(:last-child)', (elems) => {
		return elems.map((el) => {
			const option = el.querySelector('._2IW_UG').textContent;
			const choices = [...el.querySelectorAll('.product-variation')].map((el) => el.textContent);
			return { option, choices };
		});
	});
	
	// Close the page
	// await page.close();
	
	// Return
	return {
		title,
		price,
		priceRange,
		description,
		quantity,
		sold,
		ratingValue,
		ratingCount,
		images,
		options,
	};
};

module.exports = { detail };
const autoScroll = require('../utils/autoScroll');

const detail = async (browser, url) => {
	// Initialize page
	const page = await browser.newPage();
	try {
		await page.goto(url);
		await page.waitForSelector('.container');
	} catch (e) {
		return null;
	}
	
	// Scroll to the end of page for loading all results.
	await autoScroll(page);
	
	try {
		// Images extraction
		const images = [];
		
		await page.waitForSelector('._3-_YTZ', { timeout: 30000 });
		const imgThumbnails = await page.$$('._3-_YTZ');
		await imgThumbnails[0].click();
		await imgThumbnails[0].click();
		
		await page.waitForSelector('._3-_YTZ._2fdy4G', { timeout: 40000 });
		const imgSelectors = await page.$$('._3-_YTZ._2fdy4G');
		
		for (let img of imgSelectors) {
			await img.click();
			try {
				await page.waitForSelector('._1PrnIh._2GchKS', { timeout: 1000 });
			} catch (e) {
				continue;
			}
			const image = await page.evaluate(() => document.querySelector('._1PrnIh._2GchKS')?.style.backgroundImage);
			image && images.push(image.substring(5, image.length - 2));
		}
		
		// Title extraction
		await page.waitForSelector('.attM6y', { timeout: 1000 });
		const title = await page.$$eval('.attM6y', (elems) => {
			return elems[0].querySelector('span').textContent;
		});
		
		// Price extraction
		await page.waitForSelector('.Ybrg9j', { timeout: 1000 });
		const [price, priceRange] = await page.$$eval('.Ybrg9j', (elems) => {
			const text = elems[0].textContent;
			return [parseInt(text.split(' ')[0].substring(1).replace(/,/g, '')), text]; // Split base price in case of price be a range.
		});
		
		// Description extraction
		await page.waitForSelector('._3yZnxJ', { timeout: 1000 });
		const description = await page.$$eval('._3yZnxJ', (elems) => {
			return elems[0].querySelector('span').textContent;
		});
		
		// Quantity extraction
		await page.waitForSelector('._90fTvx', { timeout: 1000 });
		const quantity = await page.$$eval('._90fTvx', (elems) => {
			const text = elems[0].querySelector('.flex > div:last-child').textContent;
			const matches = text.match(/\d+/g);
			return parseInt(matches[0]);
		});
		
		// Sold extraction
		await page.waitForSelector('.aca9MM', { timeout: 1000 });
		const sold = await page.$$eval('.aca9MM', (elems) => {
			return parseInt(elems[0].textContent);
		});
		
		// Rating extraction
		await page.waitForSelector('.OitLRu', { timeout: 1000 });
		const [ratingValue, ratingCount] = await page.$$eval('.OitLRu', (elems) => {
			return [parseInt(elems[0]?.textContent) || 0, parseInt(elems[1]?.textContent || 0)];
		});
		
		// Options extraction
		const options = await page.$$eval('._2XdAdB .items-center:not(:last-child)', (elems) => {
			return elems.map((el) => {
				const option = el.querySelector('._2IW_UG').textContent;
				const choices = [...el.querySelectorAll('.product-variation')].map((el) => el.textContent);
				return { option, choices };
			});
		});
		
		// Subcategories extraction
		await page.waitForSelector('._3wdEZ5 ._3QRNmL', { timeout: 1000 });
		const subcategories = await page.$$eval('._3wdEZ5 ._3QRNmL:not(:first-child)', (elems) => {
			return elems.map((el) => {
				return el.textContent;
			});
		});
		
		// Reviews extraction
		const reviews = [];
		
		await page.waitForSelector('.product-ratings', { timeout: 1000 });
		const reviewNoData = await page.$$('.product-ratings-comments-view__no-data');
		if (reviewNoData.length === 0) {
			reviews.push(
				...await page.$$eval('.shopee-product-rating', (elems) => {
					return elems.map((el) => {
						const content = el.querySelector('.shopee-product-rating__content').textContent;
						const star = [...el.querySelectorAll('.icon-rating-solid--active')].length;
						const images = [...el.querySelectorAll('.rating-media-list__image-wrapper')].map((em) => {
							const imgElem = em.querySelector('.shopee-rating-media-list-image__content');
							const imgBackground = imgElem.style.backgroundImage;
							return imgBackground.substring(5, imgBackground.length - 2);
						});
						return { content, star, images };
					});
				}),
			);
		}
		
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
			options,
			subcategories,
			images,
			reviews,
		};
	} catch (e) {
		console.error(e);
		return null;
	} finally {
		// Close the page
		await page.close();
	}
};

module.exports = { detail };
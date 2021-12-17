const autoScroll = async (page) => {
	await page.evaluate(async () => {
		await new Promise((resolve, reject) => {
			let totalHeight = 0;
			let distance = 100;
			let timer = setInterval(() => {
				const scrollHeight = document.body.scrollHeight;
				window.scrollBy(0, distance);
				totalHeight += distance;
				
				if (totalHeight >= scrollHeight) {
					clearInterval(timer);
					resolve();
				}
			}, 50);
		});
	});
};

module.exports =  autoScroll;
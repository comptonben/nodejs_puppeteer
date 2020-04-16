const puppeteer = require('puppeteer-core');

(async () => {
	const browser = await puppeteer.launch({defaultViewport: {height: 1080, width: 1920}, headless: true, args: ['--display=:1', '--no-sandbox', '--disable-extensions'], executablePath: '/usr/bin/chromium-browser'});
	const page = await browser.newPage();
	await page.goto('http://callisto:8080/dunkin_guest.html', {waitUntil: 'networkidle0'});
	await page.screenshot({path: 'before.png', fullpage: true});

	const form = await page.$('form');
	if(!(form==null)) {
		await Promise.all([
			page.waitForNavigation({waitUntil: 'networkidle0'}),
			page.click(form)
		]);
	} else {
		await Promise.all([
			page.waitForNavigation({waitUntil: 'networkidle0'}),
			page.$eval('a[id="continue_link"]', link => link.click({delay: 100}))
		]);
	}
	
	await page.waitForNavigation({waitUntil: 'networkidle0'});
	await page.screenshot({path: 'after.png', fullpage: true});
	await browser.close();
})();

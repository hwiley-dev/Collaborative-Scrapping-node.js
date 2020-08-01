/*  |*!*!*!*!*!*!*!*| BLUEGRASS |*!*!*!*!*!*!*!*|
    |*!*!*!*!*!*!*!*| BLUEGRASS |*!*!*!*!*!*!*!*|
*/


'use strict';

const puppeteer = require('puppeteer');

(async function main() {
  try {
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();

    await page.goto('https://www.google.com/search?q=intitle%3Abluegrass+intext%3A+sponsors&oq=intitle%3Abluegrass+intext%3A+sponsors&aqs=chrome..69i57j69i58.14144j0j7&sourceid=chrome&ie=UTF-8');

    // way 1
    const hrefs1 = await page.evaluate(
      () => Array.from(
        document.querySelectorAll('a[href]'),
        a => a.getAttribute('href')
      )
    );

    // way 2
    const elementHandles = await page.$$('a');
    const propertyJsHandles = await Promise.all(
      elementHandles.map(handle => handle.getProperty('href'))
    );
    const hrefs2 = await Promise.all(
      propertyJsHandles.map(handle => handle.jsonValue())
    );

    console.log(hrefs1, hrefs2);

    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();


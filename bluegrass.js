/*  |*!*!*!*!*!*!*!*| BLUEGRASS |*!*!*!*!*!*!*!*|
    |*!*!*!*!*!*!*!*| BLUEGRASS |*!*!*!*!*!*!*!*|
*/


'use strict';

const puppeteer = require('puppeteer');

(async function main() {
  try {
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();

    await page.goto('https://www.google.com/search?sxsrf=ALeKk01K7urXdNmUnEWzSTc8dczsCu4hTQ%3A1596256646014&ei=hvEkX_s4pMHuAqrBnYAL&q=%28+bluegrass+OR+americana+OR+folk%29+%22sponsors%22+&oq=%28+bluegrass+OR+americana+OR+folk%29+%22sponsors%22+&gs_lcp=CgZwc3ktYWIQAzIFCCEQqwI6BAgjECc6BQgAEJECOgcIABCxAxBDOgsILhCxAxDHARCjAjoICC4QsQMQgwE6BQgAELEDOggILhDHARCjAjoECAAQQzoKCAAQsQMQsQMQQzoICAAQsQMQgwE6BwgAEBQQhwI6CggAELEDEBQQhwI6DgguELEDEIMBEMcBEKMCOggILhDHARCvAToFCC4QsQM6AggAOg4ILhCxAxCDARDHARCvAToCCC46BggAEBYQHjoECC4QDToICAAQCBANEB46BQghEKABOgUIABDNAjoECCEQClD0qQJY64nHA2DSlccDaApwAHgAgAH0AYgB3zqSAQc0Ny4yNC4zmAEAoAEBqgEHZ3dzLXdpesABAQ&sclient=psy-ab&ved=0ahUKEwj7k-yyl_nqAhWkoFsKHapgB7AQ4dUDCAw&uact=5');

    // // way 1
    // const hrefs1 = await page.evaluate(
    //   () => Array.from(
    //     document.querySelectorAll('div > .r > a[href]'),
    //     a => a.getAttribute('href')
    //   )
    // );

    // way 2
    const elementHandles = await page.$$('a');
    const propertyJsHandles = await Promise.all(
      elementHandles.map(handle => handle.getProperty('href'))
    );
    const hrefs2 = await Promise.all(
      propertyJsHandles.map(handle => handle.jsonValue())
    );

    // console.log("---------------------------------- \n ---------------------------------- " + hrefs1 + "---------------------------------- \n ---------------------------------- ");
    console.log(hrefs2);

    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();


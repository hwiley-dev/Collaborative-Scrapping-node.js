/*  |*!*!*!*!*!*!*!*| CRAIG IS LIT |*!*!*!*!*!*!*!*|
    |*!*!*!*!*!*!*!*| CRAIG SO LIT |*!*!*!*!*!*!*!*|
*/
const puppeteer = require('puppeteer');

  async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  // await page.screenshot({ path: 'example.png'})

 
//  RETURNS AN ARRAY OF TEXT OR JOINED STRING -- works!
    // Next TO DO: set params to map only h1 + price + url

const textsArray = await page.evaluate(
  () => [...document.querySelectorAll('p > .results-info')].map(elem => elem.innerText)
);
const titlesArray = await page.evaluate(
  () => [...document.querySelectorAll('.result-title')].map(elem => elem.innerText)
);
const textsJoined = await page.evaluate(
  () => [...document.querySelectorAll('ul')].map(elem => elem.innerText).join('\n')
);

// console.log("---------------------------------- \n ---------------------------------- \n ---------------------------------- \n ---------------------------------- \n ---------CRAIGS LIST TITLE DUMP--------------- \n ---------------------------------- \n" + textsJoined)
// console.log(textsJoined)



  // 3 commands (using puppeteer) for successful scrape
  // const[el] = await page.$x('//*[@id="sortable-results"]/ul/li[1]/a/div[1]/div/div[1]/img')
  // const src = await el.getProperty('src');
  // const imgURL = await src.jsonValue();


  // const[el2] = await page.$x('//*[@id="sortable-results"]/ul/li[1]/p/a')
  // const txt = await el2.getProperty('textContent');
  // const title = await txt.jsonValue();

  // const[el3] = await page.$x('//*[@id="sortable-results"]/ul/li[1]/p/span[2]/span[1]')
  // const txt2 = await el3.getProperty('textContent');
  // const price = await txt2.jsonValue();

  // console.log({ imgURL, title, price })

  browser.close();

}

scrapeProduct('https://sfbay.craigslist.org/search/sfc/rvd')
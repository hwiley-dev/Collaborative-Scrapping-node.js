const puppeteer = require('puppeteer');
const antiques_CL_URL = "https://sfbay.craigslist.org/search/sfc/fud?query=antique&max_price=500"


let bestDealArray = []

/*  |*!*!*!*!*!*!*!*| CRAIG IS LIT |*!*!*!*!*!*!*!*|
    |*!*!*!*!*!*!*!*| CRAIG SO LIT |*!*!*!*!*!*!*!*|
*/
  async function craigslistScrape(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  // await page.screenshot({ path: 'example.png'})

 
//  RETURNS AN ARRAY OF TEXT OR JOINED STRING -- works!
    // Next TO DO: set params to map only h1 + price + url
    const textsArray = await page.evaluate(
      () => [...document.querySelectorAll('p > .results-title')].map(elem => elem.innerText)
      );
      const titlesArray  = await page.evaluate(
        () => [...document.querySelectorAll('.result-title')].map(elem => elem.innerText)
      );
      const titlesArrayJoined  = await page.evaluate(
        () => [...document.querySelectorAll('.result-info > a')].map(elem => elem.innerText).join('\n')
      );

      let priceArrayJoined = await page.evaluate(
        () => [...document.querySelectorAll('.result-price')].map(elem => 
          
          
          elem.innerText.replace(/\$/g,'')).join('\n')
          
      );

console.log("---------------------------------- \n ---------------------------------- \n ---------------------------------- \n ---------------------------------- \n ---CRAIGS LIST TITLE DUMP---- \n ---------------------------------- \n ---------------------------------- \n ---------------------------------- " + titlesArrayJoined + priceArrayJoined + " \n ---------------------------------- \n ---------------------------------- \n ---CRAIGS LIST END DUMP---- \n ---------------------------------- \n ")


//  USING XPATH !!

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


// __ Report Section __

        // Sort Lowest Price
// priceArrayJoined = priceArrayJoined.toString();
 

//  console.log(priceSort);

let lowestPrice = 0

console.log("-*-*-*-*-*-*-*-*-*-*-*-* \n -*-*-*-*-*-*-*-* \n Lowest antique Price Needs Fixing: " + lowestPrice)


  browser.close();

}

craigslistScrape(antiques_CL_URL)

//  ** END CRAIGSLIST **




/* 
 |____ ETSY SCRAPE ____|
*/

// Write an async function -- 
//    a fn where compiler waits for certain values before moving forward. Yeah, it's weird. Explore JS asynchronous wiki rabbit hole sometime :)
async function etsyScrape(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  
  
  const[el] = await page.$x('//*[@id="content"]/div/div[1]/div/div/div[3]/div[2]/div[2]/div/div/ul/li[1]/div/a/div[1]/div/div[1]/div/div/div/img')
  const src = await el.getProperty('src');
  const imgURL = await src.jsonValue();


  // Title returns n/a for some reason ...
  const[el2] = await page.$x('//*[@id="content"]/div/div[1]/div/div/div[3]/div[2]/div[2]/div/div/ul/li[1]/div/a/div[2]/div/h3')
  const txt = await el2.getProperty('textContent');
  const title = await txt.jsonValue();

  const[el3] = await page.$x('//*[@id="content"]/div/div[1]/div/div/div[3]/div[2]/div[2]/div/div/ul/li[1]/div/a/div[2]/div/span/span[2]')
  const txt2 = await el3.getProperty('textContent');
  const price = await txt2.jsonValue();

  console.log({ imgURL, title, price })

  browser.close();

  

}

etsyScrape('https://www.etsy.com/search?q=visual+art')

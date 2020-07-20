const puppeteer = require('puppeteer');


// Write an async function -- 
//    a fn where compiler waits for certain values before moving forward. Yeah, it's weird. Explore JS asynchronous wiki rabbit hole sometime :)
async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const[el] = await page.$x('//*[@id="landingImage"]')
  const src = await el.getProperty('src');
  const imgURL = await src.jsonValue();

  const[el2] = await page.$x('//*[@id="title"]')
  const txt = await el2.getProperty('textContent');
  const title = await txt.jsonValue();

  const[el3] = await page.$x('//*[@id="price_inside_buybox"]')
  const txt2 = await el3.getProperty('textContent');
  const price = await txt2.jsonValue();

  console.log({ imgURL, title, price })

  browser.close();

  

}

scrapeProduct('https://www.amazon.com/TravelSource-2-Person-Stainless-Steel-Utensils-Chopsticks/dp/B01LX29R5C/ref=pd_ybh_a_1?_encoding=UTF8&psc=1&refRID=12D45JZJV8SQ591065EP')

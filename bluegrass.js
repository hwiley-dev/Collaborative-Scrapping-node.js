const puppeteer = require('puppeteer');


// Write an async function -- 
//    a fn where compiler waits for certain values before moving forward. Yeah, it's weird. Explore JS asynchronous wiki rabbit hole sometime :)
async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  



  
  const[el] = await page.$x('//*[@id="rso"]/div[1]/div/div[1]/a')
  const href = await el.getProperty('href');
  const imgURL = await href.jsonValue();


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

scrapeProduct('https://www.google.com/search?q=(+bluegrass+OR+americana+OR+folk)+sponsors&oq=(+bluegrass+OR+americana+OR+folk)+sponsors&aqs=chrome..69i57j33.2225j0j7&sourceid=chrome&ie=UTF-8')

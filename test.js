const puppeteer = require('puppeteer');
const fs = require('fs'); 

const obterSelic = async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://br.investing.com/central-banks/central-bank-of-brazil'); // Acessa o site do Investing.com 
  await page.waitForSelector('.noPad') // Faz o get da taxa 
  let elemento = await page.$('.noPad') 
  let valor = await page.evaluate(el => el.textContent, elemento)
  
  // console.log(valor.slice(35,40)) // Corta a taxa selic atual 
  let resultado = valor.slice(35, 40)
  await browser.close()
  return 'oi'

};

obterSelic()
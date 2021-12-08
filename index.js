const express = require('express');
const app = express()
const port = 80
const puppeteer = require('puppeteer');
const fs = require('fs'); 

app.use(express.static(__dirname+'/public'));

const obterSelic = async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://br.investing.com/central-banks/central-bank-of-brazil'); // Acessa o site do Investing.com 
  await page.waitForSelector('.noPad') // Faz o get da taxa 
  let elemento = await page.$('.noPad') 
  let valor = await page.evaluate(el => el.textContent, elemento)
  // console.log(valor.slice(35,40)) // Corta a taxa selic atual 
  let resultado = valor.slice(34,42).replace(/\s/g, '')
  await browser.close()
  return resultado

};

obterSelic().then(total => { // Executa pela primeira vez ao rodar o script
    fs.writeFile('selic.txt', total, (err) => {if(err) console.log(err) })
})

setInterval(function(){ // Atualiza o valor da taxa a cada 5 min
    obterSelic().then(total => {
        fs.writeFile('selic.txt', total, (err) => {if(err) console.log(err)})
    })
}, 300000)

app.get('/selic', (req, res) => {
    res.sendFile(`${__dirname}/selic.txt`)
})

app.get('/', (req,res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.listen(port, () => {
    console.log(`Ouvindo na porta ${port}!`)
})
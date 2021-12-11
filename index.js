const express = require('express');
const app = express()
const fs = require('fs')
const cors = require('cors')
const axios = require('axios')
app.use(express.static(__dirname+'/public'));
app.use(cors())

/* Minhas rotas */

function getSelic(){
    axios.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados?formato=json').then(function (response){
    var selic = response.data[response.data.length-1].valor
    fs.writeFile('selic.txt', `${selic}`, function(err){console.log(err)})
    console.log(selic)
}).catch(function (error){
    console.log(error)
})
}

getSelic()
setInterval(getSelic, 300000)

app.get('/', (req,res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.get('/selic', (req, res) => {
    res.sendFile(`${__dirname}/selic.txt`)
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Ouvindo!`)
})
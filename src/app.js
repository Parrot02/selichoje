import express from 'express'
import axios from 'axios'
import fs from 'fs'
import path from 'path'


const __dirname = path.resolve()
const app = express()

app.use(express.static('public'))


/* Minhas rotas */

async function getSelic() {
    const response = await axios.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados?formato=json')
    console.log(response.json())

    // .then(function (response){
    //     var selic = response.data[response.data.length-1].valor
    //     fs.writeFile('selic.txt', `${selic}`, function(err){console.log(err)})
    //     console.log(selic)
    // }).catch(function (error){
    //     console.log(error)
    // })
}

app.get('/', (req,res) => {
    // res.sendFile(`./public/index.html`)
    getSelic()
})

app.get('/selic', (req, res) => {
    res.sendFile(`${__dirname}/selic.txt`)
})

app.listen(process.env.PORT || 3000, (error) => {
    console.log(`Ouvindo!`)
})

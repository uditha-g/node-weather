const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectory))
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)

app.get('/uditha', (req, res) => {
    res.render('index', {
        title: 'Uditha Asiri',
        link: 'This is interesting'
    })
})

app.get('/help', (req, res) => {
    res.send({
        name: 'Uditha',
        age: 30
    })
})

app.get('/about', (req, res) => {
    res.send('About page')
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            res.send({ error })
            return
        }
        
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                res.send({ error })
                return
            }
    
            res.send({
                location,
                forecastdata
            })
        })
    })
})

app.get('*', (req, res) => {
    res.send('404 page')
})

app.listen(port, () => {
    console.log('Server is up ' + port)
})
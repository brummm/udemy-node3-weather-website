const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getGeocode = require('./utils/geocode')
const getForecast = require('./utils/forecast')



const app = express()
const port = process.env.PORT || 3000

// paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rogério'
    })
})

app.get('/about', (req, res) => {
    res.render('about',
    {
        title: 'About',
        name: 'Rogério'
    })
})

app.get('/help', (req, res) => {
    res.render('help',
    {
        title: 'Help',
        message: 'help, I need somebody, HELP!!!',
        name: 'Rogério'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        message: 'Help article not found',
        name: 'Rogério'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please, inform the address to receive the forecast'
        })
    }

    
    getGeocode({
        address: req.query.address
    }, (error, response) => {
        if(error) {
            return res.send({ error })
        }

        getForecast(response, (error, {temperature, chanceDeChuva} = {}) => {
            if(error) {
                return res.send({ error })
            }

            res.send(
                {
                    location: response.name,
                    forecast: "It is currently "+ temperature +" degrees out. There is a "+ chanceDeChuva +"% chance of rain.",
                    providedAddress: req.query.address
                }
            )

        })


    });


    
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Rogério'
    })
})




app.listen(port, () => {
    console.log('Server is up on port '+ port)
})
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require("./utils/forecast")
const geocode = require('./utils/geocode')


////Full path to directory of node file being run, and full path to the file itself, provided by node wrapper funciton
//console.log(__dirname)
////console.log(__filename)
//console.log(path.join(__dirname, '../public'))


//Initialise express as app variable
const app = express()

//Define absolute directory paths for webserver public directory and handlebars views directory
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Set express to use handlebars as a templating engine

//Set express to use handlebars as the template engine, then set views path for express/handlebars, register partials path for handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set public path for express to use
app.use(express.static(publicDirectoryPath))


//Seup static directories to serve via express/handlebars


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sean L'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sean L'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sean L',
        helpMessage: 'This is a message about how to use'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address query'
        })

    }


//    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
//        if (error) {
//            return res.send({ error })
//        }

//        forecast(latitude, longitude, (error, forecastData) => {
//            if (error) {
//                return res.send({ error })
//            }

//            res.send({
//                forecast: forecastData,
//                location,
//                address: req.query.address
//            })
//        })
//    })
//})




    //Call geocode with address string from query, then provide callback which is called with an error string of errors return and undefined for second var
    //If address succesfully geocode returns with undefined error and an object for location information
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        //Send back error object if geocode encounters an error
        if (error) {
            return res.send({
                error
            })
        }
        //Call forecast with lat and long data deconstructed from object, and a callback which is called with error string or forecast
        //data if the coordinates return a forecast.

        forecast(latitude, longitude, (error, forecastData) => {
            //Send back error object to client if forecast returns an error string
            if (error)
                return res.send({
                    error
                })
            //Only reached if above error conditionals dont run, returns forecast string, location from geocode and address from query
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })


    })

})




////First var takes in relative path, below is example of root. second var is function with request (res) and response (req) variable
////Provide relative path for help and respond with object of strings 
//app.get('/weather', (req, res) => {

//    //Setup query argument handling and if statement to provide error if no address is provided
//    if (!req.query.address) {
//        return res.send({
//            error: 'You must provide an address'
//        })

//    }

//    //Only runs if above conditional fails, sends back object and provided address query
//    res.send({
//        forecast: 'It is probably sunny',
//        location: 'Brisbane',
//        address: req.query.address
//    })
//})

app.get('/products', (req, res) => {
    if (!req.query.search) {
      return  res.send({
            error:'You must provide a search term'
        })

    }

    console.log(req.query.search)


    res.send({
        products:[]
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page Not Found',
        errorMessage: 'Help page could not be located',
        name: 'Sean long'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page Not Found',
        errorMessage: '404 - page could not be found',
        name: 'Sean long'
    })
})




//First arg is port to use, second (optional) is a callback to run once server starts
app.listen(3000, () => {
    console.log("Server is up on port 3000")
})


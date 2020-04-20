const request = require('request')


//Include additional data for forecast string

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=552ace18e6f5409eebcb07933016190f&query=' + latitude + ',' + longitude + '& units=m'
    debugger
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather services", undefined)
        }

        else if (body.error) {
            callback("Unable to find location", undefined)
        }

        else {
            const { temperature, weather_descriptions, feelslike, wind_speed, wind_dir } = body.current
            //const temperature = body.current.temperature
            //const description = body.current.weather_descriptions[0]
            //const feelslike = body.current.feelslike

            const forecastString = 'It is ' + weather_descriptions[0] + ' and ' + temperature + ' degrees out' + ' but it feels like ' + feelslike + ' degrees. '
            const wind_forecastString = 'Wind is ' + wind_speed + 'Km/h in ' + wind_dir + ' direction.'
            callback(undefined, forecastString + wind_forecastString)

        }

    })
}

//request({ url: url, json: true }, (error, response) => {

//    if (error) {
//        console.log("Unable to connect to weather service")
//    }

//    else if (response.body.error) {
//        console.log('Unable to find location')

//    }

//    else {

//        const currentWeather = response.body.current
//        console.log('It is ' + currentWeather.weather_descriptions[0])
//        console.log(chalk.inverse(currentWeather.temperature) + ' degrees out. It feels like ' + chalk.inverse(currentWeather.feelslike) + ' degrees out.')

//    }

//    const currentWeather = response.body.current
//    console.log('It is '+currentWeather.weather_descriptions[0])
//    console.log(chalk.inverse(currentWeather.temperature) + ' degrees out. It feels like ' + chalk.inverse(currentWeather.feelslike) + ' degrees out.')


//})


//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


//forecast(-75.7088, 44.1545, (error, data) => {



module.exports = forecast
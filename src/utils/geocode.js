const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1Ijoic2xvbmc1MDEiLCJhIjoiY2s5MHBiemdmMDNxczNlbzZ3NGxndnp6YSJ9.vSLgsqSZUWeX8w3R04C9PA&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        }

        else if (body.features.length === 0) {
            callback('Please provide a valid location', undefined)
        }

        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
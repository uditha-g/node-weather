const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidWRpdGhhLW4iLCJhIjoiY2wwM3BwbWhjMHBpdTNibWp4c3JzcmZjYSJ9.QVT_UVAOmJXRUiGqp17ylw&limit=1'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to the map service')
        } else if (body.features.length == 0) {
            callback('Unable to find the location')
        } else {
            const center = body.features[0].center
            const lat = center[1]
            const long = center[0]
            callback(undefined, {latitude: lat, longitude: long, location: body.features[0].place_name})
        }
    })
}

module.exports = geocode
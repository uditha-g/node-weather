const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d5937a69ca9033661b2938a99cac9ea0&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to the weather service')
        } else if (body.error) {
            callback('Unable to find the location')
        } else {
            const current = body.current
            callback(undefined, {description: current.weather_descriptions[0], temperature: current.temperature, feelslike: current.feelslike})
        }
    })
}

module.exports = forecast
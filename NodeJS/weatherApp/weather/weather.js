const request = require('request');

const getForecast = (lat, lng, callback) => {
    const url = `https://api.darksky.net/forecast/6a408c00bd57bf5ccde5cf563c4415b7/${lat},${lng}`;

    request(url, {
        url,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('erreur');
        } else {
            callback(undefined, {
                currentTemperature: body.currently.temperature,
            });
        }
    })
}

module.exports = {
    getForecast
}
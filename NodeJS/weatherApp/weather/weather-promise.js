const request = require("request");

const getForecast = (lat, lng) => {
    const url = `https://api.darksky.net/forecast/6a408c00bd57bf5ccde5cf563c4415b7/${lat},${lng}`;

    return new Promise((resolve, reject) => {
        request(
            url, {
                url,
                json: true
            },
            (error, response, body) => {
                if (error) {
                    reject("erreur");
                } else {
                    resolve({
                        currentTemperature: body.currently.temperature
                    });
                }
            }
        );
    });
};

module.exports = {
    getForecast
};
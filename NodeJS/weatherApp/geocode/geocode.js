const request = require('request');

const apiKEY = 'AIzaSyCaT2_WhP1mcDIL09T9VxMegvRUGj8kfHc'
const urlGoogle = 'https://maps.googleapis.com/maps/api/geocode/json';

const geocodeAddress = (address, callback) => {

    const query = `${urlGoogle}?key=${apiKEY}&address=${encodeURIComponent(address)}`;

    //Asynchronous
    request({
        url: query,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Error with Google servers');
        } else {
            try {
                if (body.status === 'OK') {
                    const result = body.results[0];
                    const formattedAddress = result.formatted_address;
                    const lat = result.geometry.location.lat;
                    const lon = result.geometry.location.lng;

                    callback(undefined, {
                        formattedAddress,
                        lat,
                        lon
                    })

                } else if (body.status === 'ZERO_RESULTS') {
                    callback('no result returned!')
                }
            } catch (e) {
                callback(e)
            }
        }
    });

}

module.exports = {
    geocodeAddress
};
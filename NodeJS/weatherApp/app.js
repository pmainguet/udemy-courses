const yargs = require('yargs');
const geocode = require('./geocode/geocode.js')
const weather = require('./weather/weather.js')

//Synchronous
console.log("Starting app");

//Address 1301 lombard street philadelphia
const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch the weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

//Asynchronous
try {

    geocode.geocodeAddress(argv.a, (errorMessage, result) => {
        if (errorMessage) {
            console.log(errorMessage);
        } else {
            //console.log(JSON.stringify(result, undefined, 2));
            weather.getForecast(result.lat, result.lon, (error, response) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(response.currentTemperature);
                }
            });
        }
    });
} catch (e) {
    console.log(e);
}

//Synchronous
console.log("Finishing up")
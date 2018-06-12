const yargs = require('yargs');
const geocode = require('./geocode/geocode-promise.js')
const weather = require('./weather/weather-promise.js')

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
    geocode.geocodeAddress(argv.a)
        .then(result => {
            return weather.getForecast(result.lat, result.lon);
        })
        .then(forecast => console.log(forecast))
        .catch(error => console.log(error));
} catch (e) {
    console.log(e);
}

//Synchronous
console.log("Finishing up")
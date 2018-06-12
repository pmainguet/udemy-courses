const yargs = require("yargs");
const axios = require('axios');

//Address 1301 lombard street philadelphia
const argv = yargs
    .options({
        address: {
            demand: true,
            alias: "a",
            describe: "Address to fetch the weather for",
            string: true
        }
    })
    .help()
    .alias("help", "h").argv;

const apiKEY = "AIzaSyCaT2_WhP1mcDIL09T9VxMegvRUGj8kfHc";
const urlGoogle = "https://maps.googleapis.com/maps/api/geocode/json";

const query = `${urlGoogle}?key=${apiKEY}&address=${encodeURIComponent(
    argv.a
      )}`;

axios.get(query)
    .then(response => {
        const res = response.data.results[0];
        const loc = res.geometry.location;
        const url = `https://api.darksky.net/forecast/6a408c00bd57bf5ccde5cf563c4415b7/${loc.lat},${loc.lng}`;
        return axios.get(url);
    })
    .then(response => {
        console.log({
            currentTemperature: response.data.currently.temperature
        })
    });
const got = require('got');
const delaySeconds = 3;
const url = 'http://api.open-notify.org/iss-now.json';
function loop() {
  got(url, { json: true })
    .then(iss => {
      const position = iss.body.iss_position;
      console.log(position.longitude+" "+position.latitude);
    })
    .catch(error => {
      console.log(error.response.body);
    });
  setTimeout(loop, delaySeconds * 1000);
}
loop();
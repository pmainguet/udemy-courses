'use strict';
const os = require('os');
const cpu = require('windows-cpu');
const cpuLoad = require('universal-cpu-load');
const delaySeconds = 1;
const decimals = 3;
function loop() {
  cpuLoad(decimals,(error, result) => {
    if (error) {
      console.log('CPU load - error retrieving');
    } else {
      console.log(result);
    }
  });
  setTimeout(loop, delaySeconds * 1000);
}
loop();
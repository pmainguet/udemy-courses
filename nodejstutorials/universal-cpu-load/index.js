'use strict';
const os = require('os');
const cpu = require('windows-cpu');
module.exports = function (decimals, cb) {
  // Decimals is used for linux CPU load only since windows-cpu rounds to whole numbers.
  decimals = decimals || 0;
  if (process.platform === 'win32') {
    cpu.totalLoad((error, cpus) => {
      if (error) {
        return cb(error);
      }
      // Average the CPU loads since may be multiple cores on the machine.
      let sum = cpus.reduce((a, b) => {
        return a + b;
      });
      let avg = sum / cpus.length;
      cb(null, avg);
    });
  } else {
    let linuxCpuLoad = os.loadavg()[0] * 100;
    linuxCpuLoad = linuxCpuLoad.toFixed(decimals);
    cb(null, linuxCpuLoad);
  }
};
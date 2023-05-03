const { exec } = require('child_process');

function getDockerContainers(callback) {
  exec('docker ps', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return callback(err);
    }

    const lines = stdout.trim().split('\n');
    const headers = lines.shift().trim().split(/\s{2,}/);
    const containers = lines.map((line) => {
      const values = line.trim().split(/\s{2,}/);
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index];
        return obj;
      }, {});
    });

    callback(null, containers);
  });
}


module.exports = getDockerContainers;

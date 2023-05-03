const { exec } = require('child_process');

const restartContainer = (id) => {
  return new Promise((resolve, reject) => {
    exec(`docker restart ${id}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error stopping container ${id}: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Error stopping container ${id}: ${stderr}`);
        reject(new Error(stderr));
        return;
      }
      console.log(`Container ${id} stopped: ${stdout}`);
      resolve(stdout);
    });
  });
};

module.exports = restartContainer;
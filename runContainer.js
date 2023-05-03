const { exec } = require('child_process');


const runContainer = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`error running`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`${stderr}`);
        reject(new Error(stderr));
        return;
      }
      console.log(`Container running: ${stdout}`);
      resolve(stdout);
    });
  });
};

module.exports = runContainer;
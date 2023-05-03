const { exec } = require('child_process');

const stopContainer = (name) => {
  return new Promise((resolve, reject) => {
    console.log(name);
    if(name === "jupyter"){

      exec(`docker stop jupyter`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error stopping container ${name}: ${error.message}`);
          reject(error);
          return;
        }
        if (stderr) {
          console.error(`Error stopping container ${name}: ${stderr}`);
          reject(new Error(stderr));
          return;
        }
        console.log(`Container ${name} stopped: ${stdout}`);
        resolve(stdout);
      });
    }
    else{
      exec(`docker rm ${name} -f`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error stopping container ${name}: ${error.message}`);
          reject(error);
          return;
        }
        if (stderr) {
          console.error(`Error stopping container ${name}: ${stderr}`);
          reject(new Error(stderr));
          return;
        }
        console.log(`Container ${name} stopped: ${stdout}`);
        resolve(stdout);
      });
    }
    
  });
};

module.exports = stopContainer;
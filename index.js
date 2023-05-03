// Import the Express module
const express = require('express');
const cors = require('cors');
const getDockerContainers = require('./getDockerContainers');
const stopContainer = require('./stopContainer');
const restartContainer = require('./restartContainer');
const runContainer = require('./runContainer');
const availImages = require('./availImages');
const bodyParser = require('body-parser');






// docker managerment routes below


app.get('/listcontainers', (req, res) => {
  getDockerContainers((err, containers) => {
  if (err) {
      res.json(["error"])
    }
    const keysArray = Object.keys(availImages);
    res.json({containers: containers, availImages: keysArray, imagePorts: availImages} );
  });
});

app.get('/run/:app', (req, res) => {
  let app = req.params.app;

  runContainer(availImages[app].command)
  .then((output) => {
    console.log(`Container is running: ${output}`);
    res.json(`Container running: ${output}`)
  })
  .catch((error) => {
    console.error(`Error running container: ${error.message}`);
    res.json(`Error running container: ${error.message}`)
  });
});


app.get('/stop/:containername', (req, res) => {
  let containername = req.params.containername;
  stopContainer(containername)
  .then((output) => {
    console.log(`Container stopped: ${output}`);
    res.json(`Container stopped: ${output}`)
  })
  .catch((error) => {
    console.error(`Error stopping container: ${error.message}`);
    res.json(`Error stopping container: ${error.message}`)
  });
});


app.get('/restart/:imageid', (req, res) => {
  let imageid = req.params.imageid;
  restartContainer(imageid)
  .then((output) => {
    console.log(`Container resarted: ${output}`);
    res.json(`Container resarted: ${output}`)
  })
  .catch((error) => {
    console.error(`Error restarting container: ${error.message}`);
    res.json(`Error restarting container: ${error.message}`)
  });
});

// Start the server on port 3000
app.listen(8080, () => {
  console.log('Server started on port 8080');
});

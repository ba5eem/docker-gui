// This is a React component that displays a table of running Docker containers and allows the user to run new containers by clicking on buttons with labels corresponding to available Docker images. It uses the useState hook to manage state variables such as the list of available images, the filtered list of images based on search query, and the list of running containers. It also defines functions to handle user interactions such as clicking on buttons to run, stop, or restart containers, and to refresh the page. The component also uses Next.js' getServerSideProps function to fetch data from the server and pass it as props to the component.


import { useState } from 'react';
import appData from "../constants/data";

import "../styles/post.module.css"



export default function Home(props) {
  // State hooks
  const [showLoader, setshowLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [app, setApp] = useState("");
  const [isSelected, setSelected] = useState(false);


  const [names, setNames] = useState(props.payload.availImages || []);
  const [filteredNames, setFilteredNames] = useState(names);
  const [searchQuery, setSearchQuery] = useState('');

  const [runningContainers, setRunningContainers] = useState(props.payload.containers || []);


    // Handle search bar input
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setFilteredNames(names.filter(name => name.toLowerCase().includes(query.toLowerCase())));
  }

  // Run a container by calling the API endpoint
  const runContainer = (app) => () => {
    setSelected(true)
    setTimeout(() => {  
      setSelected(false) 
    }, 2000);
    setApp(app);
    callAPI(`${appData.runContainerURL}/${app}`)
  }

  // Stop a container by calling the API endpoint and refresh the page after 5 seconds
  const stopContainer = (containerName) => () => {
    callAPI(`${appData.stopContainerURL}/${containerName}`);
    setTimeout(() => {  window.location.reload(); }, 5000);
  }

  // Restart a container by calling the API endpoint and refresh the page after 10 seconds
  const restartContainer = (containerID) => () => {
    callAPI(`${appData.stopContainerURL}/${containerID}`);
    setTimeout(() => {  window.location.reload(); }, 10000);
  } 

  // Refresh the page
  const refreshPage = () => {
    window.location.reload();
  }

  // Call the API endpoint and update state with the data returned
  const callAPI = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // Render a container in a table row
  const listContainer = (cont,id) => {
    let ports = props.payload.imagePorts;
    return (
        <tr key={id}>
          <td>{cont["CONTAINER ID"]}</td>
          <td>{cont.IMAGE}</td>
          <td>{cont.COMMAND}</td>
          <td>{cont.CREATED}</td>
          <td>{cont.STATUS}</td>
          <td>{cont.PORTS}</td>
          <td>{cont.NAMES}</td>
          <td><a href={ports[cont.NAMES].url}><button className="open-button">open</button></a></td>
          <td><button onClick={stopContainer(cont.NAMES)} className="stop-button">stop</button></td>
          <td><button onClick={restartContainer(cont["CONTAINER ID"])} className="restart-button">restart</button></td>
        </tr>
        )
  }



  return (
    <div className="container">
      <div className="buttons">
      <div className="skills-container">
        <div className="grid-skills">
          {filteredNames.map((app, idx) => 
            <button className="skill-card"
              disabled={disabled} 
              key={idx}
              label={app} 
              onClick={runContainer(app)}>
                {app}
              </button>
              )}
          {isSelected ? <button className="skill-card-loading">loading</button> : ""}

        </div>
        </div>
      </div>
      {/* Display running containers in a table */}
      <div className="table">
        <div>
          <ul>
          <table>
            <thead>
              <tr>
                <th>Container ID</th>
                <th>Image</th>
                <th>Command</th>
                <th>Created</th>
                <th>Status</th>
                <th>Ports</th>
                <th>Names</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {runningContainers.map((cont, id) => listContainer(cont,id))}
            </tbody> 
          </table>
        </ul>

        </div>
        <button 
          onClick={refreshPage} 
          type="button" 
          className="refresh-button">refresh
        </button>
      </div>


      <div className="skills-container">
        <h2>Made with</h2>
        <div className="grid-skills">
          <div className="skill-card node">
            <p>Node</p>
          </div>
          <div className="skill-card docker">
            <p>Docker</p>
          </div>
        </div>
      </div>

  </div>
  )
}





export async function getServerSideProps() {
  const response = await fetch(`${appData.listContainersURL}`)
  const data = await response.json()

  return {
    props: {
      payload: data
    }

  }
}
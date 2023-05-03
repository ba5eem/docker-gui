// this will changes to database in future
const serverName = "http://localhost"

const availImages = {
	matlab: {
		command: "docker run -d --rm --name matlab -p 8888:8888 --shm-size=512M mathworks/matlab:r2023a -browser",
		port: 8888,
		url: `${serverName}:8888`
	},
	jupyter: {
		command: "docker start jupyter",
		initial: "docker run -d --name jupyter -p 4444:8888 -e JUPYTER_ENABLE_LAB=yes -e NOTEBOOK_PASSWORD=password jupyter/scipy-notebook",
		port: 4444,
		url: `${serverName}:4444/lab?token=eded4a69a5c716a268a47dfcb31d3f7e4f148b2ac0a37fb1`
	},
	apache: {
		command: "docker run -d --name apache -p 9090:80 httpd:2.4",
		port: 9090,
		url: `${serverName}:9090`
	},
	grafana: {
		command: "docker run -d --name grafana -p 4000:3000 grafana/grafana",
		port: 4000,
		url: `${serverName}:4000`
	},
	nginx: {
		command: "docker run -d -p 9091:80 nginx",
		port: 9091,
		url: `${serverName}:9091`
	},

}









module.exports = availImages;
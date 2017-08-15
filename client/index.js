const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker");

/*
  * Instantiate the Map
  */

mapboxgl.accessToken = "pk.eyJ1IjoiYXByZXNzNCIsImEiOiJjajY4M2ZjdmIwYzB4MzNwbDJmbnFndDN3In0.hNBXlDz4RQ1lcc2Q-_GyqQ";
const map = new mapboxgl.Map({
  container: "map-canvas",
  center: [-74.0, 40.731],
  zoom: 12.5, // starting zoom
  pitch: 35,
  bearing: 20,
  style: "mapbox://styles/mapbox/streets-v10"
});


document.getElementById("activities-choices").addEventListener('click',() => {

fetch('/api')
  .then(result => result.json())
  .then(data => {
    let nameArray = data[2]
      nameArray.forEach(function(i){
      let yyy = document.createElement("option")
      yyy.text = i.name
      document.getElementById("activities-choices").append(yyy)
    })
  })
  .catch(console.error)
})

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
      yyy.text = i.name;
      yyy.value = i.name;
      document.getElementById("activities-choices").append(yyy)
    })
  })
  .catch(console.error)
})

document.getElementById("restaurants-choices").addEventListener('click',() => {

fetch('/api')
  .then(result => result.json())
  .then(data => {
    let nameArray = data[1]
      nameArray.forEach(function(i){
      let yyy = document.createElement("option")
      yyy.text = i.name;
      yyy.value = i.name;
      document.getElementById("restaurants-choices").append(yyy)
    })
  })
  .catch(console.error)
})

document.getElementById("hotels-choices").addEventListener('click',() => {

fetch('/api')
  .then(result => result.json())
  .then(data => {
    let nameArray = data[0]
      nameArray.forEach(function(i){
      let yyy = document.createElement("option")
      yyy.text = i.name;
      yyy.value = i.name;
      document.getElementById("hotels-choices").append(yyy)
    })
  })
  .catch(console.error)
})

// ADD BUTTONS

// const button = document.createElement("button");
// button.className = "btn btn-xs btn-danger remove btn-circle";
// button.append("x");

document.getElementById("hotels-add").addEventListener('click',() => {


  const select = document.getElementById(`hotels-choices`);
  const selectedId = select.value;


  fetch('/api')
    .then(result => result.json())
    .then(data => {
      var itemLocation;
      let n = data[0];
      for (var i = 0; i < n.length; i++){
        // console.log(n[i]['name'])
        if (n[i]['name'] === selectedId){
          itemLocation = n[i]['place']['location']
          return itemLocation
        }
      }
    })
    .then(itemLocation => {

      const button = document.createElement("button");
      button.className = "btn btn-xs btn-danger remove btn-circle";
      button.value = selectedId;
      button.append("x");

      var listItem = document.createElement('li');
      listItem.innerHTML = selectedId;
      listItem.classList.add('itinerary-item');
      document.getElementById('hotels-list').append(listItem, button);

      var newMarker = buildMarker('hotels', itemLocation);
      newMarker.addTo(map);
      map.flyTo({center: [itemLocation[0],itemLocation[1]], zoom: 15, speed: 0.4});

      button.addEventListener('click', () => {

        newMarker.remove();
        listItem.remove();
        button.remove();
      })
    })
    .catch(console.error)

})

document.getElementById("restaurants-add").addEventListener('click',() => {


    const select = document.getElementById(`restaurants-choices`);
    const selectedId = select.value;


    fetch('/api')
      .then(result => result.json())
      .then(data => {
        var itemLocation;
        let n = data[1];
        for (var i = 0; i < n.length; i++){
          // console.log(n[i]['name'])
          if (n[i]['name'] === selectedId){
            itemLocation = n[i]['place']['location']
            return itemLocation
          }
        }
      })
      .then(itemLocation => {

        const button = document.createElement("button");
        button.className = "btn btn-xs btn-danger remove btn-circle";
        button.value = selectedId;
        button.append("x");

        var listItem = document.createElement('li');
        listItem.innerHTML = selectedId;
        listItem.classList.add('itinerary-item');
        document.getElementById('restaurants-list').append(listItem, button);

        var newMarker = buildMarker('restaurants', itemLocation);
        newMarker.addTo(map);
        map.flyTo({center: [itemLocation[0],itemLocation[1]], zoom: 15, speed: 0.4});

        button.addEventListener('click', () => {

          newMarker.remove();
          listItem.remove();
          button.remove();
        })
      })
      .catch(console.error)

})

document.getElementById("activities-add").addEventListener('click',() => {



    const select = document.getElementById(`activities-choices`);
    const selectedId = select.value;


    fetch('/api')
      .then(result => {
        // console.log('real p1 resolves', result)
        return result.json()
      })
      .then(data => {
        var itemLocation;
        // console.log('in p2', data)
        let n = data[2];
        // console.log('p2 resolves')
        for (var i = 0; i < n.length; i++){
          // console.log(n[i]['name'])
          if (n[i]['name'] === selectedId){
            itemLocation = n[i]['place']['location']
            // console.log('gonna return', itemLocation)
            return itemLocation
          }
        }

      })
      .then(itemLocation => {
        // console.log('promise resolves')
        const button = document.createElement("button");
        button.className = "btn btn-xs btn-danger remove btn-circle";
        button.value = selectedId;
        button.append("x");

        var listItem = document.createElement('li');
        listItem.innerHTML = selectedId;
        listItem.classList.add('itinerary-item');
        document.getElementById('activities-list').append(listItem, button);

        var newMarker = buildMarker('activities', itemLocation);
        newMarker.addTo(map);
        map.flyTo({center: [itemLocation[0],itemLocation[1]], zoom: 15, speed: 0.4});

        button.addEventListener('click', () => {

          newMarker.remove();
          listItem.remove();
          button.remove();
        })
      })
      .catch(console.error)




});

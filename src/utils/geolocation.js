const NodeGeocoder = require('node-geocoder');
const API_KEY = process.env.VUE_APP_GOOGLE_GEO_API_KEY;
import fetch from 'unfetch';
import axios from 'axios';

function instantiateGeo() {
  const options = {
    fetch: fetch,
    provider: 'google',
    apiKey: API_KEY,
    formatter: null // 'gpx', 'string', ...
  };
  return NodeGeocoder(options);
}

function reverseGeolocationLookup(position) {
  return instantiateGeo().reverse({ lat: position.coords.latitude, lon: position.coords.longitude });
}

function geolocationLookup(zipcode) {
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${API_KEY}`).then(res => {
    const topResult = res.data.results[0]
    if (topResult && 'geometry' in topResult) {
      console.log(topResult.geometry.location)
      return topResult.geometry.location;
    }
    console.log("no match")
    return undefined;
  });
}

function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

export default {
  reverseGeolocationLookup,
  geolocationLookup,
  distance
}
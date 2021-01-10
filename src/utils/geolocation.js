const NodeGeocoder = require('node-geocoder');
const API_KEY = "AIzaSyDA47uddTQeSv4l57GYdqpGVA3j3MhzB6E";
import fetch from 'unfetch';

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

function geolocationLookup(postalCode) {
  return instantiateGeo().geocode(postalCode);
}

export default {
  reverseGeolocationLookup,
  geolocationLookup
}
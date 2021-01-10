const NodeGeocoder = require('node-geocoder');
const API_KEY = process.env.VUE_APP_GOOGLE_GEO_API_KEY;
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
  // return instantiateGeo().geocode(postalCode);
}

export default {
  reverseGeolocationLookup,
  geolocationLookup
}
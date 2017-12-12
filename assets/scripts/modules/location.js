const axios = require('axios');
const weather = require('./weather');

exports.getLocation = function location() {
  const ipAddress = 'https://freegeoip.net/json/';
  axios
    .get(ipAddress)
    .then(response => {
      const lng = response.data.longitude;
      const lat = response.data.latitude;
      initDOM(response);
      weather.getWeather(lat, lng);
    })
    .catch(error => {
      console.log(error);
    });

  function initDOM(response) {
    const locationCity = document.getElementById('location-city');
    const locationCountry = document.getElementById('location-country');
    locationCity.innerText = ` ${response.data.city}, ${response.data.region_name}`;
    locationCountry.innerText = response.data.country_name;
  }
};

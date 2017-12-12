(function() {
  const location = require('./modules/location');
  require('../scss/main.scss');

  const celsius = document.getElementById('celsius-button');
  const fahrenheit = document.getElementById('fahrenheit-button');
  const locationTemp = document.getElementById('location-temperature');
  const lowTemp = document.getElementsByClassName('low');
  const highTemp = document.getElementsByClassName('high');
  let newTemp = parseFloat(locationTemp.innerText);

  function convertTempToC() {
    fahrenheit.classList.remove('active');
    celsius.classList.add('active');
    newTemp = parseFloat(locationTemp.innerText);
    Array.from(lowTemp).forEach(weekLow => {
      weekLow.innerText = `${Math.round((parseFloat(weekLow.innerText) - 32) / 1.8)}° ↓`;
    });
    Array.from(highTemp).forEach(weekHi => {
      weekHi.innerText = `${Math.round((parseFloat(weekHi.innerText) - 32) / 1.8)}° ↑`;
    });
    locationTemp.innerText = `${Math.round((newTemp - 32) / 1.8)}°`;
  }

  function convertTempToF() {
    celsius.classList.remove('active');
    fahrenheit.classList.add('active');
    newTemp = parseFloat(locationTemp.innerText);
    Array.from(lowTemp).forEach(weekLow => {
      weekLow.innerText = `${Math.round(parseFloat(weekLow.innerText) * 1.8 + 32)}° ↓`;
    });
    Array.from(highTemp).forEach(weekHi => {
      weekHi.innerText = `${Math.round(parseFloat(weekHi.innerText) * 1.8 + 32)}° ↑`;
    });
    locationTemp.innerText = `${Math.round(newTemp * 1.8 + 32)}°`;
  }

  function toggle() {
    if (celsius.classList.contains('active')) {
      convertTempToF();
    } else if (fahrenheit.classList.contains('active')) {
      convertTempToC();
    }
  }

  document.getElementById('weather-header').addEventListener('click', event => {
    toggle(event.target);
  });

  location.getLocation();
})();

const axios = require('axios');

exports.getWeather = (lat, lng) => {
  const config = {
    headers: { 'Access-Control-Allow-Origin': '*' },
  };
  const uri = `https://api.darksky.net/forecast/e3dc1508c16f644095ba9353d7b468a8/${lat},${lng}`;
  const icon = new Skycons({ color: '#333333' });
  const locationForecast = document.getElementById('location-forecast');
  const locationTemp = document.getElementById('location-temperature');
  const weeklyForecast = document.getElementById('weekly-forecast');
  const options = {
    weekday: 'long',
  };

  axios
    .get(uri, config)
    .then(weatherData => {
      console.log(weatherData);
      initDOM(weatherData);
    })
    .catch(error => {
      console.log(error);
    });

  function initDOM(response) {
    const weekleyForcastList = response.data.daily.data;
    weeklyForecast.innerHTML = weekleyForcastList
      .map(
        (day, i) => `
          <li class="weekly__forecast--item">
            <p class="active">${new Date(day.time * 1000).toLocaleTimeString('en-us', options).split(' ')[0]}</p>
            <span class="low"> ${Math.round(day.temperatureMin)}° &darr;</span>
            <span class="high">${Math.round(day.temperatureMax)}° &uarr;</span>
            <canvas class="weekly__forecast--icon" id="weekly-icon-${i}" width="30" height="30"></canvas>
            <hr/>
          </li>
      `
      )
      .join('');

    weekleyForcastList.forEach((day, i) => {
      icon.set(`weekly-icon-${i}`, day.icon);
    });

    locationForecast.innerText = response.data.currently.summary;
    locationTemp.innerText = `${Math.round(response.data.currently.temperature)}°`;
    icon.set('icon', response.data.currently.icon);
    icon.play();
  }
};

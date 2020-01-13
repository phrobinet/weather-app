const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/849d8b0f5f24bdef7119c48004fa9bb5/${latitude},${longitude}?units=si&lang=fr`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      console.log(body.daily.data[0]);

      // body.daily.data[0] ==> c'est le corp du retour avec toutes les info à l'intèrieur
      callback(undefined, {
        text:
          body.daily.data[0].summary +
          " Il fait actuellement " +
          body.currently.temperature +
          "°. Il y a " +
          body.currently.precipProbability +
          "% de chance de pleuvoir." +
          " La température ressentie : " +
          body.currently.apparentTemperature +
          "°.",
        icon: body.daily.data[0].precipType
      });
    }
  });
};

module.exports = forecast;

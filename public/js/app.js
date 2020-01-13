console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  document.getElementById("icon").src = "";

  fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        console.log(data.forecast.icon);

        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast.text;
        // messageThree.textContent = data.forecast.icon;
        switch (data.forecast.icon) {
          case "rain":
            document.getElementById("icon").src = "/img/rain.png";
            break;
          case "snow":
            document.getElementById("icon").src = "/img/snow.png";
            break;
          case "sun":
            document.getElementById("icon").src = "/img/sun.png";
            break;
          case "storm":
            document.getElementById("icon").src = "/img/storm.png";
            break;

          default:
            document.getElementById("icon").src = "";
            break;
        }
      }
    });
  });
});

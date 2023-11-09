// Load map
const DTMap = L.map("Madison").setView([43.063, -89.42], 13);
// Load OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 19,
}).addTo(DTMap);

//Define cameras
let camIcon = L.Icon.extend({
  options: {
    shadowUrl: "./icon/Cam_shadow.png",
    popupAnchor: [0, -20],
    iconSize: [47, 24], // size of the icon
    shadowSize: [57, 19.0], // size of the shadow
  },
});
let camblueIcon = new camIcon({
  iconUrl: "./icon/Cam.png",
  // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],  // the same for the shadow
});
let camredIcon = new camIcon({
  iconUrl: "./icon/Cam_red.png",
  className: "camera-circle-breath",
});
let camfogIcon = new camIcon({
  iconUrl: "./icon/Cam_fog.png",
  iconSize: [107.2, 47.1],
});

// Define camData
const camData = [
  {
    id: "0067",
    location: [43.09, -89.521],
    name: "W Beltine Hwy (43.09, -89.521)",
  },
  {
    id: "0066",
    location: [43.075, -89.522],
    name: "W Beltine Hwy (43.075, -89.522)",
  },
  {
    id: "0065",
    location: [43.0605, -89.522],
    name: "W Beltine Hwy (43.0605, -89.522)",
  },
  {
    id: "0035",
    location: [43.053, -89.503],
    name: "W Beltine Hwy (43.053, -89.503)",
  },
  {
    id: "0001",
    location: [43.046, -89.473],
    name: "W Beltine Hwy (43.046, -89.473)",
  },
  {
    id: "0002",
    location: [43.037, -89.452],
    name: "W Beltine Hwy (43.037, -89.452)",
  },
  {
    id: "0003",
    location: [43.035, -89.443],
    name: "W Beltine Hwy (43.035, -89.443)",
  },
  {
    id: "0025",
    location: [43.0355, -89.423],
    name: "W Beltine Hwy (43.0355, -89.423)",
  },
  {
    id: "0005",
    location: [43.0345, -89.406],
    name: "W Beltine Hwy (43.0345, -89.406)",
  },
  {
    id: "0004",
    location: [43.036, -89.393],
    name: "W Beltine Hwy (43.036, -89.393)",
  },
  {
    id: "0049",
    location: [43.0405, -89.378],
    name: "W Beltine Hwy (43.0405, -89.378)",
  },
  {
    id: "0061",
    location: [43.0435, -89.369],
    name: "W Beltine Hwy (43.0435, -89.369)",
  },
  {
    id: "0175",
    location: [43.046, -89.357],
    name: "W Beltine Hwy (43.046, -89.357)",
  },
  {
    id: "0062",
    location: [43.0415, -89.349],
    name: "W Beltine Hwy (43.0415, -89.349)",
  },
  {
    id: "0178",
    location: [43.044, -89.336],
    name: "W Beltine Hwy (43.044, -89.336)",
  },
  {
    id: "0006",
    location: [43.0445, -89.323],
    name: "W Beltine Hwy (43.0445, -89.323)",
  },
  {
    id: "0007",
    location: [43.0455, -89.306],
    name: "W Beltine Hwy (43.0455, -89.306)",
  },
];
// Add marker, videoSrc, textContent att into camData
// Marker bindpopup
camData.forEach(function (ele) {
  const marker = L.marker(ele.location, { icon: camblueIcon }).addTo(DTMap);
  ele.marker = marker;
  const videoSrc = `./video/normal-transcoded/${ele.id}-output-h264.mp4`;
  ele.videoSrc = videoSrc;
  const textContent = `Location:${ele.name}`;
  // ele.textContent = textContent;
  marker.bindPopup(
    getPopupContent({ id: ele.id, videoSrc, header: textContent }),
    {
      maxWidth: 1000,
      maxHeight: 500,
    }
  );
});

function getPopupContent({ id, videoSrc, unitySrc, header, subheader }) {
  return `
    <div class="popup-wrapper">
        <h2 class="popup-header">${header}</h2>
        <p class="popup-subheader">${subheader || ""}</p>
        <div class="vis-container">
            <video src='${videoSrc}' width='480' controls autoplay type='video/mp4' muted> </video>
            <iframe class='unity 3d' frameborder='0' width='480' height='320' src='${
              unitySrc || "./unity3d-normal.html?modelID=" + id
            }'/>
        </div>
    </div>`;
}

function handleAccident({ id, videoSrc, unitySrc }) {
  let timeElapsed = 0;
  let accidentMarker = camData.filter((ele) => {
    return ele.id === id;
  });

  if (accidentMarker.length === 0) {
    alert("No accident marker found!");
  }

  accidentMarker = accidentMarker[0];

  accidentMarker.marker.setIcon(camredIcon);
  const textContentAccident = `Accident detected: two vehicle collided, one of two lanes affected.<br/><span id="pop-up-timer-${accidentMarker.id}">Time since the accident occurred: 0s</span>`;
  accidentMarker.marker.setPopupContent(
    getPopupContent({
      id,
      videoSrc,
      unitySrc,
      header: `Location: ${accidentMarker.name}`,
      subheader: textContentAccident,
    })
  );
  const int = setInterval(() => {
    timeElapsed += 1;
    const timerEle = document.getElementById(
      "pop-up-timer-" + accidentMarker.id
    );
    if (timerEle) {
      timerEle.textContent = `Time since the accident occurred: ${timeElapsed}s`;
    }
  }, 1000);

  const normalVideoSrc = `./video/normal-transcoded/${accidentMarker.id}-output-h264.mp4`;
  accidentMarker.marker.on("popupclose", function () {
    accidentMarker.marker.setIcon(camblueIcon);
    accidentMarker.marker.setPopupContent(
      getPopupContent({
        id,
        videoSrc: normalVideoSrc,
        header: `Location: ${accidentMarker.name}`,
      })
    );
    clearInterval(int);
  });
}

function handleWeather({ id, weatherType }) {
  const weatherTypeList = ["clear", "foggy", "rainy", "sunny", "night"];

  if (weatherTypeList.includes(weatherType)) {
  } else {
    alert("No such weather type!");
  }

  let weatherMarker = camData.filter((ele) => {
    return ele.id === id;
  });

  if (weatherMarker.length === 0) {
    alert("No weatherMarker marker found!");
  }

  weatherMarker = weatherMarker[0];

  // weatherMarker.marker.setIcon();

  const weatherVideoSrc = `./video/weather-combined/${weatherType}.mp4`;
  const textContentWeather = `Current weather: ${weatherType}`;
  weatherMarker.marker.setPopupContent(
    getPopupContent({
      id,
      videoSrc: weatherVideoSrc,
      header: `Location: ${weatherMarker.name}`,
      subheader: textContentWeather,
    })
  );
}

setTimeout(function () {
  alert("Accident Happened!");
  handleAccident({
    id: "0001",
    videoSrc: "./video/traffic-accident.mp4",
    unitySrc: "./unity3d-accident.html",
  });
}, 4000);

setTimeout(function () {
  handleWeather({
    id: "0067",
    weatherType: "foggy",
  });
  handleWeather({
    id: "0007",
    weatherType: "rainy",
  });
}, 10);

// function onMapClick(e) {
//     let colIcon = L.marker(e.latlng,{icon:camredIcon}).addTo(DTMap);
//     colIcon.bindPopup("<h1> A collision happens </h1>");
// }
// map.on('click', onMapClick);

// Accident detected: two vehicle crash
// Location: *** Highway
// Happened time：
// duration：time(dynamic)
// 1/2 lanes affected

// -------------- questions
// if (timerEle) {
//   timerEle.textContent = `Time since the accident occurred: ${timeElapsed}s`;
// }
// time between alert and icon flashing
// function input with {}

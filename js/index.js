// Load map for camera sensor page
const DTMap = L.map("camera-sensor-map").setView([43.063, -89.42], 13);
// Load OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 19,
}).addTo(DTMap);

//Define cameras
// let camIcon = L.Icon.extend({
//   options: {
//     shadowUrl: "./icon/Cam_shadow.png",
//     popupAnchor: [0, -20],
//     iconSize: [47, 24], // size of the icon
//     shadowSize: [57, 19.0], // size of the shadow
//   },
// });
// let camblueIcon = new camIcon({
//   iconUrl: "./icon/Cam.png",
//   // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//   // shadowAnchor: [4, 62],  // the same for the shadow
// });
// let camredIcon = new camIcon({
//   iconUrl: "./icon/Cam_red.png",
//   className: "camera-circle-breath",
// });
// let camfogIcon = new camIcon({
//   iconUrl: "./icon/Cam_fog.png",
//   iconSize: [107.2, 47.1],
// });

//Define cameras
let camIcon = L.Icon.extend({
  options: {
    popupAnchor: [0, -20],
    iconSize: [48, 48], // size of the icon
  },
});
let camBasicIcon = new camIcon({
  iconUrl: "./icon/Version-2/basic.png",
});
let camCloudyIcon = new camIcon({
  iconUrl: "./icon/Version-2/cloudy.png",
  iconSize: [55, 55],
});
let camFoggyIcon = new camIcon({
  iconUrl: "./icon/Version-2/foggy.png",
  iconSize: [55, 55],
});
let camRainyIcon = new camIcon({
  iconUrl: "./icon/Version-2/rainy.png",
  iconSize: [55, 55],
});
let camSnowyIcon = new camIcon({
  iconUrl: "./icon/Version-2/snowy.png",
  iconSize: [55, 55],
});
let camAccidentIcon = new camIcon({
  iconUrl: "./icon/Version-2/accident.png",
  iconSize: [55, 55],
  className: "camera-circle-breath",
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

let initialTimeLabels = [{ time: new Date(), flow: 0, speed: 0 }].map(
  (item) => item.time,
);
let initialFlowData = [{ time: new Date(), flow: 0, speed: 0 }].map(
  (item) => item.flow,
);
let initialSpeedData = [{ time: new Date(), flow: 0, speed: 0 }].map(
  (item) => item.speed,
);

// Chart.js logic starts here
function SeededRandom(seed) {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

const generateData = (
  camDataItem,
  startHour,
  numberOfIntervals,
  startDate = new Date(),
) => {
  const data = [];
  let currentDate = new Date(startDate.getTime());

  // Set the initial time
  currentDate.setHours(startHour, 0, 0, 0);

  let seed = Array.from(camDataItem.id).reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0,
  );
  const random = SeededRandom(seed);

  for (let i = 0; i < numberOfIntervals; i++) {
    // Format the date into 'YYYY-MM-DDTHH:MM:SS'
    const formattedDate = currentDate.toISOString().split(".")[0];

    // Generate random flow and speed values
    const flow = Math.floor(random() * 400) + 1800; // Random number between 50 and 150
    const speed = Math.floor(random() * 10) + 55; // Random number between 30 and 80

    data.push({ time: formattedDate, flow: flow, speed: speed });

    // Increment the time by 5 minutes
    currentDate.setMinutes(currentDate.getMinutes() + 5);
  }

  return data;
};

camData.forEach((item) => {
  // Generate data for 2 hours starting from 8 AM, with 5-minute intervals
  item.trafficData = generateData(item, 8, 24);
});

const trafficFlowCtx = document.getElementById("traffic-flow-chart");
const trafficSpeedCtx = document.getElementById("traffic-speed-chart");

const trafficFlowChart = new Chart(trafficFlowCtx, {
  type: "line",
  data: {
    labels: initialTimeLabels,
    datasets: [
      {
        label: "Traffic Flow",
        data: initialFlowData,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  },
  responsive: true,
  options: {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "minute",
        },
      },
      y: {
        title: {
          text: "Flow (vph)",
          display: true,
        },
        min: 0,
        max: 3000,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Traffic Flow",
      },
    },
  },
});

const trafficSpeedChart = new Chart(trafficSpeedCtx, {
  type: "line",
  data: {
    labels: initialTimeLabels,
    datasets: [
      {
        label: "Traffic Speed",
        data: initialSpeedData,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  },
  responsive: true,
  options: {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "minute",
        },
      },
      y: {
        title: {
          text: "Speed (mph)",
          display: true,
        },
        min: 0,
        max: 90,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Traffic Speed",
      },
    },
  },
});

// Add marker, videoSrc, textContent att into camData
// Marker bindpopup
camData.forEach(function (ele) {
  const marker = L.marker(ele.location, { icon: camBasicIcon }).addTo(DTMap);
  ele.marker = marker;
  const videoSrc = `https://cctv2.dot.wi.gov:443/rtplive/CCTV-13-${ele.id}/playlist.m3u8`;
  ele.videoSrc = videoSrc;
  const textContent = `Location:${ele.name}`;
  // ele.textContent = textContent;
  marker.bindPopup(
    getPopupContent({
      id: ele.id,
      videoSrc: videoSrc, // Pass the dynamically constructed URL here
      header: textContent,
    }),
    {
      maxWidth: 1000,
      maxHeight: 500,
    },
  );
  marker.on("popupopen", (popup) => {
    trafficFlowChart.data.labels = ele.trafficData.map((item) => item.time);
    trafficSpeedChart.data.labels = ele.trafficData.map((item) => item.time);
    trafficFlowChart.data.datasets[0].data = ele.trafficData.map(
      (item) => item.flow,
    );
    trafficSpeedChart.data.datasets[0].data = ele.trafficData.map(
      (item) => item.speed,
    );
    trafficFlowChart.update();
    trafficSpeedChart.update();
  });
  marker.on("popupclose", (popup) => {
    trafficFlowChart.data.labels = [
      { time: new Date(), flow: 0, speed: 0 },
    ].map((item) => item.time);
    trafficSpeedChart.data.labels = [
      { time: new Date(), flow: 0, speed: 0 },
    ].map((item) => item.time);
    trafficFlowChart.data.datasets[0].data = [
      { time: new Date(), flow: 0, speed: 0 },
    ].map((item) => item.flow);
    trafficSpeedChart.data.datasets[0].data = [
      { time: new Date(), flow: 0, speed: 0 },
    ].map((item) => item.speed);
    trafficFlowChart.update();
    trafficSpeedChart.update();
  });
    marker.on('popupopen', (popup) => {
        // Use marker property to identify the camera ID
        const cameraId = ele.id; // Assume each marker has a cameraId property
        initializeVideoPlayback(cameraId);
    });
  });

function getVideoSourceUrlById(id) {
  let videoSrc;
  if (id === "0175") {
    // If the id is "0175", use cctv1 in the URL
    videoSrc = `https://cctv1.dot.wi.gov:443/rtplive/CCTV-13-${id}/playlist.m3u8`;
  } else {
    // For all other ids, use cctv2 in the URL
    videoSrc = `https://cctv2.dot.wi.gov:443/rtplive/CCTV-13-${id}/playlist.m3u8`;
  }
  return videoSrc;
}

function initializeVideoPlayback(videoId) {
  const videoElement = document.getElementById(`video-${videoId}`);
  const videoSrc = getVideoSourceUrlById(videoId); // Dynamically get the video source URL

  if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
          videoElement.play();
      });
  } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = videoSrc;
      videoElement.play();
  }
}


function getPopupContent({ id, videoSrc, unitySrc, header, subheader }) {
  videoSrc = getVideoSourceUrlById(id);
  return `
    <div class="popup-wrapper">
        <h2 class="popup-header">${header}</h2>
        <p class="popup-subheader">${subheader || ""}</p>
        <div class="vis-container">
        <video id="video-${id}" width="480" controls autoplay muted class="video-stream">
                <source src="${videoSrc}" type="application/x-mpegURL">
        </video>
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

  accidentMarker.marker.setIcon(camAccidentIcon);
  const textContentAccident = `Accident detected: two vehicle collided, one of two lanes affected.<br/><span id="pop-up-timer-${accidentMarker.id}">Time since the accident occurred: 0s</span>`;
  accidentMarker.marker.setPopupContent(
    getPopupContent({
      id,
      videoSrc,
      unitySrc,
      header: `Location: ${accidentMarker.name}`,
      subheader: textContentAccident,
    }),
  );
  const int = setInterval(() => {
    timeElapsed += 1;
    const timerEle = document.getElementById(
      "pop-up-timer-" + accidentMarker.id,
    );
    if (timerEle) {
      timerEle.textContent = `Time since the accident occurred: ${timeElapsed}s`;
    }
  }, 1000);

  const normalVideoSrc = `./video/normal-transcoded/${accidentMarker.id}-output-h264.mp4`;
  accidentMarker.marker.on("popupclose", function () {
    accidentMarker.marker.setIcon(camBasicIcon);
    accidentMarker.marker.setPopupContent(
      getPopupContent({
        id,
        videoSrc: normalVideoSrc,
        header: `Location: ${accidentMarker.name}`,
      }),
    );
    clearInterval(int);
  });
}

function handleWeather({ id, weatherType }) {
  const weatherTypeList = ["basic", "cloudy", "foggy", "rainy", "snowy"];
  // Create an object to store the mappings
  const iconObjectMap = {
    basic: camBasicIcon,
    cloudy: camCloudyIcon,
    foggy: camFoggyIcon,
    rainy: camRainyIcon,
    snowy: camSnowyIcon,
  };
  // Function to get the object based on the input string
  function getIconObjectByInputWeather(inputWeather) {
    return iconObjectMap[inputWeather];
  }

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

  weatherMarker.marker.setIcon(getIconObjectByInputWeather(weatherType));

  const weatherVideoSrc = `./video/weather-combined/${weatherType}.mp4`;
  const textContentWeather = `Current weather: ${weatherType}`;
  weatherMarker.marker.setPopupContent(
    getPopupContent({
      id,
      videoSrc: weatherVideoSrc,
      header: `Location: ${weatherMarker.name}`,
      subheader: textContentWeather,
    }),
  );
}

setTimeout(function () {
  alert("Accident Happened!");
  handleAccident({
    id: "0004",
    videoSrc: "./video/traffic-accident.mp4",
    unitySrc: "./unity3d-accident.html",
  });
}, 10000);

setTimeout(function () {
  handleWeather({
    id: "0006",
    weatherType: "rainy",
  });
  handleWeather({
    id: "0007",
    weatherType: "rainy",
  });
}, 10);

setTimeout(function () {
  handleWeather({
    id: "0062",
    weatherType: "rainy",
  });
  handleWeather({
    id: "0178",
    weatherType: "rainy",
  });
  handleWeather({
    id: "0049",
    weatherType: "rainy",
  });
  handleWeather({
    id: "0061",
    weatherType: "rainy",
  });
  handleWeather({
    id: "0175",
    weatherType: "rainy",
  });
  handleWeather({
    id: "0005",
    weatherType: "rainy",
  });
}, 5000);

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

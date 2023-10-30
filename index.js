// Load map
const DTMap = L.map("Madison").setView([43.063, -89.42], 13);
// Load OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 19,
    }).addTo(DTMap);

//Define cameras
let camIcon = L.Icon.extend({
    options: {
        shadowUrl: './icon/Cam_shadow.png',
        popupAnchor:  [0, -20],
        iconSize:     [47, 24], // size of the icon
        shadowSize:   [57, 19.0], // size of the shadow
    }
});
let camblueIcon = new camIcon({
    iconUrl: './icon/Cam.png',
    // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
});
let camredIcon = new camIcon({
    iconUrl: './icon/Cam_red.png',
    className: 'camera-circle-breath'
  })
let camfogIcon = new camIcon({
    iconUrl: './icon/Cam_fog.png',
    iconSize:     [107.2, 47.1],
})

// Define camData
const camData = [
    {   
        id: '0067',
        location: [43.09, -89.521],
        name:'W Beltine Hwy (43.09, -89.521)',
    },
    {   
        id: '0066',
        location: [43.075, -89.522],
        name:'W Beltine Hwy (43.075, -89.522)'
    },
    {   
        id: '0065',
        location: [43.0605, -89.522],
        name:'W Beltine Hwy (43.0605, -89.522)'
    },
    {   
        id: '0035',
        location: [43.053, -89.503],
        name:'W Beltine Hwy (43.053, -89.503)',
    },
    {   
        id: '0001',
        location: [43.046, -89.473],
        name:'W Beltine Hwy (43.046, -89.473)',
    },
    {   
        id: '0002',
        location: [43.037, -89.452],
        name:'W Beltine Hwy (43.037, -89.452)',
    },
    {   
        id: '0003',
        location: [43.035, -89.443],
        name:'W Beltine Hwy (43.035, -89.443)',
    },
    {   
        id: '0025',
        location: [43.0355, -89.423],
        name:'W Beltine Hwy (43.0355, -89.423)',
    },
    {   
        id: '0005',
        location: [43.0345, -89.406],
        name:'W Beltine Hwy (43.0345, -89.406)',
    },
    {   
        id: '0004',
        location: [43.036, -89.393],
        name:'W Beltine Hwy (43.036, -89.393)',
    },
    {   
        id: '0049',
        location: [43.0405, -89.378],
        name:'W Beltine Hwy (43.0405, -89.378)',
    },
    {   
        id: '0061',
        location: [43.0435, -89.369],
        name:'W Beltine Hwy (43.0435, -89.369)',
    },
    {   
        id: '0175',
        location: [43.046, -89.357],
        name:'W Beltine Hwy (43.046, -89.357)',
    },
    {   
        id: '0062',
        location: [43.0415, -89.349],
        name:'W Beltine Hwy (43.0415, -89.349)',

    },
    {   
        id: '0178',
        location: [43.044, -89.336],
        name:'W Beltine Hwy (43.044, -89.336)',
    },
    {   
        id: '0006',
        location: [43.0445, -89.323],
        name:'W Beltine Hwy (43.0445, -89.323)',
    },
    {   
        id: '0007',
        location: [43.0455, -89.306],
        name:'W Beltine Hwy (43.0455, -89.306)',
    },
]
// Add videoSrc and marker att into camData, marker bindpopup
camData.forEach(function(ele){
    const videoSrc = `./video/transcoded/${ele.id}-output-h264.mp4`
    const marker = L.marker(ele.location,{icon:camblueIcon}).addTo(DTMap);
    ele.marker = marker;
    marker.bindPopup(getPopupContent({id: ele.id, name: ele.name, videoSrc}), {maxWidth: 1000});
})

function getPopupContent({id, name, videoSrc, unitySrc}){
    return `<h1> Location: ${name}</h1>
    <div class="vis-container">
        <video src='${videoSrc}' width='480' controls autoplay type='video/mp4' muted> </video>
        <iframe class='unity 3d' frameborder='0' width='480' height='320' src='${unitySrc || "./unity3d-normal.html?modelID=" + id}'/> 
    </div>
   `
}

function handleAccident({id, videoSrc, unitySrc}){
    let accidentMarker = camData.filter(ele => {
        return ele.id === id
    })

    if (accidentMarker.length === 0){
        alert ("No accident marker found!")
    }

    accidentMarker = accidentMarker[0]

    accidentMarker.marker.setIcon(camredIcon)
    accidentMarker.marker.setPopupContent(getPopupContent({id, name: accidentMarker.name, videoSrc, unitySrc}))

    const normalVideoSrc = `./video/transcoded/${accidentMarker.id}-output-h264.mp4`;
    accidentMarker.marker.on('popupclose', function() {
        accidentMarker.marker.setIcon(camblueIcon)
        accidentMarker.marker.setPopupContent(getPopupContent({id, name: accidentMarker.name, videoSrc: normalVideoSrc}))
    })
}
           
setTimeout(function(){  
    alert("Accident Happened!");
   handleAccident({id: '0001', videoSrc: './video/TrafficAccident.mp4', unitySrc: './unity3d-accident.html'})
  }, 4000);

// function onMapClick(e) {
//     let colIcon = L.marker(e.latlng,{icon:camredIcon}).addTo(DTMap);
//     colIcon.bindPopup("<h1> A collision happens </h1>");
// }
// map.on('click', onMapClick);
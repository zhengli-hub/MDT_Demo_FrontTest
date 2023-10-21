// Prepare the map

const map = L.map('my-map').setView([43.063, -89.42], 13); // Set the centre point and zoom level

// Load OpenStreetMap as tile
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 19,
}).addTo(map);

// Load all the cameras
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
})
let camfogIcon = new camIcon({
    iconUrl: './icon/Cam_fog.png',
    iconSize:     [107.2, 47.1],
})

const Num_of_cams = 17;
const Id_of_cams = ['0067','0066','0065','0035','0001','0002','0003','0025','0005','0004','0049','0061','0175','0062','0178','0006','0007']
const Loc_of_cams = [[43.09, -89.521],[43.075, -89.522],[43.0605, -89.522],[43.053, -89.503],[43.046, -89.473],[43.037, -89.452],[43.035, -89.443],[43.0355, -89.423],[43.0345, -89.406],[43.036, -89.393],[43.0405, -89.378],[43.0435, -89.369],[43.046, -89.357],[43.0415, -89.349],[43.044, -89.336],[43.0445, -89.323],[43.0455, -89.306]];

Loc_of_cams.length == Num_of_cams ? "" : alert("Number of cameras and locations don't match!");

let Src_of_cams = [];
for (let cam_i=1; cam_i<Num_of_cams; cam_i++){
    Src_of_cams[cam_i] = "./video/transcoded/"+Id_of_cams[cam_i]+"-output-h264.mp4";
    // console.log(Id_of_cams[cam_i])
    window[`marker_cam_${cam_i}`] = L.marker(Loc_of_cams[cam_i],{icon:camblueIcon}).addTo(map);
    window[`marker_cam_${cam_i}`].bindPopup("<h1> ID:"+Id_of_cams[cam_i]+"</h1>" +
    "<video src="+Src_of_cams[cam_i]+" width='480' controls autoplay type='video/mp4'> </video>" +
    "<iframe class='unity 3d' frameborder='0' width='480' height='320' src='./unity3d.html?modelID="+Id_of_cams[cam_i]+"'> </iframe>");
}

function onMapClick(e) {
    let colIcon = L.marker(e.latlng,{icon:camredIcon}).addTo(map);
    colIcon.bindPopup("<h1> A collision happens </h1>");
}

map.on('click', onMapClick);
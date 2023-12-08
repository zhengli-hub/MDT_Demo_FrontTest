// Load map for pavement sensor page
const PaveMap = L.map("pavement-map").setView([43.063, -89.42], 13);
// Load OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 19,
}).addTo(PaveMap);
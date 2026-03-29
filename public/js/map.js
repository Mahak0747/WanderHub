const lat = listingData.geo ? listingData.geo.lat : 28.6139;
const lng = listingData.geo ? listingData.geo.lng : 77.2090;

const map = L.map('map').setView([lat, lng], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.marker([lat, lng]).addTo(map)
    .bindPopup(`<b>${listingData.title}</b><br>${listingData.location}`)
    .openPopup();
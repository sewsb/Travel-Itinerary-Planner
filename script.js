let map, route, waypoints = [];

function checkLogin() {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    window.location.href = "index.html";
  }
  initMap();
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

function initMap() {
  map = L.map('map').setView([20.5937, 78.9629], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  map.on('click', addWaypoint);
}

function addWaypoint(e) {
  const { lat, lng } = e.latlng;
  waypoints.push([lat, lng]);
  L.marker([lat, lng]).addTo(map);
  updateTripList();
  drawRoute();
}

function drawRoute() {
  if (route) map.removeLayer(route);
  if (waypoints.length >= 2) {
    route = L.polyline(waypoints, { color: '#6C63FF', weight: 4 }).addTo(map);
  }
}

function updateTripList() {
  const list = document.getElementById("tripList");
  list.innerHTML = "";
  waypoints.forEach((wp, i) => {
    const li = document.createElement("li");
    li.textContent = `Stop ${i + 1}: ${wp[0].toFixed(2)}, ${wp[1].toFixed(2)}`;
    list.appendChild(li);
  });
}

function clearTrip() {
  waypoints = [];
  if (route) map.removeLayer(route);
  document.getElementById("tripList").innerHTML = "";
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) map.removeLayer(layer);
  });
}

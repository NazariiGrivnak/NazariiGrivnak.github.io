let map, userMarker, watchId = null;
const markers = [];

// Ініціалізація карти
function initMap(latitude, longitude) {
    map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    addMarker(latitude, longitude, "Ваше місцезнаходження");
}

// Додавання маркера на карту
function addMarker(latitude, longitude, message) {
    const marker = L.marker([latitude, longitude]).addTo(map)
        .bindPopup(message)
        .openPopup();
    markers.push(marker);
}

// Оновлення маркера та позиції карти
function updateMap(latitude, longitude) {
    map.setView([latitude, longitude], 13);
    addMarker(latitude, longitude, `Широта: ${latitude}, Довгота: ${longitude}, Час: ${new Date().toLocaleTimeString()}`);
}

// Відображення поточного місцезнаходження користувача
function displayLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    if (!map) {
        initMap(latitude, longitude);
    } else {
        updateMap(latitude, longitude);
    }
}

// Обробник помилки
function errorHandler(error) {
    console.error(`Помилка: ${error.message}`);
}

// Перехід до координат призначення
document.getElementById('goToDestination').addEventListener('click', () => {
    const destLat = parseFloat(document.getElementById('destLat').value);
    const destLng = parseFloat(document.getElementById('destLng').value);

    if (!isNaN(destLat) && !isNaN(destLng)) {
        map.setView([destLat, destLng], 13);
        addMarker(destLat, destLng, "Пункт призначення");
    } else {
        alert("Будь ласка, введіть коректні координати.");
    }
});

// Запуск відстеження
watchId = navigator.geolocation.watchPosition(displayLocation, errorHandler);

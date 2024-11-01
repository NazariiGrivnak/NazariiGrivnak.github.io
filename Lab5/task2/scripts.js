let watchId = null;

document.getElementById('watchButton').addEventListener('click', () => {
    if (!watchId) {
        watchId = navigator.geolocation.watchPosition(displayLocation, errorHandler);
    }
});

document.getElementById('clearWatchButton').addEventListener('click', () => {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        document.getElementById('location').textContent = 'Відстеження зупинено.';
    }
});

function displayLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    document.getElementById('location').textContent = `Широта: ${latitude}, Довгота: ${longitude}`;
}

function errorHandler(error) {
    document.getElementById('location').textContent = `Помилка: ${error.message}`;
}

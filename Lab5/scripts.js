function displayLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    document.getElementById('location').textContent = `Широта: ${latitude}, Довгота: ${longitude}`;
    
    // Координати коледжу
    const collegeLat = 49.8397;
    const collegeLng = 24.0297;
    const distance = computeDistance(latitude, longitude, collegeLat, collegeLng);
    document.getElementById('distance').textContent = `Відстань до коледжу: ${distance.toFixed(2)} км`;
}

function errorHandler(error) {
    document.getElementById('location').textContent = `Помилка визначення місцезнаходження: ${error.message}`;
}

function computeDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

navigator.geolocation.getCurrentPosition(displayLocation, errorHandler);

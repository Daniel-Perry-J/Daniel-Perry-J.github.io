const issApiUrl = 'http://api.open-notify.org/iss-now.json';

function updateIssPosition(latitude, longitude) {
    const data = document.querySelector('.coords div h3')
    if (data == null) {
        const coordsContainer = document.querySelector('.coords');
        const coords = document.createElement('div');
        coords.innerHTML = `
        <h3>The International Space Station is currently at (latitude=${latitude}, longitude=${longitude})!</h3>`;
        coordsContainer.appendChild(coords);
    } else {
        data.textContent = `The International Space Station is currently at (latitude=${latitude}, longitude=${longitude})!`;
    }
}

function fetchIssLocation() {
    fetch(issApiUrl)
    .then(response => response.json())
    .then(data => {
        const { latitude, longitude } = data.iss_position;
        // Update the website with the ISS's current position
        updateIssPosition(latitude, longitude);
    })
    .catch(error => console.error('Error fetching ISS data:', error));
}

// Call this function at regular intervals to get live updates
setInterval(fetchIssLocation, 1000); // updates every 1 second or 1000 milliseconds

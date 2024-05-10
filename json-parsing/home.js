// The URL of the JSON data
const url = 'https://raw.githubusercontent.com/unnamedActant/Example_JSON/main/astros.json';

// Function to create astronaut elements
function displayAstronauts(data) {
    const astronautsContainer = document.querySelector('.astronauts');
    data.people.forEach(astronaut => {
        const astronautElement = document.createElement('div');
        astronautElement.classList.add('astronaut');
        astronautElement.innerHTML = `
        <h2>${astronaut.name}</h2>
        <figure>
        <img scr="imgs/${astronaut.name}.jpg" alt="${astronaut.name}">
        </figure>
        <p>Currently stationed aboard the ${astronaut.craft}</p>
      `;
        astronautsContainer.appendChild(astronautElement);
    });
}

// Function load img
function loadImg(name) {
    switch (name) {
        case "Jasmin Moghbeli":
            return 'https://images-assets.nasa.gov/image/NHQ202009080004/NHQ202009080004~orig.jpg';
            break;
        case "Andreas Mogensen":
            return 'https://images-assets.nasa.gov/image/NHQ202403120005/NHQ202403120005~orig.jpg'
            break;
        case "Satoshi Furukawa":
            return 'https://images-assets.nasa.gov/image/jsc2010e066419/jsc2010e066419~orig.jpg';
            break;
        case "Konstantin Borisov":
            return 'https://images-assets.nasa.gov/image/NHQ202403120007/NHQ202403120007~orig.jpg';
            break;
        case "Oleg Kononenko":
            return 'https://images-assets.nasa.gov/image/jsc2002e43168/jsc2002e43168~orig.jpg';
            break;
        case "Nikolai Chub":
            return 'https://images-assets.nasa.gov/image/jsc2023e052792/jsc2023e052792~orig.jpg';
            break;
        case "Loral O'Hara" :
            return 'https://live.staticflickr.com/1888/29826576327_a03b366a51_b.jpg';
            break;
        default:
            return null;
    }
}

// Function to create displayed counter
function displayCounter(data) {
    const counterContainer = document.querySelector('.counter');
    const counter = document.createElement('div');
    counter.innerHTML = `
    <h3>Number of Astronauts currently in space : ${data.number}</h3>`;
    counterContainer.appendChild(counter);
}

// Fetch the JSON data from the URL
fetch(url)
    .then(response => response.json()) // Parse the JSON from the response
    .then(data => {
        // Now `data` is a JavaScript object containing the JSON data
        // Call the function to display astronauts with the fetched data
        displayAstronauts(data);
        displayCounter(data);
    })
    .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error fetching JSON data:', error);
    });




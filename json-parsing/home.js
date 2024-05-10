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
        <img scr="imgs/${loadImg(astronaut.name)}" alt="${astronaut.name}">
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
            return 'Jasmin-Moghbeli.jpg';
            break;
        case "Andreas Mogensen":
            return 'Andreas-Mogensen.jpg'
            break;
        case "Satoshi Furukawa":
            return 'Satoshi-Furukawa.jpg';
            break;
        case "Konstantin Borisov":
            return 'Konstantin-Borisov.jpg';
            break;
        case "Oleg Kononenko":
            return 'Oleg-Kononenko.jpg';
            break;
        case "Nikolai Chub":
            return 'Nikolai-Chub.jpg';
            break;
        case "Loral O'Hara" :
            return "Loral-O'Hara.jpg";
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




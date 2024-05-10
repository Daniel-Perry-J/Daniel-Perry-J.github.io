// Array of planet names
const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

// Function to add planets to the section
function addPlanetsToSection(planets) {
  // Find the section with the class name "planets"
  const planetsSection = document.querySelector('.planets');

  // Clear the section before adding new content
  planetsSection.innerHTML = '';

  // Loop through the array of planets
  planets.forEach(planet => {
    // special element
    var distanceFromSun = `<p>The ${planets.indexOf(planet) + 1}st planet from the sun</p>`;
    switch (planets.indexOf(planet) + 1) {
        case 1 : 
        distanceFromSun = `<p>The ${planets.indexOf(planet) + 1}st planet from the sun</p>`;
            break;
        case 2 :
            distanceFromSun = `<p>The ${planets.indexOf(planet) + 1}nd planet from the sun</p>`;
            break;
        case 3 :
            distanceFromSun = `<p>The ${planets.indexOf(planet) + 1}rd planet from the sun</p>`;
            break;
        default:
            distanceFromSun = `<p>The ${planets.indexOf(planet) + 1}th planet from the sun</p>`;
            break;
    }
    // Create the HTML for each planet
    const planetHtml = `
      <div class="planetContainer">
        <div class="imageContainer">
          <h2 class="planetName">${planet}</h2>
          <figure>
            <img src="imgs/${planet.toLowerCase()}.jpg" alt="Planet ${planet}">
          </figure>
        </div>
        <div class="planetdata">
          ${distanceFromSun}
          <!-- Import Json Data here -->
        </div>
      </div>
    `;

    // Add the planet HTML to the section
    planetsSection.innerHTML += planetHtml;
  });
}

// Call the function to add the planets to the section
addPlanetsToSection(planets);

// Fetch Film Data Using Arrow Functions
function fetchFilm() {
    const filmId = document.getElementById("filmId").value;

    if (!filmId || filmId < 1 || filmId > 6) {
        alert("Please enter a valid Film ID (1-6)");
        return;
    }

    const apiUrl = `https://swapi.dev/api/films/${filmId}/`;

    // Using arrow functions
    fetch(apiUrl)
        .then(response => response.json())  // Parse JSON response
        .then(data => {
            displayFilmData(data);          // Display film data
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('output').textContent = 'Error fetching data.';
        });
}

// Function to display film data in the output section
function displayFilmData(data) {
    const output = `
    Title: ${data.title}
    Director: ${data.director}
    Producer: ${data.producer}
    Release Date: ${data.release_date}
    Opening Crawl: ${data.opening_crawl}
    `;
    document.getElementById('output').textContent = output;
}

// Version using traditional anonymous functions
function fetchFilmWithTraditionalFunctions() {
    const filmId = document.getElementById("filmId").value;
    const apiUrl = `https://swapi.dev/api/films/${filmId}/`;

    fetch(apiUrl)
        .then(function(response) {
            return response.json();  // Parse JSON response
        })
        .then(function(data) {
            displayFilmData(data);  // Display the fetched data
        })
        .catch(function(error) {
            console.log('Error:', error);
            document.getElementById('output').textContent = 'Error fetching data.';
        });
}

// Version using named functions
function handleResponse(response) {
    return response.json();
}

function handleFilmData(data) {
    displayFilmData(data);  // Display the fetched data
}

function handleError(error) {
    console.log('Error:', error);
    document.getElementById('output').textContent = 'Error fetching data.';
}

function fetchFilmWithNamedFunctions() {
    const filmId = document.getElementById("filmId").value;
    const apiUrl = `https://swapi.dev/api/films/${filmId}/`;

    fetch(apiUrl)
        .then(handleResponse)  // Pass named functions
        .then(handleFilmData)
        .catch(handleError);
}

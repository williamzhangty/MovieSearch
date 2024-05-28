let movies = []; // Declare movies array to store fetched data

function loadMovies() {
    fetch('movies.json')
        .then(response => response.json())
        .then(data => {
            movies = data;
            console.log("Movies loaded:", movies);
        })
        .catch(error => console.error("Failed to load movies:", error));
}

function showSuggestions(value) {
    console.log("showSuggestions called with value:", value);
    const suggestions = document.getElementById("suggestions");
    suggestions.innerHTML = ''; // Clear previous suggestions

    if (value.trim() === '') {
        suggestions.style.display = 'none'; // Hide suggestions if input is empty
        return;
    }

    suggestions.style.display = 'block'; // Make sure the suggestion box is visible

    let filteredMovies = movies.filter(movie => movie.name.toLowerCase().includes(value.toLowerCase()));

    if (filteredMovies.length === 0) {
        suggestions.innerHTML = '<div>Not found</div>';
    } 
    
    else {
        filteredMovies.forEach(movie => {
            const div = document.createElement('div');
            div.textContent = movie.name;
            div.addEventListener('click', () => {
                document.getElementById("searchInput").value = movie.name;
                suggestions.style.display = 'none'; // Hide suggestions after selection
            });
            suggestions.appendChild(div);
        });
    }
}

function findMovie() {
    const input = document.getElementById("searchInput").value;
    const movieInfo = document.getElementById("movieInfo");
    const movie = movies.find(movie => movie.name.toLowerCase() === input.toLowerCase());

    if (movie) {
        const genres = movie.genres ? movie.genres.map(genre => `<button class="genre-button">${genre}</button>`).join(' ') : 'Genres not available';
        movieInfo.innerHTML = `
            <div class="movie-details">
                <div class="movie-img">
                    <img src="${movie.image}" alt="${movie.name}">
                </div>
                <div class="movie-text">
                    <h2>${movie.name}</h2>
                    <p>${movie.year} &nbsp;&bull;&nbsp; ${movie.duration}</p>
                    <p>${movie.description}</p>
                    <p>${genres}</p>
                </div>
            </div>
        `;
        movieInfo.style.display = 'block';
    } else {
        movieInfo.innerHTML = 'Movie not found';
        movieInfo.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("searchInput").addEventListener("input", function() {
        console.log("Input event fired");
        showSuggestions(this.value);
    });

    loadMovies();
});
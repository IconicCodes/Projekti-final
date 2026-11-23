const favoriteContainer = document.getElementById("favoriteCars");
const emptyFavorites = document.getElementById("emptyFavorites");

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

function getFavorites() {
    try {
        const favorites = JSON.parse(localStorage.getItem("ledriFavorites"));
        return Array.isArray(favorites) ? favorites : [];
    } catch {
        return [];
    }
}

function renderFavorites() {
    const favoriteIds = getFavorites();
    const favoriteCars = getAllCars().filter(car => favoriteIds.includes(car.id));

    favoriteContainer.innerHTML = favoriteCars.map(car => `
        <article class="car-card">
            <img class="car-image"
                 src="${escapeHTML(car.image)}"
                 alt="${escapeHTML(car.brand)} ${escapeHTML(car.model)}"
                 onerror="this.src='https://placehold.co/800x500?text=Vehicle'">
            <div class="car-info">
                <h3>${escapeHTML(car.brand)} ${escapeHTML(car.model)}</h3>
                <div class="car-specs">
                    <span>${escapeHTML(car.year)}</span>
                    <span>${Number(car.mileage).toLocaleString()} km</span>
                    <span>${escapeHTML(car.fuel)}</span>
                    <span>${escapeHTML(car.transmission)}</span>
                </div>
                <div class="car-bottom">
                    <span class="car-price">€${Number(car.price).toLocaleString()}</span>
                    <a href="details.html?id=${encodeURIComponent(car.id)}" class="details-link">Details ↗</a>
                    <button class="favorite-btn active" data-car-id="${Number(car.id)}"
                            onclick="removeFavorite(${Number(car.id)})"
                            aria-label="Remove ${escapeHTML(car.brand)} ${escapeHTML(car.model)} from favorites">♥</button>
                </div>
            </div>
        </article>
    `).join("");

    favoriteContainer.hidden = favoriteCars.length === 0;
    emptyFavorites.hidden = favoriteCars.length !== 0;
}

function removeFavorite(id) {
    const favorites = getFavorites().filter(carId => carId !== id);
    localStorage.setItem("ledriFavorites", JSON.stringify(favorites));
    renderFavorites();
}

renderFavorites();

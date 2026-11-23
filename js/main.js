
// gjen vendin ku shfaqen automjetet e vecuara ne faqen kryesore
const featuredContainer = document.getElementById("featuredCars");

// merr listen e automjeteve te ruajtura si te preferuara
function getFavorites() {
    return JSON.parse(localStorage.getItem("ledriFavorites")) || [];
}

// shton ose heq nje automjet nga te preferuarat dhe rifreskon kartat
function toggleFavorite(id) {
    let favorites = getFavorites();

    if (favorites.includes(id)) {
        favorites = favorites.filter(carId => carId !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem("ledriFavorites", JSON.stringify(favorites));
    renderFeaturedCars();
    window.animateFavoriteButton(id);
}

// krijon kartat e automjeteve te vecuara nga te dhenat e tyre
function renderFeaturedCars() {
    if (!featuredContainer) return;

    const favorites = getFavorites();

    featuredContainer.innerHTML = getAllCars().slice(0, 6).map(car => `
        <article class="car-card">
            <img class="car-image"
                 src="${car.image}"
                 alt="${car.brand} ${car.model}"
                 onerror="this.src='https://placehold.co/800x500?text=Vehicle'">

            <div class="car-info">
                <h3>${car.brand} ${car.model}</h3>

                <div class="car-specs">
                    <span>${car.year}</span>
                    <span>${car.mileage.toLocaleString()} km</span>
                    <span>${car.fuel}</span>
                    <span>${car.transmission}</span>
                </div>

                <div class="car-bottom">
                    <span class="car-price">
                        €${car.price.toLocaleString()}
                    </span>

                    <a href="details.html?id=${car.id}"
                       class="details-link">Details ↗</a>

                    <button
                        class="favorite-btn ${favorites.includes(car.id) ? 'active' : ''}"
                        data-car-id="${car.id}"
                        onclick="toggleFavorite(${car.id})"
                        aria-label="Toggle favorite">
                        ${favorites.includes(car.id) ? '♥' : '♡'}
                    </button>
                </div>
            </div>
        </article>
    `).join("");
}

renderFeaturedCars();

// merr kerkimin e faqes kryesore dhe hap faqen e shfletimit me filtrat e zgjedhur
const searchForm = document.getElementById("searchForm");

if (searchForm) {
    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const search = document.getElementById("searchInput").value;
        const brand = document.getElementById("brandFilter").value;

        const params = new URLSearchParams();

        if (search) params.set("search", search);
        if (brand) params.set("brand", brand);

        window.location.href = `browse.html?${params.toString()}`;
    });
}

// hap faqen e shfletimit me marken qe zgjodhi perdoruesi
document.querySelectorAll(".brand-card").forEach(button => {
    button.addEventListener("click", () => {
        const brand = button.dataset.brand;

        window.location.href =
            `browse.html?brand=${encodeURIComponent(brand)}`;
    });
});

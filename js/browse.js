
// gjen elementet ku paraqiten automjetet, numri i rezultateve dhe gjendja bosh
const browseContainer = document.getElementById("browseCars");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

// ngarkon listen e plote te automjeteve nga ruajtja lokale
const allCars = getAllCars();

// lexon identifikuesit e automjeteve te preferuara
function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem("ledriFavorites")) || [];
    } catch {
        return [];
    }
}

// shnderron karakteret e rrezikshme para paraqitjes se tekstit ne html
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

// paraqet automjetet dhe perditeson numrin dhe gjendjen bosh
function displayCars(vehicleList) {
    const favorites = getFavorites();

    resultCount.textContent =
        `${vehicleList.length} vehicles found`;

    emptyState.hidden = vehicleList.length !== 0;
    browseContainer.style.display =
        vehicleList.length === 0 ? "none" : "grid";

    browseContainer.innerHTML = vehicleList.map(car => `
        <article class="car-card">

            <img
                class="car-image"
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

                    <span class="car-price">
                        €${Number(car.price).toLocaleString()}
                    </span>

                    <a href="details.html?id=${encodeURIComponent(car.id)}"
                       class="details-link">
                        Details ↗
                    </a>

                    <button
                        class="favorite-btn ${favorites.includes(car.id) ? 'active' : ''}"
                        data-car-id="${Number(car.id)}"
                        onclick="toggleFavorite(${Number(car.id)})">
                        ${favorites.includes(car.id) ? '♥' : '♡'}
                    </button>

                </div>

            </div>
        </article>
    `).join("");
}

// filtron automjetet sipas kerkimit, cmimit, markes dhe karakteristikave
function filterCars() {

    const search = document.getElementById("search").value.toLowerCase();
    const brand = document.getElementById("brand").value;
    const minPrice = Number(document.getElementById("minPrice").value);
    const maxPrice = Number(document.getElementById("maxPrice").value);
    const fuel = document.getElementById("fuel").value;
    const transmission = document.getElementById("transmission").value;
    const year = Number(document.getElementById("year").value);
    const maxMileage = Number(document.getElementById("maxMileage").value);

    let filteredCars = allCars.filter(car => {

        const matchesSearch =
            `${car.brand} ${car.model}`.toLowerCase().includes(search);

        const matchesBrand = !brand || car.brand === brand;

        const matchesMinPrice =
            !document.getElementById("minPrice").value ||
            car.price >= minPrice;

        const matchesMaxPrice =
            !document.getElementById("maxPrice").value ||
            car.price <= maxPrice;

        const matchesFuel = !fuel || car.fuel === fuel;

        const matchesTransmission =
            !transmission || car.transmission === transmission;

        const matchesYear = !year || car.year >= year;

        const matchesMileage =
            !document.getElementById("maxMileage").value ||
            car.mileage <= maxMileage;

        return matchesSearch &&
            matchesBrand &&
            matchesMinPrice &&
            matchesMaxPrice &&
            matchesFuel &&
            matchesTransmission &&
            matchesYear &&
            matchesMileage;
    });

    // rendit rezultatet sipas kriterit te zgjedhur
    const sort = document.getElementById("sort").value;

    if (sort === "priceLow") {
        filteredCars.sort((a, b) => a.price - b.price);
    }

    if (sort === "priceHigh") {
        filteredCars.sort((a, b) => b.price - a.price);
    }

    if (sort === "newest") {
        filteredCars.sort((a, b) => b.year - a.year);
    }

    if (sort === "year") {
        filteredCars.sort((a, b) => a.year - b.year);
    }

    if (sort === "mileage") {
        filteredCars.sort((a, b) => a.mileage - b.mileage);
    }

    displayCars(filteredCars);
}

// ndryshon listen e te preferuarave dhe rifreskon rezultatet
function toggleFavorite(id) {

    let favorites = getFavorites();

    if (favorites.includes(id)) {
        favorites = favorites.filter(carId => carId !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem(
        "ledriFavorites",
        JSON.stringify(favorites)
    );

    filterCars();
    window.animateFavoriteButton(id);
}

// rifreskon rezultatet sa here qe ndryshon nje filter ose renditja
document.querySelectorAll(
    ".filter-group input, .filter-group select, #sort"
).forEach(element => {

    element.addEventListener("input", filterCars);
    element.addEventListener("change", filterCars);

});

// pastron filtrat dhe rikthen renditjen fillestare
function resetFilters() {

    document.querySelectorAll(".filter-group input").forEach(input => {
        input.value = "";
    });

    document.querySelectorAll(".filter-group select").forEach(select => {
        select.value = "";
    });

    document.getElementById("sort").value = "newest";

    filterCars();
}

document.getElementById("clearFilters")
    .addEventListener("click", resetFilters);

document.getElementById("emptyReset")
    .addEventListener("click", resetFilters);

// vendos filtrat fillestare sipas parametrave te ardhur nga faqja kryesore
const params = new URLSearchParams(window.location.search);

document.getElementById("search").value =
    params.get("search") || "";

document.getElementById("brand").value =
    params.get("brand") || "";

// paraqet fillimisht automjetet qe perputhen me filtrat
filterCars();

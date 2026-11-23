const adminCars = document.getElementById("adminCars");

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

function renderAdmin() {
    const cars = getAllCars();
    const averagePrice = cars.length
        ? cars.reduce((sum, car) => sum + Number(car.price || 0), 0) / cars.length
        : 0;

    document.getElementById("totalCars").textContent = cars.length;
    document.getElementById("totalFavorites").textContent = getFavorites().length;
    document.getElementById("averagePrice").textContent =
        `€${Math.round(averagePrice).toLocaleString()}`;
    document.getElementById("customListings").textContent =
        cars.filter(car => car.isCustom).length;

    adminCars.innerHTML = cars.map(car => `
        <tr>
            <td>
                <strong>${escapeHTML(car.brand)} ${escapeHTML(car.model)}</strong>
                ${car.isCustom ? '<span class="custom-badge">Custom</span>' : ""}
            </td>
            <td>${escapeHTML(car.year)}</td>
            <td>€${Number(car.price).toLocaleString()}</td>
            <td>${Number(car.mileage).toLocaleString()} km</td>
            <td>
                <button class="delete-btn" onclick="deleteListing(${Number(car.id)})"
                        aria-label="Delete ${escapeHTML(car.brand)} ${escapeHTML(car.model)}">
                    Delete
                </button>
            </td>
        </tr>
    `).join("");
}

function deleteListing(id) {
    const car = getAllCars().find(item => item.id === id);
    if (!car) return;

    if (!window.confirm(`Delete ${car.brand} ${car.model}?`)) return;

    const remainingCars = getAllCars().filter(item => item.id !== id);
    saveAllCars(remainingCars);

    const favorites = getFavorites().filter(carId => carId !== id);
    localStorage.setItem("ledriFavorites", JSON.stringify(favorites));
    renderAdmin();
}

renderAdmin();

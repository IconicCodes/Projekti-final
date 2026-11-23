const vehicleDetails = document.getElementById("vehicleDetails");
const vehicleId = new URLSearchParams(window.location.search).get("id");
const vehicle = getAllCars().find(car => String(car.id) === vehicleId);

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

if (vehicle) {
    const specifications = [
        ["Year", vehicle.year],
        ["Mileage", `${Number(vehicle.mileage).toLocaleString()} km`],
        ["Fuel", vehicle.fuel],
        ["Transmission", vehicle.transmission],
        ["Body", vehicle.body],
        ["Engine", vehicle.engine],
        ["Horsepower", `${vehicle.horsepower} hp`]
    ].filter(([, value]) => value !== undefined && value !== null && value !== "");

    vehicleDetails.innerHTML = `
        <article class="vehicle-detail">
            <img class="vehicle-detail-image"
                 src="${escapeHTML(vehicle.image)}"
                 alt="${escapeHTML(vehicle.brand)} ${escapeHTML(vehicle.model)}">
            <div class="vehicle-detail-info">
                <a href="browse.html" class="details-link">← Back to vehicles</a>
                <h1>${escapeHTML(vehicle.brand)} ${escapeHTML(vehicle.model)}</h1>
                <p class="vehicle-detail-price">€${Number(vehicle.price).toLocaleString()}</p>
                ${vehicle.description ? `<p class="vehicle-description">${escapeHTML(vehicle.description)}</p>` : ""}
                <dl class="vehicle-specifications">
                    ${specifications.map(([label, value]) => `
                        <div>
                            <dt>${escapeHTML(label)}</dt>
                            <dd>${escapeHTML(value)}</dd>
                        </div>
                    `).join("")}
                </dl>
            </div>
        </article>
    `;

    const image = vehicleDetails.querySelector(".vehicle-detail-image");
    image.addEventListener("error", () => {
        image.src = "https://placehold.co/1200x800?text=Vehicle";
    }, { once: true });
} else {
    vehicleDetails.innerHTML = `
        <div class="empty-state">
            <h2>Vehicle not found</h2>
            <p>This vehicle may no longer be available.</p>
            <a href="browse.html" class="primary-button">Browse Vehicles</a>
        </div>
    `;
}

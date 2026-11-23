const sellForm = document.getElementById("sellForm");
const formMessage = document.getElementById("formMessage");

sellForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newCar = {
        id: Date.now(),
        brand: document.getElementById("brand").value,
        model: document.getElementById("model").value.trim(),
        year: Number(document.getElementById("year").value),
        price: Number(document.getElementById("price").value),
        mileage: Number(document.getElementById("mileage").value),
        fuel: document.getElementById("fuel").value,
        transmission: document.getElementById("transmission").value,
        engine: document.getElementById("engine").value.trim(),
        horsepower: Number(document.getElementById("horsepower").value) || 0,
        body: document.getElementById("body").value,
        color: document.getElementById("color").value.trim(),
        image: document.getElementById("image").value.trim(),
        description: document.getElementById("description").value.trim(),
        seller: document.getElementById("seller").value.trim(),
        contact: document.getElementById("contact").value.trim(),
        isCustom: true
    };

    // Basic validation
    if (
        !newCar.brand ||
        !newCar.model ||
        !newCar.year ||
        !newCar.price ||
        !newCar.seller ||
        !newCar.contact
    ) {
        formMessage.textContent = "Please fill in all required fields.";
        formMessage.style.color = "red";
        return;
    }

    // Validate image URL if provided
    if (newCar.image) {
        try {
            const imageURL = new URL(newCar.image);

            if (
                imageURL.protocol !== "https:" &&
                imageURL.protocol !== "http:"
            ) {
                throw new Error("Invalid URL");
            }
        } catch {
            formMessage.textContent = "Please enter a valid image URL.";
            formMessage.style.color = "red";
            return;
        }
    }

    // Load existing cars
    let existingCars = getAllCars();

    // Add new listing
    existingCars.push(newCar);

    // Save to localStorage
    saveAllCars(existingCars);

    // Success message
    formMessage.textContent = "Your car listing has been submitted successfully!";
    formMessage.style.color = "green";
    formMessage.className = "form-message success";

    // Reset form
    sellForm.reset();

    console.log("New car added:", newCar);
    console.log("All cars:", getAllCars());
});
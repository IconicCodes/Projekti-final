
// ruan te dhenat fillestare per automjetet qe shfaq faqja
const cars = [
    {
        id: 1,
        brand: "Mercedes-Benz",
        model: "E350 AMG Line",
        year: 2019,
        price: 28900,
        mileage: 85000,
        fuel: "Diesel",
        transmission: "Automatic",
        engine: "2.0L",
        horsepower: 286,
        body: "Sedan",
        image: "https://media.ed.edmunds-media.com/mercedes-benz/e-class/2019/oem/2019_mercedes-benz_e-class_sedan_amg-e-63-s_fq_oem_8_1600.jpg"
    },
    {
        id: 2,
        brand: "BMW",
        model: "530d M Sport",
        year: 2020,
        price: 31500,
        mileage: 72000,
        fuel: "Diesel",
        transmission: "Automatic",
        engine: "3.0L",
        horsepower: 286,
        body: "Sedan",
        image: "https://i0.wp.com/practicalmotoring.com.au/wp-content/uploads/2021/02/bmw-530d.jpg?fit=768%2C455&ssl=1"
    },
    {
        id: 3,
        brand: "Audi",
        model: "A6 50 TDI",
        year: 2020,
        price: 29900,
        mileage: 91000,
        fuel: "Diesel",
        transmission: "Automatic",
        engine: "3.0L",
        horsepower: 286,
        body: "Sedan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyF3-U12TQeQhmqxVwfsIPbCgvdX1210Hwpuy3YiMCogoThU8-OjZiu0ax&s=10"
    },
    {
        id: 4,
        brand: "Porsche",
        model: "911 Carrera",
        year: 2021,
        price: 98500,
        mileage: 32000,
        fuel: "Petrol",
        transmission: "Automatic",
        engine: "3.0L",
        horsepower: 385,
        body: "Coupe",
        image: "https://en.drivar.de/wp-content/uploads/2024/11/Rent-a-Porsche-911-Carrera-4-GTS-in-Berlin.jpeg"
    },
    {
        id: 5,
        brand: "Volkswagen",
        model: "Golf 7.5 GTD",
        year: 2018,
        price: 17900,
        mileage: 110000,
        fuel: "Diesel",
        transmission: "Automatic",
        engine: "2.0L",
        horsepower: 184,
        body: "Hatchback",
        image: "https://img-ik.cars.co.za/news-site-za/images/2017/09/Volkswagen-GTD-4.jpg?tr=w-1200,h-800"
    },
    {
        id: 6,
        brand: "Toyota",
        model: "Supra 3.0",
        year: 2022,
        price: 52500,
        mileage: 25000,
        fuel: "Petrol",
        transmission: "Automatic",
        engine: "3.0L",
        horsepower: 382,
        body: "Coupe",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStkMtbTd03ugwWd7lbrMYSN4qie3vUIqAqlH-zVep1lBJtrQIz8NaeP7s&s=10"
    }
];


// inicializon ruajtjen lokale vetem kur nuk ka automjete te ruajtura
if (!localStorage.getItem("ledriCars")) {
    localStorage.setItem("ledriCars", JSON.stringify(cars));
}

// lexon automjetet e ruajtura dhe perdor listen fillestare nese te dhenat jane te pavlefshme
function getAllCars() {
    try {
        const savedCars = JSON.parse(localStorage.getItem("ledriCars"));
        return Array.isArray(savedCars) ? savedCars : cars;
    } catch {
        return cars;
    }
}

// ruan listen e perditesuar te automjeteve ne shfletues
function saveAllCars(vehicleList) {
    localStorage.setItem("ledriCars", JSON.stringify(vehicleList));
}

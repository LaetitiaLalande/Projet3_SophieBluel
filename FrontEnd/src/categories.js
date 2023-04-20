fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then((categories) => {

        console.log(categories);

        const buttonsFilter = document.querySelector('.filters');
        const btnAll = document.getElementById("btn-all");
        const btnOject = document.getElementById("btn-object");
        const btnAppartment = document.getElementById("btn-appartment");
        const btnHotel = document.getElementById("btn-hotel");



    })
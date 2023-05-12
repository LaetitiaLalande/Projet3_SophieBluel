// Importation de la fonction genererProjects
import { genererProjects } from "./projets.js";


const response = await fetch("http://localhost:5678/api/works");
const listCategorys = await response.json();

// creation du bouton tous
const btnAll = document.getElementById("btn-all");
btnAll.addEventListener("click", () => {
    // efface la gallery
    document.querySelector(".gallery").innerHTML = "";
    // genere la listCategorys
    genererProjects(listCategorys);
});

// creation du bouton Objets
const btnOject = document.getElementById("btn-object");
btnOject.addEventListener("click", () => {
    const categoryObject = listCategorys.filter(object => object.categoryId == '1');
    document.querySelector(".gallery").innerHTML = "";
    genererProjects(categoryObject);
});

// creation du bouton Appartement
const btnAppartment = document.getElementById("btn-appartment");
btnAppartment.addEventListener("click", () => {
    const categoryAppartment = listCategorys.filter(appartment => appartment.categoryId == "2");
    document.querySelector(".gallery").innerHTML = "";
    genererProjects(categoryAppartment);
});

// creation du bouton hotel
const btnHotel = document.getElementById("btn-hotel");
btnHotel.addEventListener("click", () => {
    const categoryHotel = listCategorys.filter(hotel => hotel.categoryId == '3');
    document.querySelector(".gallery").innerHTML = "";
    genererProjects(categoryHotel);
});


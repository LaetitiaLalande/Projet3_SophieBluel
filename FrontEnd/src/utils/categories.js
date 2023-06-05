// Importation de la fonction genererProjects
import { genererProjects } from "./projets.js";

const urlApi = "http://localhost:5678/api/";

// recupère la reponse depuis l'api
const response = await fetch(`${urlApi}works`);
// reponse affectée à listCategorys et transformée en format json
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


// boucle boutons filtre qui deviennent vert au clic de la catégorie
const btnFilter = document.querySelectorAll('.btn-filter')
for (let categorys of btnFilter) {
    categorys.addEventListener("click", function () {
        for (let categorysRemove of btnFilter) {
            categorysRemove.classList.remove('active')// supprime la class au clic d'un autre btn
        }
        categorys.classList.add('active') //ajoute la class à l'element cliqué
    })
}
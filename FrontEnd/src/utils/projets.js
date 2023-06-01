import { addProject } from "../API/projetsAPI.js";

// creation de la fonction "generer les projets" et exportation de la fonction vers fichier API/projetsAPI.js
export function genererProjects(listProjects) {

    for (let i = 0; i < listProjects.length; i++) {

        // creation de la const pour 1 projet
        const project = listProjects[i];

        // recupération de la class qui accueillera les projets
        const gallery = document.querySelector(".gallery");

        // creation de la fiche dédiée à un projet
        const projectElement = document.createElement("figure");
        projectElement.setAttribute('data-id', project.id);

        // creation des éléments qui integrera la fiche
        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;
        const titreElement = document.createElement("figcaption");
        titreElement.innerText = project.title;

        // rattachement des balises a la class .gallery et au projet
        gallery.appendChild(projectElement);
        projectElement.appendChild(imageElement);
        projectElement.appendChild(titreElement);
    }
}

// Ajout de projets depuis la modale
const formAdd = document.querySelector('.formAdd');
// evenement au clic avec fonction d'ajout de projet 
formAdd.addEventListener("submit", addProject)
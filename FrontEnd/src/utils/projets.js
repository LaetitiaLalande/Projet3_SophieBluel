// creation de la fonction "generer les projets" et exportation de la fonction vers fichier API/projetsAPI.js
export function genererProjects(listProjects) {
    for (let i = 0; i < listProjects.length; i++) {

        // creation de la const pour 1 projet
        const project = listProjects[i];

        // recupération de la class qui accueillera les projets
        const gallery = document.querySelector(".gallery");

        // creation de la fiche dédiée à un projet
        const projectElement = document.createElement("figure");
        projectElement.setAttribute('data-id', project.id); //affectation d'un attribut data-id pour chaque projet qui contient l'identifiant de chaque élément

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

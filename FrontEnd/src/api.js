const response = await fetch("http://localhost:5678/api/works");
const listProjects = await response.json();

// creation de la fonction generer les projets
export async function genererProjects(listProjects) {

    for (let i = 0; i < listProjects.length; i++) {

        // creation de la const pour 1 projet
        const category = listProjects[i];

        // recupération de la class qui accueillera les projets
        const gallery = document.querySelector(".gallery");

        // creation de la fiche dédiée à un projet
        const categoryElement = document.createElement("figure");

        // creation des éléments qui integrera la fiche
        const imageElement = document.createElement("img");
        imageElement.src = category.imageUrl;
        const titreElement = document.createElement("figcaption");
        titreElement.innerText = category.title;

        // rattachement des balises a la class .gallery
        gallery.appendChild(categoryElement);
        categoryElement.appendChild(imageElement);
        categoryElement.appendChild(titreElement);
    }
}
genererProjects(listProjects);



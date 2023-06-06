// importation de la fonction qui génère la galerie modale
import { generateModalProjects } from "../utils/modal.js";

const urlApi = "http://localhost:5678/api/";

// appel à l'api et genere la galerie Modale grâce à la fonction generateModalProjects
export function genererGalleryModale() {
    fetch(`${urlApi}works`)
        .then(response => response.json()) // 1ere promesse qui retourne une réponse qu'on transforme au format json
        .then(data => generateModalProjects(data)) // on traite les données avec la fonction qui genere les projets de la galerie Modale
        .catch((error) => console.error(`Une erreur s'est produite : ${error}`)) // capturer l’erreur potentielle dans le bloc et indique comment la gérer
}
genererGalleryModale();



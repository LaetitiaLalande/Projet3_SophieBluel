// importation de la fonction qui génère la galerie modale
import { generateModalProjects } from "../utils/modal.js";

const urlApi = "http://localhost:5678/api/";

// appel à l'api et genere la galerie Modale grâce à la fonction generateModalProjects
export function genererGalleryModale() {
    fetch(`${urlApi}works`)
        .then(response => response.json())
        .then(data => generateModalProjects(data)) // fonction qui genere les projets de la galerie Modale
}
genererGalleryModale();



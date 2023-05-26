// importation de la fonction qui génère la galerie modale
import { genererModalGallery } from "../utils/modal.js";

// appel à l'api et genere la galerie Modale grâce à la fonction genererModalGallery
fetch(`${urlApi}works`)
    .then(response => response.json())
    .then(data => genererModalGallery(data))
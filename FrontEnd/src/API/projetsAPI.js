// importation de la fonction qui génère la galerie principale
import { genererProjects } from "../utils/projets.js";

// appel à l'api avec la methode fetch qui genère les projets grace à la fonction genererProjects
fetch(`${urlApi}works`)
    .then((response) => response.json())
    .then((data) => genererProjects(data))
const urlApi = "http://localhost:5678/api/";

// recuperation du token d'authentification
const token = window.sessionStorage.getItem("token");

// importation de la fonction qui génère la galerie principale
import { genererProjects } from "../utils/projets.js";

// appel à l'api avec la methode fetch qui genère les projets grace à la fonction genererProjects
fetch(`${urlApi}works`)
    .then((response) => response.json())
    .then((data) => genererProjects(data))


// fonction de suppression des travaux
export async function deleteProject(e) { // exportation de la fonction asynchrone vers le fichier utils/modal.js pour etre affectée au clic de "iconTrash"
    e.preventDefault();
    const projectId = e.target.id;// cible l'id sur lequel le clic a été effectué

    // requete DELETE pour supprimer les travaux
    try { // bloc de code à tester
        const response = await fetch(`${urlApi}works/${projectId}`, {
            method: 'DELETE',
            headers: {
                accept: "*/*",
                Authorization: `Bearer ${token}`
            }
        });
        if (response.ok) {
            console.log(`Ressource ${projectId} supprimée avec succès `);
            document.getElementById(projectId).remove(); // suppression du (l'id cliqué) projet de la modale
        } else {
            console.log('Erreur lors de la suppression de la ressource');
        }
    }
    catch (error) { // capturer l’erreur potentielle dans le bloc et indique comment la gérer
        console.error(`Une erreur s'est produite lors de la requête : ${error}`)
    }
};


// fonction qui permet d'ajouter des projets
export async function addProject(e) {
    e.preventDefault();

    // recuperation de l'image , catégorie et titre
    const image = btnUploadPhoto.files[0]; // .files[0] récupère le premier fichier sélectionné à partir de du bouton HTML 'ulpoad' (déjà déclaré dans fichier .utils/modal.js)
    const title = document.getElementById("title").value;
    const category = document.getElementById('category').value;

    // Créer un nouvel objet FormData
    const formData = new FormData(); //objet FormData qui créé, des données 'clé'-valeur du formulaire, à envoyer avec vers l'url/POST
    formData.append('title', title); //méthode 'append' qui ajoute, 1 clé 'title' et sa valeur , à l'objet FormData.
    formData.append('image', image);
    formData.append('category', category);

    try { // bloc de code à tester
        const response = await fetch(`${urlApi}works`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                accept: 'application/json',
            },
            body: formData
        });
        if (response.ok) {
            console.log("Projet ajouté avec succès");
        } else {
            alert("Échec de l'envoi");
        }
    }
    catch (error) { // capturer l’erreur potentielle dans le bloc et indique comment la gérer
        console.error(`Une erreur s'est produite lors de la requête : ${error}`)
    }
}

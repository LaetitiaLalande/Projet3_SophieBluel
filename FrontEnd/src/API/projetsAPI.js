const urlApi = "http://localhost:5678/api/";

// recuperation du token d'authentification
const token = window.sessionStorage.getItem("token");

// importation de la fonction qui génère la galerie principale
import { genererProjects } from "../utils/projets.js";
import { toggleModalContainer } from "../utils/modal.js";
import { genererGalleryModale } from "./modalAPI.js";

function genererGalleryPrincipale() { // fonction qui fait appel à l'API avec la methode Fetch et genère les projets
    fetch(`${urlApi}works`)
        .then((response) => response.json()) // 1ere promesse qui retourne une réponse et qu'on transforme au format json
        .then((data) => genererProjects(data)) // 2eme promesse qui traite les données et les intégre à la fonction qui genère les projets
        .catch((error) => console.error(`Une erreur s'est produite : ${error}`)) // capture l’erreur potentielle dans le bloc et indique comment la gérer
}
genererGalleryPrincipale();


// fonction de suppression des travaux
export async function deleteProject(e) { // exportation de la fonction asynchrone vers le fichier utils/modal.js pour etre affectée au clic de "iconTrash"
    e.preventDefault(); //empêche le rechargement de la page
    const projectId = e.target.id;// récupère l'identifiant sur lequel le clic a été effectué

    // requete DELETE pour supprimer les travaux
    try { // bloc de code à tester
        const response = await fetch(`${urlApi}works/${projectId}`, { //attend que la réponse de la requête de suppression soit arrivée avant de mettre à jour l’affichage
            method: 'DELETE', //  verbe qui permet d’effectuer la suppression de la ressource
            headers: {
                accept: "*/*",
                Authorization: `Bearer ${token}`
            }
        });
        if (response.ok) {
            console.log(`Ressource ${projectId} supprimée avec succès `);
            const removedProjectId = document.querySelectorAll(`[data-id="${projectId}"]`); // selectionne les elements avec l'attribut data-id (dans modale et galerie principale) dont l'id correspond à l'element cliqué 
            for (let projectIdRemove of removedProjectId) {
                projectIdRemove.remove()// supprime le projet portant le même ID
            }
        } else {
            console.log('Erreur lors de la suppression de la ressource');
        }
    }
    catch (error) { // capturer l’erreur potentielle dans le bloc et indique comment la gérer
        console.error(`Une erreur s'est produite lors de la requête : ${error}`)
    }
};


// fonction qui permet d'ajouter des projets
export async function addProject(e) { //exportation de la fonction vers fichier UTILS modal.js
    e.preventDefault();

    // récupération des valeurs des elements image , catégorie et titre
    const image = btnUploadPhoto.files[0]; // .files[0] récupère le premier fichier sélectionné à partir de du bouton HTML 'ulpoad' (déjà déclaré dans fichier .utils/modal.js)
    const title = document.getElementById("title").value; // récupère la valeur indiqée par l'utilisateur dans le champs titre
    const category = document.getElementById('category').value; // récupère la valeur selectionnée par l'utilisateur dans la liste déroulante catégorie

    // Créer un nouvel objet FormData
    const formData = new FormData(); //objet FormData qui créé, des données 'clé'-valeur du formulaire, à envoyer avec vers l'url/POST
    formData.append('title', title); //méthode 'append' qui ajoute, 1 clé 'title' et sa valeur , à l'objet FormData.
    formData.append('image', image);
    formData.append('category', category);

    try { // bloc de code à tester
        const response = await fetch(`${urlApi}works`, {
            method: 'POST', // verbe qui permet de créer une nouvelle ressource
            headers: {
                Authorization: `Bearer ${token}`,
                accept: 'application/json',
            },
            body: formData
        });
        if (response.ok) {
            console.log("Projet ajouté avec succès");
            toggleModalContainer(); // fonction fait disparaitre la modale à la validation du formulaire et reset le formulaire
            document.querySelector(".galleryModal").innerHTML = "";
            genererGalleryModale();
            document.querySelector(".gallery").innerHTML = "";
            genererGalleryPrincipale();
        }
        else {
            alert("Échec de l'envoi");
        }
    }
    catch (error) { // capturer l’erreur potentielle dans le bloc et indique comment la gérer
        console.error(`Une erreur s'est produite lors de la requête : ${error}`)
    }
}


// evenement au clic qui se déclenche lorsque l'utilisateur modifie le token dans la sessionStorage
window.addEventListener('storage', (e) => { //se declenche lorsque la zone de stockage du token a été modifiée
    location.reload(); // recharge la page pour prendre en compte le nouveau token
    window.sessionStorage.removeItem("token"); // efface le token 
    window.location.href = 'index.html'; //l'utilisateur est renvoyé vers la page d'accueil
});


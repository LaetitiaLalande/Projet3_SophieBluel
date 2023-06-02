import { deleteProject } from "../API/projetsAPI.js"; // fonction intégrée au addEventListener de iconTrash
import { addProject } from "../API/projetsAPI.js"; // fonction intégrée à la soumission du formulaire

// fonction qui génère la galerie modale
export function generateModalProjects(modalProjects) {

    for (let i = 0; i < modalProjects.length; i++) {
        // creation de la const pour 1 projet
        const project = modalProjects[i];

        // recupération de la class qui accueillera les projets
        const galleryModal = document.querySelector(".galleryModal");

        // creation de la fiche dédiée à un projet
        const projectElement = document.createElement("figure");
        projectElement.setAttribute('id', project.id); // affectation de l'id à chaque projet 

        // creation l'image qui integrera la fiche
        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl; //recupération de l'url de l'image

        // creation de l'icone poubelle/suppression
        const iconTrash = document.createElement("icon");
        iconTrash.classList.add("fa-regular", "fa-trash-can", "fa-sm"); //ajout de la class 

        // affectation de l'id à chaque icone poubelle
        iconTrash.setAttribute('id', project.id)

        // suppression des travaux au clic de l'icone
        iconTrash.addEventListener("click", (e) => {
            const confirmation = confirm("Etes-vous sûr de vouloir supprimer le projet ?")
            if (confirmation) {// si utilisateur clique sur oui alors la fonction delete est effectuée
                deleteProject(e);
            }
        })

        // creation de la fleche de déplacement (inactive)
        const iconArrows = document.createElement("icon");
        iconArrows.classList.add("fa-solid", "fa-arrows-up-down-left-right", "fa-sm");

        // creation de la légende situé sous la photo
        const titreElement = document.createElement("figcaption");
        titreElement.innerText = "éditer";

        // rattachement des balises à la class .galleryModal et à l'element projet
        galleryModal.appendChild(projectElement);
        projectElement.appendChild(imageElement);
        projectElement.appendChild(iconTrash);
        galleryModal.appendChild(iconArrows);
        projectElement.appendChild(titreElement);
    }
}


// selection des elements pour Déclenchement de la modale 1
const modalContainer = document.querySelector(".modalContainer");
const btnModalTrigger = document.querySelectorAll(".modalTrigger");

// selection des elements pour Evenement au clique de la modale 2
const modalGalleryContent = document.querySelector(".modalGalleryContent");
const modalAddPhoto = document.querySelector(".modalAddPhoto");
const btnPhotoAdd = document.querySelector(".btnPhotoAdd");
const btnBackGallery = document.querySelector(".btnBackGallery");

btnPhotoAdd.addEventListener("click", () => { //bascule vers la modale 2 lorsqu'on clique sur le bouton "ajouter photo"
    modalAddPhoto.style.display = "flex"; // apparition de la modale 2
    modalGalleryContent.style.display = "none"; // disparition de la modale galerie
})

// bouton retour de la modale 2 à la modale 1
btnBackGallery.addEventListener("click", () => { // retour vers la modale galerie lorsqu'on clique sur la flèche de retour depuis la modale 2
    modalAddPhoto.style.display = "none";
    modalGalleryContent.style.display = "flex";
})

// fonction qui fait apparaitre/disparaitre la modale 
export function toggleModalContainer() { //exportation de la fonction vers le fichier API projetsApi 
    modalContainer.classList.toggle("active"); // bascule vers le style de la class ".active"
    modalAddPhoto.style.display = "none";
    modalGalleryContent.style.display = "flex";
    formReset(); // fonction qui efface le formulaire à chaque fois qu'on quitte la modale
}
// evenement fait apparaitre/disparaitre la modale galerie à chaque clique des elements portant la class ".btnModalTrigger"
btnModalTrigger.forEach(trigger => trigger.addEventListener("click", toggleModalContainer))

//fonction qui reset le formulaire
function formReset() {
    const formAdd = document.querySelector('.formAdd');
    formAdd.reset(); // efface le formulaire
    imageUpload.style.display = "none";// disparition du bloc image 
    preview.style.display = "flex";// affichage du bloc icone + bouton + texte
}


// fonction de Prévisualisation de l'image avant l'upload
const preview = document.querySelector(".preview"); //bloc contenant l'icone, limage et le bouton d'ajout
const imageUpload = document.querySelector(".imageUpload"); // image uploadé
const btnUploadPhoto = document.getElementById("btnUploadPhoto");  // selection du bouton "+ ajouter ajouter photo"

function previewImage() {

    const extensionFile = /\.(jpe?g|png)$/i; //const pour selectionner l'extension d'un fichier jpe?g signifie que le e est optionnel
    // \. correspond à un point(.) dans l'expression régulière.
    //  jpeg ou jpg correspond à la partie du format de fichier
    //  $ indique qu'il se situe à la fin de la chaîne de caractere.
    // i à la fin signifie que la correspondance est insensible à la casse, le format peut etre en majuscule ou minuscule

    const file = this.files[0]; // récupère le premier fichier sélectionné a partir du "btnUploadPhoto" 
    // this fait référence à l'élément DOM qui a déclenché l'événement
    if (!extensionFile.test(file.name)) { // condition si l'extension n'est pas bonne
        messageError("format non autorisé");
    }
    else if (file.size > 4 * 1024 * 1024) { // condition qui vérifie si la taille dépasse 4mo
        messageError("la taille dépasse 4mo");
    }
    else { // permet le prévisualisation de l'image avant l'envoi
        const fileUrl = URL.createObjectURL(file); //création d'une URL à partir du fichier selectionné et l'affecte à la constante fileUrl
        imageUpload.src = fileUrl; //affectation de l'url au bloc "imageUpload", pour afficher l'image sélectionnée
        imageUpload.style.display = "block";// affichage du bloc image 
        preview.style.display = "none";// disparition du bloc icone + bouton + texte
    }
}
btnUploadPhoto.addEventListener("change", previewImage) // evenement au clic du bouton ajouter photo lorsque l'événement de changement se produit

// fonction qui génère un message d'erreur dans le bloc "+ ajouter photo"
export function messageError(message) {
    const alertError = document.createElement('div'); //création d'un div pour le message d'erreur
    alertError.textContent = message;
    alertError.style.color = 'red';
    alertError.style.fontSize = "12px";
    preview.appendChild(alertError);
    setTimeout(() => {
        alertError.remove();
    }, 3000);
}

//selection du formulaire pour l'ajout des photos
const formAdd = document.querySelector(".formAdd");

// verifie que tous les champs et soumet le formulaire ajout de projet si tout est rempli
formAdd.addEventListener("submit", function (e) {
    e.preventDefault()

    let allChampsCompleted = true; //variable pour l'ensemble des champs

    const champs = formAdd.querySelectorAll("input[type='text'] , select"); // selection des elements input et select du formulaire formAdd

    //boucle qui verifie que tous les champs du formulaire sont remplis 
    for (let i = 0; i < champs.length; i++) { // Parcours de tous les champs du formulaire formAdd
        if (champs[i].value.trim() === "") { // verifie la valeur des champs
            champs[i].classList.add("champVide"); // Ajouter la classe CSS pour le style de champ vide
            allChampsCompleted = false; //si un des champs n'est pas rempli renvoi false
        } else {
            champs[i].classList.remove("champVide"); // Supprimer la classe CSS si le champ est rempli        
        }
    } if (allChampsCompleted) { // si tous les champs sont remplis , génère la fonction d'ajout de projet
        addProject(e); // fonction qui envoi les projets 
    } else {
        // Affichez un message d'erreur ou effectuez d'autres actions pour indiquer que tous les champs doivent être remplis
        alert("Veuillez remplir tous les champs du formulaire.");
    }
});   
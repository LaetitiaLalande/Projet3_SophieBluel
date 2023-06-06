import { deleteProject } from "../API/projetsAPI.js"; // fonction intégrée au addEventListener de iconTrash
import { addProject } from "../API/projetsAPI.js"; // fonction intégrée à la soumission du formulaire

// fonction qui génère la galerie modale
export function generateModalProjects(modalProjects) {

    for (let i = 0; i < modalProjects.length; i++) { //boucle qui est effectuée pour chaque projet

        // creation de la const pour 1 projet
        const project = modalProjects[i];

        // recupération de la class qui accueillera les projets
        const galleryModal = document.querySelector(".galleryModal");

        // creation de la fiche dédiée à un projet
        const projectElement = document.createElement("figure");
        projectElement.setAttribute('data-id', project.id); // affectation d'un attribut data-id pour chaque projet qui contient l'identifiant de chaque élément

        // creation de l'image qui integrera la fiche
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
        galleryModal.appendChild(projectElement); // rattache le projet à la galerie
        projectElement.appendChild(imageElement); // rattache l'image au projet
        projectElement.appendChild(iconTrash); // ajoute l'icone au projet
        galleryModal.appendChild(iconArrows); // rattache l'icone fleche de retour à la galerie
        projectElement.appendChild(titreElement); // rattache le titre au projet
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


//bascule vers la modale 2 lorsqu'on clique sur le bouton "ajouter photo"
btnPhotoAdd.addEventListener("click", () => {
    modalAddPhoto.style.display = "flex"; // apparition de la modale 2
    modalGalleryContent.style.display = "none"; // disparition de la modale galerie
    formReset();
})


// bouton retour de la modale 2 à la modale 1
btnBackGallery.addEventListener("click", () => { // retour vers la modale galerie lorsqu'on clique sur la flèche de retour depuis la modale 2
    modalAddPhoto.style.display = "none";
    modalGalleryContent.style.display = "flex";
    formReset();
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


//fonction qui reset le formulaire lorsqu'on quitte la modale
export function formReset() {
    const formAdd = document.querySelector('.formAdd');
    formAdd.reset(); // efface le formulaire

    imageUpload.src = " "; // Réinitialisation de la source de l'image
    btnUploadPhoto.value = ""; //Réinitialise la valeur de l'input file après chaque sélection de fichier. pemet de selectionner 2fois de suite la même image

    const textMessageError = document.querySelectorAll('.textMessageError');
    for (let textError of textMessageError) { // efface le message d'erreur
        textError.textContent = " ";
    }

    const styleChampVide = document.querySelectorAll('.champVide'); //selection de tous les elements dont la class est 'champVide'
    for (let i = 0; i < styleChampVide.length; i++) { // boucle qui efface le style css de la class '.champVide'
        styleChampVide[i].classList.remove('champVide');
    }

    imageUpload.style.display = "none";// disparition du bloc image 
    preview.style.display = "flex";// affichage du bloc icone + bouton + texte
}



// fonction de Prévisualisation de l'image avant l'upload
const preview = document.querySelector(".preview"); // Element contenant l'icone, l'image et le bouton d'ajout
const imageUpload = document.querySelector(".imageUpload"); // image uploadé
const btnUploadPhoto = document.getElementById("btnUploadPhoto");  // selection du bouton "+ ajouter ajouter photo"

function previewImage() {

    const extensionFile = /\.(jpe?g|png)$/i; //const pour selectionner l'extension d'un fichier jpe?g signifie que le e est optionnel
    // \. correspond à un point(.) dans l'expression régulière.
    //  jpeg ou jpg correspond à la partie du format de fichier
    //  $ indique qu'il se situe à la fin de la chaîne de caractere.
    // i à la fin signifie que la correspondance est insensible à la casse, le format peut etre en majuscule ou minuscule

    const file = this.files[0]; // récupère le premier fichier sélectionné a partir du "btnUploadPhoto" 
    // this fait référence à l'élément du DOM qui a déclenché l'événement

    if (file && !extensionFile.test(file.name)) { // condition si un fichier est selectionné et que l'extension n'est pas bonne
        messageError("format non autorisé", "previewError");
    }
    else if (file.size > 4 * 1024 * 1024) { // condition qui vérifie si la taille dépasse 4mo
        messageError("la taille dépasse 4mo", "previewError");
    }
    else if (file) { // si un fichier est selectionnée - permet le prévisualisation de l'image avant l'envoi
        const fileUrl = URL.createObjectURL(file); //création d'une URL temporaire à partir du fichier selectionné et l'affecte à la constante fileUrl
        imageUpload.src = fileUrl; //affectation de l'url au bloc "imageUpload", pour afficher l'image sélectionnée
        imageUpload.style.display = "flex";// affichage du bloc image 
        preview.style.display = "none";// disparition du bloc icone + bouton + texte
    }
}
btnUploadPhoto.addEventListener("change", previewImage) // evenement change au clic du bouton ajouter photo 



export function messageError(message, contenaireMessageId) { // 2 paramètres : message=>d'erreur à afficher - contenaireMessageId : L'ID de l'élément du DOM où le message d'erreur sera inséré.
    const contenaireMessage = document.getElementById(contenaireMessageId);

    const alertError = document.createElement('div'); //création d'un div pour le message d'erreur
    alertError.classList.add('textMessageError'); // ajout de la class css '.messageError'
    alertError.innerText = message; // texte du message d'erreur à définir

    contenaireMessage.appendChild(alertError); //Le message d'erreur est ensuite ajouté en tant qu'enfant du conteneur spécifié en paramètre lors de l'appel de la ftcion

    setTimeout(() => { // supprime le message après 3 secondes
        alertError.remove();
    }, 3000);
}


//selection du formulaire pour l'ajout des photos
const formAdd = document.querySelector(".formAdd");
// verifie que tous les champs et soumet le formulaire ajout de projet si tout est rempli
formAdd.addEventListener("submit", function (e) {
    e.preventDefault(); //empêche la soumission par défaut du formulaire

    let allChampsCompleted = true; //variable pour l'ensemble des champs

    const champs = formAdd.querySelectorAll("input[type='text'] , select"); // selection des elements input et select du formulaire formAdd

    //boucle qui verifie que tous les champs du formulaire sont remplis 
    for (let i = 0; i < champs.length; i++) { // Parcours de tous les champs du formulaire formAdd

        if (champs[i].value.trim() === "") { // verifie la valeur des champs

            champs[i].classList.add("champVide"); // Ajouter la classe CSS pour le style de champ vide
            allChampsCompleted = false; //si un des champs n'est pas rempli renvoi false

            const divError = document.createElement('div'); //creation d'un message pour champ non rempli
            divError.classList.add('textMessageError'); // ajout de la class css
            divError.textContent = 'Veuillez compléter ce champ.';
            champs[i].insertAdjacentElement('afterend', divError); // // Insérer l'élément divError après le champ non rempli
            setTimeout(() => {
                divError.remove();
            }, 3000);

        } else {
            champs[i].classList.remove("champVide"); // Supprimer la classe CSS si le champ est rempli 
        }
    } if (allChampsCompleted) { // si tous les champs sont remplis , génère la fonction d'ajout de projet
        addProject(e); // fonction qui envoi les projets 
    }
});   
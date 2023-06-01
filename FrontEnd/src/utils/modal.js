import { deleteProject } from "../API/projetsAPI.js";

// fonction qui génère la galerie modale
export function genererModalGallery(modalProjects) {
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
        iconTrash.addEventListener("click", deleteProject)

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


// Déclenchement de la modale 1
const modalContainer = document.querySelector(".modalContainer");
const btnModalTrigger = document.querySelectorAll(".modalTrigger");

// Evenement au clique de la modale 2
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
function toggleModalContainer() {
    modalContainer.classList.toggle("active"); // bascule vers le style de la class ".active"
    modalAddPhoto.style.display = "none";
    modalGalleryContent.style.display = "flex"
}

// evenement fait apparaitre/disparaitre la modale galerie à chaque clique des elements portant la class ".btnModalTrigger"
btnModalTrigger.forEach(trigger => trigger.addEventListener("click", toggleModalContainer))


// fonction de Prévisualisation de l'image avant l'upload
const preview = document.querySelector(".preview"); //bloc contenant l'icone, limage et le bouton d'ajout
const imageUpload = document.querySelector(".imageUpload"); // image uploadé
const btnUploadPhoto = document.getElementById("btnUploadPhoto");  // selection du bouton "+ ajouter ajouter photo"
const alertError = document.createElement('div'); // création d'un div pour le message d'erreur

function previewImage() {
    
    const extensionFile = /\.(jpe?g|png)$/i; //const pour selectionner l'extension d'un fichier jpe?g signifie que le e est optionnel
    //     // \. correspond à un point(.) dans l'expression régulière.
    //     //  jpeg ou jpg correspond à la partie du format de fichier
    //     //  $ indique qu'il se situe à la fin de la chaîne de caractere.
    //     // i à la fin de l'expression régulière signifie que la correspondance est insensible à la casse, le format peut etre en majuscule ou minuscule
    
    const file = this.files[0]; // récupère le premier fichier sélectionné a partir du "btnUploadPhoto" 
    // this fait référence à l'élément DOM qui a déclenché l'événement
    
    if (!extensionFile.test(file.name)) { // condition si l'extension n'est pas bonne
        messageError(alertError);
        alertError.textContent = "format non autorisé";
        }else if(file.size > 4*1024*1024){ // condition qui vérifie si la taille dépasse 4mo
        messageError(alertError);
        alertError.textContent = "la taille dépasse 4mo";
        }else{
        const src = URL.createObjectURL(file); //création d'une URL et affectation de l'URL générée à la constante src
        imageUpload.src = src; //affectation de l'url au bloc html imageUpload, pour afficher l'image sélectionnée
        imageUpload.style.display = "block";// affichage du bloc image 
        preview.style.display = "none";// disparition du bloc icone + bouton + texte
    }
}
btnUploadPhoto.addEventListener("change", previewImage) // evenement au clic du bouton ajouter photo lorsque l'événement de changement se produit

// fonction qui génère un message d'erreur dans le bloc ajouter photo
function messageError(alertError) {
    alertError.style.color = 'red';
    alertError.style.fontSize="12px";
    preview.appendChild(alertError);
    setTimeout(() => {
        alertError.remove();
    }, 3000);
}
// const formAdd = document.querySelector(".formAdd");
// console.log(formAdd);
// const champs = formAdd.querySelectorAll("input, select");
// console.log(champs);

// function verifyCompletedForm(formAdd) {

//     for (let champ of champs) {
//         if (champ.value.trim() === "") {
//             return false;
//         }
//     }

//     return true;
// }


// function previewImage() {
//     // console.log(this.files[0].name); // this correspond à l'input upload on obtient le nom du fichier avec l'extension

//     const extensionFile = /\.(jpe?g|png)$/i; //const pour selectionner l'extension d'un fichier jpe?g signifie que le e est optionnel
//     // \. correspond à un point(.) dans l'expression régulière.
//     //  jpeg ou jpg correspond à la partie du format de fichier
//     //  $ indique qu'il se situe à la fin de la chaîne de caractere.
//     // i à la fin de l'expression régulière signifie que la correspondance est insensible à la casse, le format peut etre en majuscule ou minuscule

//     if (this.files.length === 0 || !extensionFile.test(this.files[0].name)) {// condition si aucun fichier n'est sélectionné ou si l'extension n'est pas bonne
//         console.log("fichier refusé");
//         return; // sort de la fonction si pas d'image ou format incoorect
//     }

//     const file = this.files[0]; // stocke mon fichier dans la const file
//     const fileReader = new FileReader(); // FileReader est un objet qui permet de lire le contenu des fichiers stockés avant de les envoyer au serveur
//     fileReader.readAsDataURL(file); // permet la lecture du contenu d'un fichier URL
//     console.log("fichier accepté");
//     fileReader.addEventListener('load', (event) => displayImage(event, file))

// }

// function displayImage(event, file) { //function qui créé l'image contenu dnas 
    
//     const imageUpload = document.querySelector(".imageUpload"); //contenaire de l'image uploadé
    
//     const image = document.createElement('img'); //création de l'image
//     image.src = event.target.result; //attribuer l'URL d'une image à la propriété src de l'élément <img>
//     // console.log(`${file.name}`); // affiche le nom de l'image 

//     const deleteImagebtn= document.createElement('button');
//     deleteImagebtn.id="imagedelete";
//     deleteImagebtn.innerHTML='\u{1F5D1}';
    
//     imageUpload.appendChild(image);


//     // condition ssi suppression image exemple
    
//     deleteImagebtn.addEventListener('click', (event) => {
//         if (confirm("etes vous sure?")) {
//             btnUploadPhoto.value = ""; // valuer de base du bouton "uploadPhoto"
//             event.target.parentElement.remove(); // ( cible le parent du bouton upload )
//         }
//     })
// }


import { deleteProject } from "../Pages/suppressionTravaux.js";

// fonction qui génère la galerie modale
export function genererModalGallery(modalProjects) {
    for (let i = 0; i < modalProjects.length; i++) {

        // creation de la const pour 1 projet
        const project = modalProjects[i];

        // recupération de la class qui accueillera les projets
        const galleryModal = document.querySelector(".galleryModal");

        // creation de la fiche dédiée à un projet
        const projectElement = document.createElement("figure");
        projectElement.setAttribute('id', project.id)

        // creation des éléments qui integrera la fiche
        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;

        // creation de l'icone poubelle/suppression
        const iconTrash = document.createElement("icon");
        iconTrash.classList.add("fa-regular", "fa-trash-can", "fa-sm");

        // affectation de l'id à chaque icone poubelle
        iconTrash.setAttribute('id', project.id)

        // suppression des travaux au clic de l'icone
        iconTrash.addEventListener("click", deleteProject)

        // creation de la fleche de déplacement (inactive)
        const iconArrows = document.createElement("icon");
        iconArrows.classList.add("fa-solid", "fa-arrows-up-down-left-right", "fa-sm");

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


// fonction de Prévisualisation de l'image avant l'upload
const preview = document.querySelector(".preview"); //bloc contenant l'icone, limage et le bouton d'ajout
const showImage = document.querySelector(".showImage"); //contenaire de l'imgage uploadé

function previewImage(e) {
    if (e.target.files.length > 0) { // condition si au moins une image est selectionnée
        const src = URL.createObjectURL(e.target.files[0]); //création d'une URL et affectation de l'URL générée à la constante src
        showImage.src = src; //affectation de l'url au bloc html showImage, pour afficher l'image sélectionnée
        showImage.style.display = "block";// affichage du bloc image 
        preview.style.display = "none";// disparition du bloc icone + bouton + texte
    } console.log(showImage.src)
}

const uploadPhoto = document.getElementById("uploadPhoto");
uploadPhoto.addEventListener("change", previewImage)

// Déclenchement de la modale 1
const modalContainer = document.querySelector(".modalContainer");
const btnModalTrigger = document.querySelectorAll(".modalTrigger");

// Evenement au clique de la modale 2
const modalGalleryContent = document.querySelector(".modalGalleryContent");
const modalAddPhoto = document.querySelector(".modalAddPhoto");
const btnPhotoAdd = document.querySelector(".btnPhotoAdd");
const btnBackGallery = document.querySelector(".btnBackGallery");

btnPhotoAdd.addEventListener("click", () => {
    modalAddPhoto.style.display = "flex"; // apparition de la modale 2
    modalGalleryContent.style.display = "none"; // disparition de la modale 1 
})

// bouton retour de la modale 2 à la modale 1
btnBackGallery.addEventListener("click", () => {
    modalAddPhoto.style.display = "none";
    modalGalleryContent.style.display = "flex";
    // filePreview.style.display = "none";
    // preview.style.display = "flex";
})

// fonction qui fait apparaitre/disparaitre la modale
function toggleModalContainer() {
    modalContainer.classList.toggle("active");
    modalAddPhoto.style.display = "none";
    modalGalleryContent.style.display = "flex"
}

// evenement au clic fait apparaitre/disparaitre la modale
btnModalTrigger.forEach(trigger => trigger.addEventListener("click", toggleModalContainer))



